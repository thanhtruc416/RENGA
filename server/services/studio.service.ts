import pool from '../db';

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

export interface CreateStudioOrderPayload {
  clientId: string;
  totalPrice: number;
  discountAmount?: number;
  customerVoucherId?: string | null;
  blankId?: string | null;
  materialId?: string | null;
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
    const discountAmount = payload.discountAmount ?? 0;
    const finalTotal = Math.max(payload.totalPrice - discountAmount, 0);
    const depositAmount = Math.round(finalTotal * 0.5);

    await conn.execute(
      `INSERT INTO \`order\`
         (order_id, client_id, order_type, order_status, address_id,
          shipping_status, voucher_customer_id, discount_amount, total_amount, deposit_amount, note, created_at, updated_at)
       VALUES (?,?,'STUDIO','PENDING',?,'NOT_SHIPPED',?,?,?,?,?,NOW(),NOW())`,
      [orderId, payload.clientId, addressId,
        payload.customerVoucherId ?? null, discountAmount, finalTotal, depositAmount,
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

    if (payload.customerVoucherId) {
      await conn.execute(
        "UPDATE customer_voucher SET status='USED', used_at=NOW(), order_id=? WHERE customer_voucher_id=?",
        [orderId, payload.customerVoucherId]
      );
    }

    await conn.commit();
    return orderId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
