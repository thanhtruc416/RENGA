import pool from '../db';
import { clearCart } from './cart.service';
import { shortenName } from './product.service';
import { awardPurchasePoints, revokePurchasePoints } from './loyalty.service';
import { notifyOrderPlaced, notifyOrderCancelled, notifyTierUpgrade } from './notification.service';

// ─── Types ────────────────────────────────────────────────────────────────────

type DbPaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'VOUCHER';
type OrderType       = 'STANDARD' | 'STUDIO' | 'DESIGN';

interface CreateOrderPayload {
  clientId:            string;
  order_type?:         OrderType;
  payment_method:      DbPaymentMethod;
  items:               Array<{ variant_id: string; quantity: number; unit_price: number }>;
  address:             { recipient_name: string; recipient_phone: string; address_line: string; province: string; ward?: string };
  email?:              string;
  discount_amount?:    number;
  customer_voucher_id?: string | null;
  note?:               string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

// Tính thời điểm hết hạn thanh toán theo BR-11 / BR-31
function computeExpiresAt(orderType: OrderType, paymentMethod: DbPaymentMethod): Date | null {
  if (paymentMethod === 'CASH') return null;
  const now = Date.now();
  return orderType === 'STANDARD'
    ? new Date(now + 60 * 60 * 1000)       // 60 phút — BR-11
    : new Date(now + 24 * 60 * 60 * 1000); // 24 giờ  — BR-12
}

// ORD-01: ghi lại lịch sử mỗi lần đổi order_status — bảng order_status_history đã
// có sẵn trong schema nhưng chưa từng được ghi ở đâu cả.
export async function logOrderStatusChange(
  conn: any,
  orderId: string,
  statusBefore: string | null,
  statusAfter: string,
  changedByAdminId?: string | null,
  note?: string | null,
): Promise<void> {
  const historyId = await nextId('OSH', 'order_status_history', 'history_id');
  await conn.execute(
    `INSERT INTO order_status_history
       (history_id, order_id, status_before, status_after, changed_by_admin_id, note, changed_at)
     VALUES (?,?,?,?,?,?,NOW())`,
    [historyId, orderId, statusBefore, statusAfter, changedByAdminId ?? null, note ?? null]
  );
}

// ─── Tạo đơn hàng ─────────────────────────────────────────────────────────────

export async function createOrder(payload: CreateOrderPayload) {
  const orderType     = payload.order_type    ?? 'STANDARD';
  const paymentMethod = payload.payment_method;
  // COD trả tiền lúc nhận hàng nên xác nhận ngay; các phương thức khác (chuyển
  // khoản/thẻ/ví) phải chờ xác nhận thật — có cửa sổ chờ theo BR-11/BR-12, hết hạn
  // chưa xác nhận thì tự huỷ (xem cancelExpiredOrders).
  const isInstantConfirm = paymentMethod === 'CASH';
  const expiresAt        = computeExpiresAt(orderType, paymentMethod);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // ORD-04: khoá + kiểm tra tồn kho từng variant trước khi trừ, tránh bán vượt
    // tồn khi nhiều khách đặt cùng lúc (FOR UPDATE khoá row tới khi transaction xong).
    for (const item of payload.items) {
      const [[variant]] = await conn.execute<any[]>(
        'SELECT stock_quantity, status FROM product_variant WHERE variant_id = ? FOR UPDATE',
        [item.variant_id]
      );
      if (!variant) throw { status: 404, message: 'Không tìm thấy sản phẩm trong đơn hàng.' };
      if (variant.status !== 'AVAILABLE' || variant.stock_quantity < item.quantity) {
        throw { status: 409, message: `Sản phẩm không đủ tồn kho (còn ${variant.stock_quantity ?? 0}).` };
      }
      await conn.execute(
        'UPDATE product_variant SET stock_quantity = stock_quantity - ? WHERE variant_id = ?',
        [item.quantity, item.variant_id]
      );
    }

    // MAIL-04/06: email (tuỳ chọn) ở checkout trước đây chỉ dùng cho khách vãng lai —
    // khách đã đăng nhập nhưng tài khoản chưa có email thì gõ vào đây cũng vô ích. Cố
    // lưu vào hồ sơ tài khoản (tiện cho lần sau) NHƯNG cột client.email là unique nên
    // có thể trùng với 1 tài khoản khác — khi đó KHÔNG được để mất luôn email này, vì
    // các thông báo khác của ĐƠN NÀY (huỷ đơn...) vẫn cần gửi tới đúng địa chỉ khách
    // vừa gõ. Lưu riêng vào address.contact_email — gắn với đơn, không phải tài khoản.
    const contactEmail = payload.email?.trim().toLowerCase() || null;
    if (contactEmail) {
      try {
        await conn.execute(
          `UPDATE client SET email = ? WHERE client_id = ? AND email IS NULL`,
          [contactEmail, payload.clientId]
        );
      } catch (err: any) {
        if (err?.code !== 'ER_DUP_ENTRY') throw err;
      }
    }

    // 1. Lưu địa chỉ
    const addressId = await nextId('ADR', 'address', 'address_id');
    await conn.execute(
      `INSERT INTO address (address_id, client_id, recipient_name, recipient_phone, contact_email, address_line, ward, province, is_default, created_at)
       VALUES (?,?,?,?,?,?,?,?,0,NOW())`,
      [addressId, payload.clientId, payload.address.recipient_name, payload.address.recipient_phone, contactEmail,
       payload.address.address_line, payload.address.ward ?? '', payload.address.province]
    );

    // 2. Tạo order
    const orderId    = await nextId('ORD', 'order', 'order_id');
    const total      = payload.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
    const finalTotal = Math.max(total - (payload.discount_amount ?? 0), 0);
    const orderStatus = isInstantConfirm ? 'PAYMENT_CONFIRMED' : 'PENDING';

    await conn.execute(
      `INSERT INTO \`order\`
         (order_id, client_id, order_type, order_status, address_id,
          shipping_status, voucher_customer_id, discount_amount, total_amount, note, created_at, updated_at)
       VALUES (?,?,?,?,?,'NOT_SHIPPED',?,?,?,?,NOW(),NOW())`,
      [orderId, payload.clientId, orderType, orderStatus, addressId,
       payload.customer_voucher_id ?? null, payload.discount_amount ?? 0, finalTotal,
       payload.note ?? null]
    );
    await logOrderStatusChange(conn, orderId, null, orderStatus);

    // 3. Tạo order items
    for (const item of payload.items) {
      const itemId = await nextId('ORI', 'order_item', 'order_item_id');
      await conn.execute(
        `INSERT INTO order_item (order_item_id, order_id, item_type, variant_id, quantity, unit_price, subtotal)
         VALUES (?,?,'PRODUCT',?,?,?,?)`,
        [itemId, orderId, item.variant_id, item.quantity, item.unit_price, item.unit_price * item.quantity]
      );
    }

    // 4. Tạo payment record — COD thì SUCCESS ngay, còn lại PENDING chờ xác nhận
    const paymentId   = await nextId('PAY', 'payment', 'payment_id');
    const transType   = orderType === 'STANDARD' ? 'PAYMENT' : 'DEPOSIT';
    const paymentStatus = isInstantConfirm ? 'SUCCESS' : 'PENDING';
    await conn.execute(
      `INSERT INTO payment (payment_id, order_id, transaction_type, payment_method, amount, payment_status, processed_at, created_at)
       VALUES (?,?,?,?,?,?,?,NOW())`,
      [paymentId, orderId, transType, paymentMethod, finalTotal, paymentStatus, isInstantConfirm ? new Date() : null]
    );

    // 5. Đánh dấu voucher đã dùng
    if (payload.customer_voucher_id) {
      await conn.execute(
        "UPDATE customer_voucher SET status='USED', used_at=NOW(), order_id=? WHERE customer_voucher_id=?",
        [orderId, payload.customer_voucher_id]
      );
    }

    // 6. BR-40: cộng điểm tích lũy (bị hoàn lại nếu đơn bị hủy — xem cancelOrder/cancelExpiredOrders)
    const tierResult = await awardPurchasePoints(conn, payload.clientId, orderId, finalTotal);

    await conn.commit();

    // 6. Xóa giỏ hàng
    await clearCart(payload.clientId);

    // 7. Mail xác nhận đặt hàng — gửi sau khi transaction đã commit xong, lỗi mail
    // không được làm hỏng đơn đã tạo thành công.
    notifyOrderPlaced(orderId, payload.clientId, finalTotal, orderType === 'STANDARD' ? 'Đơn hàng tiêu chuẩn' : 'Đơn hàng tùy biến')
      .catch(err => console.error(`[notification] notifyOrderPlaced(${orderId}) lỗi:`, err));

    // LOY-03/04/05: mua hàng vượt ngưỡng lên hạng — báo email sau khi đã commit.
    if (tierResult.upgraded && tierResult.newTierName) {
      notifyTierUpgrade(payload.clientId, tierResult.newTierName)
        .catch(err => console.error(`[notification] notifyTierUpgrade(${payload.clientId}) lỗi:`, err));
    }

    return { orderId, expiresAt: isInstantConfirm ? null : expiresAt };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

// ─── Tự động hủy đơn hết hạn (BR-11 / BR-12 / BR-31) ────────────────────────

export async function cancelExpiredOrders(): Promise<void> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Tìm đơn PENDING chưa thanh toán + đã hết hạn (không áp dụng cho COD)
    const [expired] = await conn.execute<any[]>(
      `SELECT o.order_id, o.voucher_customer_id
       FROM \`order\` o
       JOIN payment p ON p.order_id = o.order_id AND p.payment_status = 'PENDING'
       WHERE o.order_status = 'PENDING'
         AND p.payment_method != 'CASH'
         AND (
               (o.order_type = 'STANDARD'          AND NOW() > DATE_ADD(o.created_at, INTERVAL 60 MINUTE))
            OR (o.order_type IN ('STUDIO','DESIGN') AND NOW() > DATE_ADD(o.created_at, INTERVAL 24 HOUR))
         )`
    );

    if (!expired.length) { await conn.commit(); return; }

    const orderIds   = (expired as any[]).map(r => r.order_id);
    const voucherIds = (expired as any[]).map(r => r.voucher_customer_id).filter(Boolean);
    const ph         = (n: number) => Array(n).fill('?').join(',');

    // Hoàn voucher
    if (voucherIds.length) {
      await conn.execute(
        `UPDATE customer_voucher SET status='AVAILABLE', used_at=NULL, order_id=NULL
         WHERE customer_voucher_id IN (${ph(voucherIds.length)})`,
        voucherIds
      );
    }

    // Hủy đơn
    await conn.execute(
      `UPDATE \`order\` SET order_status='CANCELLED', updated_at=NOW()
       WHERE order_id IN (${ph(orderIds.length)})`,
      orderIds
    );

    // Đánh dấu payment thất bại
    await conn.execute(
      `UPDATE payment SET payment_status='FAILED'
       WHERE order_id IN (${ph(orderIds.length)}) AND payment_status='PENDING'`,
      orderIds
    );

    // BR-42: hoàn lại điểm đã cộng lúc đặt đơn (nếu có) + ghi lịch sử đổi trạng thái
    for (const orderId of orderIds) {
      await revokePurchasePoints(conn, orderId);
      await logOrderStatusChange(conn, orderId, 'PENDING', 'CANCELLED', null, 'Tự động huỷ do hết hạn thanh toán (BR-11/BR-12)');
    }

    // ORD-04: hoàn lại tồn kho đã trừ lúc đặt đơn (đơn giờ có thể ở PENDING thật
    // sự chờ xác nhận thanh toán, không còn luôn PAYMENT_CONFIRMED tức thì nữa).
    await conn.execute(
      `UPDATE product_variant pv
       JOIN order_item oi ON oi.variant_id = pv.variant_id
       SET pv.stock_quantity = pv.stock_quantity + oi.quantity
       WHERE oi.order_id IN (${ph(orderIds.length)}) AND oi.item_type = 'PRODUCT'`,
      orderIds
    );

    await conn.commit();
    console.log(`[AUTO-CANCEL] Hủy ${orderIds.length} đơn hết hạn:`, orderIds.join(', '));
  } catch (err) {
    await conn.rollback();
    console.error('[AUTO-CANCEL] Lỗi:', err);
  } finally {
    conn.release();
  }
}

// ─── Hủy đơn hàng theo yêu cầu khách (BR-24 / BR-27) ─────────────────────────

// Chỉ các trạng thái sớm mới hủy trực tiếp được — đã SHIPPED/COMPLETED thì không.
const DIRECT_CANCELLABLE = ['PENDING', 'PAYMENT_CONFIRMED', 'PACKED'];

export async function cancelOrder(orderId: string, clientId: string, reason: string) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[order]] = await conn.execute<any[]>(
      `SELECT o.order_id, o.order_status, o.total_amount, o.voucher_customer_id, py.payment_method
       FROM \`order\` o LEFT JOIN payment py ON py.order_id = o.order_id
       WHERE o.order_id = ? AND o.client_id = ? FOR UPDATE`,
      [orderId, clientId]
    );

    if (!order) {
      const err: any = new Error('Không tìm thấy đơn hàng.');
      err.status = 404;
      throw err;
    }

    if (!DIRECT_CANCELLABLE.includes(order.order_status)) {
      const err: any = new Error('Đơn hàng đã ở giai đoạn không thể hủy trực tiếp.');
      err.status = 409;
      throw err;
    }

    await conn.execute(
      `UPDATE \`order\` SET order_status='CANCELLED', updated_at=NOW() WHERE order_id = ?`,
      [orderId]
    );
    await logOrderStatusChange(conn, orderId, order.order_status, 'CANCELLED', null, reason);

    await conn.execute(
      `UPDATE payment SET payment_status='FAILED' WHERE order_id = ? AND payment_status='PENDING'`,
      [orderId]
    );

    if (order.voucher_customer_id) {
      await conn.execute(
        `UPDATE customer_voucher SET status='AVAILABLE', used_at=NULL, order_id=NULL WHERE customer_voucher_id = ?`,
        [order.voucher_customer_id]
      );
    }

    // ORD-04: đơn giờ trừ tồn kho ngay lúc đặt (xác nhận thanh toán tức thì) nên
    // huỷ đơn phải hoàn tồn kho lại, tránh kho bị "kẹt" mất vĩnh viễn.
    await conn.execute(
      `UPDATE product_variant pv
       JOIN order_item oi ON oi.variant_id = pv.variant_id
       SET pv.stock_quantity = pv.stock_quantity + oi.quantity
       WHERE oi.order_id = ? AND oi.item_type = 'PRODUCT'`,
      [orderId]
    );

    // COD chưa hề thu tiền (trả khi nhận hàng, đơn bị huỷ trước khi giao) nên không
    // có gì để "hoàn tiền" — trước đây luôn ghi refund_amount = total_amount bất kể
    // phương thức, khiến đơn COD cũng báo hoàn tiền dù khách chưa trả đồng nào.
    const wasPaidUpfront = order.payment_method !== 'CASH';
    const refundAmount = wasPaidUpfront ? Number(order.total_amount) : 0;

    const cancelId = await nextId('CAN', 'cancellation_request', 'cancel_id');
    await conn.execute(
      `INSERT INTO cancellation_request (cancel_id, order_id, reason, refund_amount, status, handled_at, created_at)
       VALUES (?,?,?,?,'APPROVED',NOW(),NOW())`,
      [cancelId, orderId, reason, refundAmount]
    );

    // BR-42: hoàn lại điểm đã cộng lúc đặt đơn (nếu có)
    await revokePurchasePoints(conn, orderId);

    await conn.commit();

    // Mail thông báo hủy đơn — gửi sau khi transaction đã commit, lỗi mail không
    // được làm hỏng việc hủy đơn đã thành công.
    notifyOrderCancelled(orderId, clientId, reason, refundAmount, wasPaidUpfront)
      .catch(err => console.error(`[notification] notifyOrderCancelled(${orderId}) lỗi:`, err));

    return { refundAmount };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

// ADM-05 / BR-25: đơn đã SHIPPED không tự hủy được nữa (ngoài DIRECT_CANCELLABLE) —
// khách chỉ có thể GỬI YÊU CẦU, chờ Admin xem xét duyệt/từ chối, không tự đổi order_status.
export async function requestOrderCancellation(orderId: string, clientId: string, reason: string) {
  const [[order]] = await pool.execute<any[]>(
    `SELECT order_id, order_status FROM \`order\` WHERE order_id = ? AND client_id = ?`,
    [orderId, clientId]
  );
  if (!order) throw { status: 404, message: 'Không tìm thấy đơn hàng.' };
  if (DIRECT_CANCELLABLE.includes(order.order_status)) {
    throw { status: 409, message: 'Đơn hàng này có thể hủy trực tiếp, không cần chờ duyệt.' };
  }
  if (!['SHIPPED'].includes(order.order_status)) {
    throw { status: 409, message: 'Đơn hàng ở trạng thái này không thể yêu cầu hủy.' };
  }

  const [[existing]] = await pool.execute<any[]>(
    `SELECT cancel_id FROM cancellation_request WHERE order_id = ?`, [orderId]
  );
  if (existing) throw { status: 409, message: 'Đơn hàng này đã có yêu cầu hủy trước đó.' };

  const cancelId = await nextId('CAN', 'cancellation_request', 'cancel_id');
  await pool.execute(
    `INSERT INTO cancellation_request (cancel_id, order_id, reason, status, created_at)
     VALUES (?,?,?,'PENDING',NOW())`,
    [cancelId, orderId, reason]
  );
  return cancelId;
}

// ─── Danh sách đơn hàng ───────────────────────────────────────────────────────

export async function getUserOrders(clientId: string) {
  await cancelExpiredOrders();

  const [orders] = await pool.execute<any[]>(
    `SELECT o.order_id, o.order_type, o.order_status, o.total_amount, o.created_at,
            COUNT(oi.order_item_id) as item_count,
            MIN(COALESCE(p.product_name, 'Trang sức tùy chỉnh')) as first_product_name,
            MAX(py.payment_method) as payment_method
     FROM \`order\` o
     LEFT JOIN order_item oi ON oi.order_id = o.order_id
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     LEFT JOIN payment py ON py.order_id = o.order_id
     WHERE o.client_id = ?
     GROUP BY o.order_id, o.order_type, o.order_status, o.total_amount, o.created_at
     ORDER BY o.created_at DESC`,
    [clientId]
  );

  return (orders as any[]).map(o => ({
    ...o,
    first_product_name: o.first_product_name ? shortenName(o.first_product_name) : o.first_product_name,
    payment_expires_at: o.order_status === 'PENDING' && o.payment_method && o.payment_method !== 'CASH'
      ? computeExpiresAt(o.order_type, o.payment_method)
      : null,
  }));
}

// ─── Chi tiết đơn hàng ────────────────────────────────────────────────────────

export async function getOrderDetail(orderId: string, clientId: string) {
  await cancelExpiredOrders();

  const [[order]] = await pool.execute<any[]>(
    `SELECT o.*, a.recipient_name, a.recipient_phone, a.address_line, a.ward, a.province,
            py.payment_method
     FROM \`order\` o
     JOIN address a ON a.address_id = o.address_id
     LEFT JOIN payment py ON py.order_id = o.order_id
     WHERE o.order_id = ? AND o.client_id = ?`,
    [orderId, clientId]
  );
  if (!order) return null;

  const [items] = await pool.execute<any[]>(
    `SELECT oi.*, p.product_name, pv.variant_name, pv.size_value,
            COALESCE(pri.image_url, bf.image_url) AS image_url,
            bf.blank_name, bf.blank_type,
            m.material_name,
            s.stone_name, ss.size_label AS stone_size_label, ss.carat_weight,
            c.engraving_text
     FROM order_item oi
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     LEFT JOIN product_image pri ON pri.product_id = p.product_id AND pri.is_primary = 1
     LEFT JOIN customization c  ON c.custom_id = oi.custom_id
     LEFT JOIN blank_form bf    ON bf.blank_id = c.blank_id
     LEFT JOIN material m       ON m.material_id = c.material_id
     LEFT JOIN stone_size ss    ON ss.stone_size_id = c.stone_size_id
     LEFT JOIN stone s          ON s.stone_id = ss.stone_id
     WHERE oi.order_id = ?`,
    [orderId]
  );

  const mappedItems = items.map((item: any) => ({
    ...item,
    product_name: item.product_name ? shortenName(item.product_name) : null,
  }));

  const expiresAt = order.order_status === 'PENDING' && order.payment_method && order.payment_method !== 'CASH'
    ? computeExpiresAt(order.order_type, order.payment_method)
    : null;

  return { ...order, items: mappedItems, payment_expires_at: expiresAt };
}

// ─── Địa chỉ đã lưu ──────────────────────────────────────────────────────────

export async function getUserAddresses(clientId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT address_id, recipient_name, recipient_phone, address_line, ward, province
     FROM address WHERE client_id = ? ORDER BY is_default DESC, created_at DESC LIMIT 5`,
    [clientId]
  );
  return rows;
}
