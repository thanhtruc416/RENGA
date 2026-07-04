import pool from '../db';
import { awardPurchasePoints } from './loyalty.service';
import { notifyOrderPlaced } from './notification.service';

export async function getBlanks() {
  const [rows] = await pool.execute<any[]>(
    `SELECT blank_id, blank_name, blank_type, base_price, description, image_url
     FROM blank_form WHERE is_active = 1 ORDER BY blank_type, base_price`
  );
  return rows;
}

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

const MATERIAL_DB_MAP: Record<string, string> = {
  'vang-18k': 'MAT000002',
  'vang-14k': 'MAT000003',
  'bach-kim': 'MAT000004',
  'bac-925':  'MAT000001',
};

// BR-16: giá phải chốt lại ở server tại thời điểm đặt cọc, không tin totalPrice
// client gửi lên (client có thể sửa request để trả ít tiền hơn). Các hằng số này
// phải khớp với src/app/studio/studio.component.ts (materials/stones/CRAFT_FEE/
// engrave rules) — đổi giá ở FE thì phải đổi ở đây tương ứng.
const MATERIAL_PRICE_VND: Record<string, number> = {
  'vang-18k': 15_000_000,
  'vang-14k': 12_000_000,
  'bach-kim': 20_000_000,
  'bac-925':  8_000_000,
};

const STONE_PRICE_PER_CARAT: Record<string, number> = {
  diamond:  10_000_000,
  ruby:     8_000_000,
  sapphire: 7_000_000,
  emerald:  6_000_000,
  none:     0,
};

const CRAFT_FEE = 5_000_000;
const ENGRAVE_FEE_PER_CHAR = 50_000;
const ENGRAVE_FREE_CHARS = 10;

interface PriceInputs {
  blankId?: string | null;
  materialId?: string | null;
  stoneId?: string | null;
  carat?: number;
  engraveTextLength?: number;
}

async function computeStudioSubtotal(inputs: PriceInputs): Promise<number> {
  let blankPrice = 0;
  if (inputs.blankId) {
    const [[blank]] = await pool.execute<any[]>(
      'SELECT base_price FROM blank_form WHERE blank_id = ? AND is_active = 1',
      [inputs.blankId]
    );
    if (!blank) throw new Error('Phôi sản phẩm không hợp lệ');
    blankPrice = Number(blank.base_price);
  }

  const materialPrice = MATERIAL_PRICE_VND[inputs.materialId ?? ''] ?? 0;
  const stonePrice = inputs.stoneId && inputs.stoneId !== 'none'
    ? Math.round((STONE_PRICE_PER_CARAT[inputs.stoneId] ?? 0) * (inputs.carat ?? 0))
    : 0;
  const extraChars = Math.max(0, (inputs.engraveTextLength ?? 0) - ENGRAVE_FREE_CHARS);
  const engraveFee = extraChars * ENGRAVE_FEE_PER_CHAR;

  return blankPrice + materialPrice + stonePrice + engraveFee + CRAFT_FEE;
}

async function computeVoucherDiscount(
  customerVoucherId: string | null | undefined,
  clientId: string,
  orderTotal: number,
): Promise<number> {
  if (!customerVoucherId) return 0;
  const [[row]] = await pool.execute<any[]>(
    `SELECT v.discount_type, v.discount_value, v.min_order_value, v.max_discount_amount
     FROM customer_voucher cv
     JOIN voucher v ON v.voucher_id = cv.voucher_id
     WHERE cv.customer_voucher_id = ? AND cv.client_id = ? AND cv.status = 'AVAILABLE'
       AND v.status = 'ACTIVE' AND NOW() BETWEEN v.valid_from AND v.valid_to`,
    [customerVoucherId, clientId]
  );
  if (!row || orderTotal < Number(row.min_order_value)) return 0;

  let discount = row.discount_type === 'PERCENTAGE'
    ? Math.round(orderTotal * Number(row.discount_value) / 100)
    : Number(row.discount_value);
  if (row.discount_type === 'PERCENTAGE' && row.max_discount_amount) {
    discount = Math.min(discount, Number(row.max_discount_amount));
  }
  return discount;
}

export interface CreateStudioOrderPayload {
  clientId: string;
  blankId?: string | null;
  materialId?: string | null;
  stoneId?: string | null;
  carat?: number;
  engraveTextLength?: number;
  customerVoucherId?: string | null;
  address: {
    recipient_name: string;
    recipient_phone: string;
    address_line: string;
    province: string;
    ward?: string;
  };
  note?: string;
}

export async function createStudioOrder(payload: CreateStudioOrderPayload) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const addressId = await nextId('ADR', 'address', 'address_id');
    await conn.execute(
      `INSERT INTO address (address_id, client_id, recipient_name, recipient_phone, address_line, ward, province, is_default, created_at)
       VALUES (?,?,?,?,?,?,?,0,NOW())`,
      [addressId, payload.clientId,
        payload.address.recipient_name, payload.address.recipient_phone,
        payload.address.address_line, payload.address.ward ?? '', payload.address.province]
    );

    const orderId = await nextId('ORD', 'order', 'order_id');
    const subtotal = await computeStudioSubtotal(payload);
    const discountAmount = await computeVoucherDiscount(payload.customerVoucherId, payload.clientId, subtotal);
    const voucherApplied = discountAmount > 0 ? payload.customerVoucherId ?? null : null;
    const finalTotal = Math.max(subtotal - discountAmount, 0);
    const depositAmount = Math.round(finalTotal * 0.5);

    await conn.execute(
      `INSERT INTO \`order\`
         (order_id, client_id, order_type, order_status, address_id,
          shipping_status, voucher_customer_id, discount_amount, total_amount, deposit_amount, note, created_at, updated_at)
       VALUES (?,?,'STUDIO','PENDING',?,'NOT_SHIPPED',?,?,?,?,?,NOW(),NOW())`,
      [orderId, payload.clientId, addressId,
        voucherApplied, discountAmount, finalTotal, depositAmount,
        payload.note ?? 'Đơn customization studio']
    );

    let customId: string | null = null;
    if (payload.blankId) {
      customId = await nextId('CST', 'customization', 'custom_id');
      const dbMaterialId = MATERIAL_DB_MAP[payload.materialId ?? ''] ?? 'MAT000002';
      await conn.execute(
        `INSERT INTO customization (custom_id, client_id, blank_id, material_id, calculated_price, status, created_at, updated_at)
         VALUES (?,?,?,?,?,'ORDERED',NOW(),NOW())`,
        [customId, payload.clientId, payload.blankId, dbMaterialId, finalTotal]
      );
    }

    const itemId = await nextId('ORI', 'order_item', 'order_item_id');
    await conn.execute(
      `INSERT INTO order_item (order_item_id, order_id, item_type, custom_id, quantity, unit_price, subtotal)
       VALUES (?,?,'CUSTOMIZATION',?,1,?,?)`,
      [itemId, orderId, customId, finalTotal, finalTotal]
    );

    if (voucherApplied) {
      await conn.execute(
        "UPDATE customer_voucher SET status='USED', used_at=NOW(), order_id=? WHERE customer_voucher_id=?",
        [orderId, voucherApplied]
      );
    }

    // BR-40: cộng điểm tích lũy (bị hoàn lại nếu đơn bị hủy — xem cancelOrder/cancelExpiredOrders)
    await awardPurchasePoints(conn, payload.clientId, orderId, finalTotal);

    await conn.commit();

    // Mail xác nhận đặt hàng — gửi sau khi transaction đã commit, lỗi mail không
    // được làm hỏng đơn đã tạo thành công.
    notifyOrderPlaced(orderId, payload.clientId, finalTotal, 'Đơn hàng tùy biến Studio')
      .catch(err => console.error(`[notification] notifyOrderPlaced(${orderId}) lỗi:`, err));

    return orderId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
