import pool from '../db';
import { revokePurchasePoints } from './loyalty.service';
import { notifyOrderCancelled, notifyCancellationRejected } from './notification.service';
import { logOrderStatusChange } from './order.service';

const LIST_SELECT = `
  SELECT cr.cancel_id, cr.order_id, cr.reason, cr.refund_amount, cr.status,
         cr.processed_by_admin_id, cr.handled_at, cr.created_at,
         o.order_status, o.total_amount, o.client_id,
         cu.full_name AS customer_name, cl.phone AS customer_phone
  FROM cancellation_request cr
  JOIN \`order\` o ON o.order_id = cr.order_id
  JOIN client cl ON cl.client_id = o.client_id
  LEFT JOIN customer cu ON cu.client_id = cl.client_id
`;

export async function getAdminCancellationRequests(page = 1, limit = 20, status?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (status) { where += ' AND cr.status = ?'; params.push(status); }
  if (search) {
    where += ' AND (cr.order_id LIKE ? OR cu.full_name LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `${LIST_SELECT} ${where} ORDER BY cr.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    params,
  );
  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total
     FROM cancellation_request cr
     JOIN \`order\` o ON o.order_id = cr.order_id
     JOIN client cl ON cl.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = cl.client_id
     ${where}`,
    params,
  );
  return { requests: rows, total, page, limit };
}

export async function approveCancellationRequest(cancelId: string, adminEmployeeId: string) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[cr]] = await conn.execute<any[]>(
      `SELECT cr.status, cr.order_id, cr.reason, o.client_id, o.total_amount, o.voucher_customer_id, o.order_status, py.payment_method
       FROM cancellation_request cr
       JOIN \`order\` o ON o.order_id = cr.order_id
       LEFT JOIN payment py ON py.order_id = o.order_id
       WHERE cr.cancel_id = ? FOR UPDATE`,
      [cancelId]
    );
    if (!cr) throw { status: 404, message: 'Không tìm thấy yêu cầu hủy.' };
    if (cr.status !== 'PENDING') throw { status: 409, message: `Yêu cầu này đã được xử lý (${cr.status}).` };
    if (['CANCELLED', 'COMPLETED'].includes(cr.order_status)) {
      throw { status: 409, message: 'Đơn hàng đã ở trạng thái không thể hủy nữa.' };
    }

    await conn.execute(`UPDATE \`order\` SET order_status='CANCELLED', updated_at=NOW() WHERE order_id = ?`, [cr.order_id]);
    await logOrderStatusChange(conn, cr.order_id, cr.order_status, 'CANCELLED', adminEmployeeId, cr.reason);
    await conn.execute(`UPDATE payment SET payment_status='FAILED' WHERE order_id = ? AND payment_status='PENDING'`, [cr.order_id]);
    // ORD-04: hoàn lại tồn kho đã trừ lúc đặt đơn.
    await conn.execute(
      `UPDATE product_variant pv
       JOIN order_item oi ON oi.variant_id = pv.variant_id
       SET pv.stock_quantity = pv.stock_quantity + oi.quantity
       WHERE oi.order_id = ? AND oi.item_type = 'PRODUCT'`,
      [cr.order_id]
    );
    if (cr.voucher_customer_id) {
      await conn.execute(
        `UPDATE customer_voucher SET status='AVAILABLE', used_at=NULL, order_id=NULL WHERE customer_voucher_id = ?`,
        [cr.voucher_customer_id]
      );
    }
    // COD chưa thu tiền trước nên không có gì để hoàn — cùng lý do với
    // order.service.ts's cancelOrder().
    const wasPaidUpfront = cr.payment_method !== 'CASH';
    const refundAmount = wasPaidUpfront ? Number(cr.total_amount) : 0;

    await conn.execute(
      `UPDATE cancellation_request SET status='APPROVED', refund_amount=?, processed_by_admin_id=?, handled_at=NOW() WHERE cancel_id = ?`,
      [refundAmount, adminEmployeeId, cancelId]
    );

    await revokePurchasePoints(conn, cr.order_id);

    await conn.commit();

    notifyOrderCancelled(cr.order_id, cr.client_id, cr.reason, refundAmount, wasPaidUpfront)
      .catch(err => console.error(`[notification] notifyOrderCancelled(${cr.order_id}) lỗi:`, err));
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function rejectCancellationRequest(cancelId: string, adminEmployeeId: string, adminReason: string) {
  if (!adminReason?.trim()) throw { status: 400, message: 'Vui lòng nhập lý do từ chối.' };

  const [[cr]] = await pool.execute<any[]>(
    `SELECT cr.status, cr.order_id, o.client_id
     FROM cancellation_request cr JOIN \`order\` o ON o.order_id = cr.order_id
     WHERE cr.cancel_id = ?`,
    [cancelId]
  );
  if (!cr) throw { status: 404, message: 'Không tìm thấy yêu cầu hủy.' };
  if (cr.status !== 'PENDING') throw { status: 409, message: `Yêu cầu này đã được xử lý (${cr.status}).` };

  await pool.execute(
    `UPDATE cancellation_request SET status='REJECTED', processed_by_admin_id=?, handled_at=NOW() WHERE cancel_id = ?`,
    [adminEmployeeId, cancelId]
  );

  notifyCancellationRejected(cr.order_id, cr.client_id, adminReason.trim())
    .catch(err => console.error(`[notification] notifyCancellationRejected(${cr.order_id}) lỗi:`, err));
}
