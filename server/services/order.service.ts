import pool from '../db';
import { clearCart } from './cart.service';
import { shortenName } from './product.service';

interface CreateOrderPayload {
  clientId: string;
  items: Array<{ variant_id: string; quantity: number; unit_price: number }>;
  address: { recipient_name: string; recipient_phone: string; address_line: string; province: string; ward?: string };
  discount_amount?: number;
  customer_voucher_id?: string | null;
  note?: string;
}

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export async function createOrder(payload: CreateOrderPayload) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Upsert address
    const addressId = await nextId('ADR', 'address', 'address_id');
    await conn.execute(
      `INSERT INTO address (address_id, client_id, recipient_name, recipient_phone, address_line, ward, province, is_default, created_at)
       VALUES (?,?,?,?,?,?,?,0,NOW())`,
      [addressId, payload.clientId, payload.address.recipient_name, payload.address.recipient_phone,
       payload.address.address_line, payload.address.ward ?? '', payload.address.province]
    );

    // 2. Tạo order
    const orderId = await nextId('ORD', 'order', 'order_id');
    const total = payload.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
    const finalTotal = Math.max(total - (payload.discount_amount ?? 0), 0);

    await conn.execute(
      `INSERT INTO \`order\`
         (order_id, client_id, order_type, order_status, address_id,
          shipping_status, voucher_customer_id, discount_amount, total_amount, note, created_at, updated_at)
       VALUES (?,?,'STANDARD','PENDING',?,'NOT_SHIPPED',?,?,?,?,NOW(),NOW())`,
      [orderId, payload.clientId, addressId,
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

    // 4. Đánh dấu voucher đã dùng
    if (payload.customer_voucher_id) {
      await conn.execute(
        "UPDATE customer_voucher SET status='USED', used_at=NOW(), order_id=? WHERE customer_voucher_id=?",
        [orderId, payload.customer_voucher_id]
      );
    }

    await conn.commit();

    // 5. Xóa giỏ hàng
    await clearCart(payload.clientId);

    return orderId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function getUserOrders(clientId: string) {
  const [orders] = await pool.execute<any[]>(
    `SELECT o.order_id, o.order_type, o.order_status, o.total_amount, o.created_at,
            COUNT(oi.order_item_id) as item_count,
            MIN(COALESCE(p.product_name, 'Trang sức tùy chỉnh')) as first_product_name
     FROM \`order\` o
     LEFT JOIN order_item oi ON oi.order_id = o.order_id
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     WHERE o.client_id = ?
     GROUP BY o.order_id, o.order_type, o.order_status, o.total_amount, o.created_at
     ORDER BY o.created_at DESC`,
    [clientId]
  );
  return (orders as any[]).map(o => ({
    ...o,
    first_product_name: o.first_product_name ? shortenName(o.first_product_name) : o.first_product_name,
  }));
}

export async function getOrderDetail(orderId: string, clientId: string) {
  const [[order]] = await pool.execute<any[]>(
    `SELECT o.*, a.recipient_name, a.recipient_phone, a.address_line, a.province
     FROM \`order\` o
     JOIN address a ON a.address_id = o.address_id
     WHERE o.order_id = ? AND o.client_id = ?`,
    [orderId, clientId]
  );
  if (!order) return null;

  const [items] = await pool.execute<any[]>(
    `SELECT oi.*, p.product_name, pv.variant_name, pv.size_value,
            COALESCE(pri.image_url, bf.image_url) AS image_url
     FROM order_item oi
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     LEFT JOIN product_image pri ON pri.product_id = p.product_id AND pri.is_primary = 1
     LEFT JOIN customization c ON c.custom_id = oi.custom_id
     LEFT JOIN blank_form bf ON bf.blank_id = c.blank_id
     WHERE oi.order_id = ?`,
    [orderId]
  );

  const mappedItems = items.map((item: any) => ({
    ...item,
    product_name: item.product_name ? shortenName(item.product_name) : null,
  }));

  return { ...order, items: mappedItems };
}

export async function getUserAddresses(clientId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT address_id, recipient_name, recipient_phone, address_line, ward, province
     FROM address WHERE client_id = ? ORDER BY is_default DESC, created_at DESC LIMIT 5`,
    [clientId]
  );
  return rows;
}
