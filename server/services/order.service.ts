import pool from '../db';
import { clearCart } from './cart.service';
import { shortenName } from './product.service';
import { awardPurchasePoints, revokePurchasePoints } from './loyalty.service';
import { notifyOrderPlaced, notifyOrderCancelled } from './notification.service';

// ─── Types ────────────────────────────────────────────────────────────────────

type DbPaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'VOUCHER';
type OrderType       = 'STANDARD' | 'STUDIO' | 'DESIGN';

interface CreateOrderPayload {
  clientId:            string;
  order_type?:         OrderType;
  payment_method:      DbPaymentMethod;
  items:               Array<{ variant_id: string; quantity: number; unit_price: number }>;
  address:             { recipient_name: string; recipient_phone: string; address_line: string; province: string; ward?: string };
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

// ─── Tạo đơn hàng ─────────────────────────────────────────────────────────────

export async function createOrder(payload: CreateOrderPayload) {
  const orderType     = payload.order_type    ?? 'STANDARD';
  const paymentMethod = payload.payment_method;
  const expiresAt     = computeExpiresAt(orderType, paymentMethod);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Lưu địa chỉ
    const addressId = await nextId('ADR', 'address', 'address_id');
    await conn.execute(
      `INSERT INTO address (address_id, client_id, recipient_name, recipient_phone, address_line, ward, province, is_default, created_at)
       VALUES (?,?,?,?,?,?,?,0,NOW())`,
      [addressId, payload.clientId, payload.address.recipient_name, payload.address.recipient_phone,
       payload.address.address_line, payload.address.ward ?? '', payload.address.province]
    );

    // 2. Tạo order
    const orderId    = await nextId('ORD', 'order', 'order_id');
    const total      = payload.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
    const finalTotal = Math.max(total - (payload.discount_amount ?? 0), 0);

    await conn.execute(
      `INSERT INTO \`order\`
         (order_id, client_id, order_type, order_status, address_id,
          shipping_status, voucher_customer_id, discount_amount, total_amount, note, created_at, updated_at)
       VALUES (?,?,?,'PENDING',?,'NOT_SHIPPED',?,?,?,?,NOW(),NOW())`,
      [orderId, payload.clientId, orderType, addressId,
       payload.customer_voucher_id ?? null, payload.discount_amount ?? 0, finalTotal,
       payload.note ?? null]
    );

    // 3. Tạo order items
    for (const item of payload.items) {
      const itemId = await nextId('ORI', 'order_item', 'order_item_id');
      await conn.execute(
        `INSERT INTO order_item (order_item_id, order_id, item_type, variant_id, quantity, unit_price, subtotal)
         VALUES (?,?,'PRODUCT',?,?,?,?)`,
        [itemId, orderId, item.variant_id, item.quantity, item.unit_price, item.unit_price * item.quantity]
      );
    }

    // 4. Tạo payment record (PENDING) — để cancelExpiredOrders JOIN được
    const paymentId   = await nextId('PAY', 'payment', 'payment_id');
    const transType   = orderType === 'STANDARD' ? 'PAYMENT' : 'DEPOSIT';
    await conn.execute(
      `INSERT INTO payment (payment_id, order_id, transaction_type, payment_method, amount, payment_status, created_at)
       VALUES (?,?,?,?,?,'PENDING',NOW())`,
      [paymentId, orderId, transType, paymentMethod, finalTotal]
    );

    // 5. Đánh dấu voucher đã dùng
    if (payload.customer_voucher_id) {
      await conn.execute(
        "UPDATE customer_voucher SET status='USED', used_at=NOW(), order_id=? WHERE customer_voucher_id=?",
        [orderId, payload.customer_voucher_id]
      );
    }

    // 6. BR-40: cộng điểm tích lũy (bị hoàn lại nếu đơn bị hủy — xem cancelOrder/cancelExpiredOrders)
    await awardPurchasePoints(conn, payload.clientId, orderId, finalTotal);

    await conn.commit();

    // 6. Xóa giỏ hàng
    await clearCart(payload.clientId);

    // 7. Mail xác nhận đặt hàng — gửi sau khi transaction đã commit xong, lỗi mail
    // không được làm hỏng đơn đã tạo thành công.
    notifyOrderPlaced(orderId, payload.clientId, finalTotal, orderType === 'STANDARD' ? 'Đơn hàng tiêu chuẩn' : 'Đơn hàng tùy biến')
      .catch(err => console.error(`[notification] notifyOrderPlaced(${orderId}) lỗi:`, err));

    return { orderId, expiresAt };
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

    // BR-42: hoàn lại điểm đã cộng lúc đặt đơn (nếu có)
    for (const orderId of orderIds) {
      await revokePurchasePoints(conn, orderId);
    }

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
      `SELECT order_id, order_status, total_amount, voucher_customer_id
       FROM \`order\` WHERE order_id = ? AND client_id = ? FOR UPDATE`,
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

    const cancelId = await nextId('CAN', 'cancellation_request', 'cancel_id');
    await conn.execute(
      `INSERT INTO cancellation_request (cancel_id, order_id, reason, refund_amount, status, handled_at, created_at)
       VALUES (?,?,?,?,'APPROVED',NOW(),NOW())`,
      [cancelId, orderId, reason, order.total_amount]
    );

    // BR-42: hoàn lại điểm đã cộng lúc đặt đơn (nếu có)
    await revokePurchasePoints(conn, orderId);

    await conn.commit();

    // Mail thông báo hủy đơn — gửi sau khi transaction đã commit, lỗi mail không
    // được làm hỏng việc hủy đơn đã thành công.
    const refundAmount = Number(order.total_amount);
    notifyOrderCancelled(orderId, clientId, reason, refundAmount)
      .catch(err => console.error(`[notification] notifyOrderCancelled(${orderId}) lỗi:`, err));

    return { refundAmount };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
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
    `SELECT o.*, a.recipient_name, a.recipient_phone, a.address_line, a.province,
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
