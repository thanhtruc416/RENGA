import pool from '../db';
import { shortenName } from './product.service';
import { logOrderStatusChange } from './order.service';

const ORDER_STATUSES = ['PENDING', 'PAYMENT_CONFIRMED', 'PACKED', 'SHIPPED', 'COMPLETED', 'CANCELLED'] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

// Chỉ cho phép chuyển tuần tự tới trước, hoặc hủy từ các bước chưa giao —
// không cho quay lại bước trước, không cho hủy đơn đã COMPLETED/SHIPPED.
const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING:            ['PAYMENT_CONFIRMED', 'CANCELLED'],
  PAYMENT_CONFIRMED:  ['PACKED', 'CANCELLED'],
  PACKED:             ['SHIPPED', 'CANCELLED'],
  SHIPPED:            ['COMPLETED'],
  COMPLETED:          [],
  CANCELLED:          [],
};

export async function getAdminOrders(page = 1, limit = 20, status?: string, type?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (status) { where += ' AND o.order_status = ?'; params.push(status); }
  if (type)   { where += ' AND o.order_type = ?';   params.push(type); }
  if (search) {
    where += ' AND (o.order_id LIKE ? OR cu.full_name LIKE ? OR cl.phone LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `SELECT o.order_id, o.order_type, o.order_status, o.craft_status, o.total_amount, o.created_at,
            cl.phone, cu.full_name AS customer_name,
            COUNT(oi.order_item_id) AS item_count
     FROM \`order\` o
     JOIN client cl ON cl.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = cl.client_id
     LEFT JOIN order_item oi ON oi.order_id = o.order_id
     ${where}
     GROUP BY o.order_id, o.order_type, o.order_status, o.craft_status, o.total_amount, o.created_at, cl.phone, cu.full_name
     ORDER BY o.created_at DESC
     LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(DISTINCT o.order_id) AS total
     FROM \`order\` o
     JOIN client cl ON cl.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = cl.client_id
     ${where}`,
    params,
  );

  return { orders: rows, total, page, limit };
}

export async function getAdminOrderDetail(orderId: string) {
  const [[order]] = await pool.execute<any[]>(
    `SELECT o.*, cl.phone, cu.full_name AS customer_name,
            a.recipient_name, a.recipient_phone, a.address_line, a.province, a.ward
     FROM \`order\` o
     JOIN client cl ON cl.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = cl.client_id
     JOIN address a ON a.address_id = o.address_id
     WHERE o.order_id = ?`,
    [orderId],
  );
  if (!order) return null;

  const [items] = await pool.execute<any[]>(
    `SELECT oi.*, p.product_name, pv.variant_name, pv.size_value
     FROM order_item oi
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     WHERE oi.order_id = ?`,
    [orderId],
  );

  return {
    ...order,
    items: (items as any[]).map(i => ({ ...i, product_name: i.product_name ? shortenName(i.product_name) : null })),
  };
}

export async function updateAdminOrderStatus(orderId: string, newStatus: string, adminEmployeeId?: string) {
  if (!ORDER_STATUSES.includes(newStatus as OrderStatus)) {
    throw { status: 400, message: 'Trạng thái không hợp lệ.' };
  }

  const [[order]] = await pool.execute<any[]>(
    `SELECT order_status FROM \`order\` WHERE order_id = ?`,
    [orderId],
  );
  if (!order) throw { status: 404, message: 'Không tìm thấy đơn hàng.' };

  const current = order.order_status as OrderStatus;
  if (!ALLOWED_TRANSITIONS[current].includes(newStatus as OrderStatus)) {
    throw { status: 409, message: `Không thể chuyển từ ${current} sang ${newStatus}.` };
  }

  await pool.execute(
    `UPDATE \`order\` SET order_status = ?, updated_at = NOW() WHERE order_id = ?`,
    [newStatus, orderId],
  );
  await logOrderStatusChange(pool, orderId, current, newStatus, adminEmployeeId ?? null);

  // ORD-04: order.service.ts trừ tồn kho ngay lúc đặt — admin huỷ qua đây cũng
  // phải hoàn lại, nếu không tồn kho sẽ bị mất vĩnh viễn mỗi lần huỷ đơn.
  if (newStatus === 'CANCELLED') {
    await pool.execute(
      `UPDATE product_variant pv
       JOIN order_item oi ON oi.variant_id = pv.variant_id
       SET pv.stock_quantity = pv.stock_quantity + oi.quantity
       WHERE oi.order_id = ? AND oi.item_type = 'PRODUCT'`,
      [orderId],
    );
    // Tương tự cho thiết kế tùy biến — trả về DRAFT.
    await pool.execute(
      `UPDATE customization c
       JOIN order_item oi ON oi.custom_id = c.custom_id
       SET c.status = 'DRAFT', c.updated_at = NOW()
       WHERE oi.order_id = ? AND oi.item_type = 'CUSTOMIZATION'`,
      [orderId],
    );
  }
}
