import pool from '../db';
import { notifyWarrantyQuoted } from './notification.service';

const STATUSES = ['PENDING', 'QUOTED', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED'] as const;
type WarrantyStatus = typeof STATUSES[number];

const ALLOWED_TRANSITIONS: Record<WarrantyStatus, WarrantyStatus[]> = {
  PENDING:     ['ACCEPTED', 'REJECTED', 'QUOTED'],
  QUOTED:      ['IN_PROGRESS', 'REJECTED'],
  ACCEPTED:    ['IN_PROGRESS', 'REJECTED'],
  IN_PROGRESS: ['COMPLETED'],
  REJECTED:    [],
  COMPLETED:   [],
};

// Mỗi order có thể nhiều order_item — chỉ lấy 1 dòng đại diện để hiển thị ảnh/tên sản phẩm.
const LIST_SELECT = `
  SELECT w.warranty_id, w.order_id, w.request_type, w.issue_description, w.evidence_images,
         w.warranty_status, w.rejection_reason, w.estimated_cost, w.estimated_time,
         w.handler_id, w.drop_off_date, w.received_at,
         w.completed_at, w.created_at,
         cu.full_name AS customer_name, cl.phone AS customer_phone, cl.email AS customer_email,
         p.product_id, p.product_name, pv.variant_name, pi.image_url AS product_image
  FROM warranty_request w
  JOIN \`order\` o ON o.order_id = w.order_id
  JOIN client cl ON cl.client_id = o.client_id
  LEFT JOIN customer cu ON cu.client_id = cl.client_id
  LEFT JOIN order_item oi ON oi.order_id = o.order_id
    AND oi.order_item_id = (SELECT MIN(order_item_id) FROM order_item WHERE order_id = o.order_id)
  LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
  LEFT JOIN product p ON p.product_id = pv.product_id
  LEFT JOIN product_image pi ON pi.product_id = p.product_id AND pi.is_primary = 1
`;

export async function getAdminWarrantyRequests(page = 1, limit = 20, status?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (status) { where += ' AND w.warranty_status = ?'; params.push(status); }
  if (search) {
    where += ' AND (w.warranty_id LIKE ? OR w.order_id LIKE ? OR cu.full_name LIKE ? OR p.product_name LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `${LIST_SELECT} ${where} ORDER BY w.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total
     FROM warranty_request w
     JOIN \`order\` o ON o.order_id = w.order_id
     JOIN client cl ON cl.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = cl.client_id
     LEFT JOIN order_item oi ON oi.order_id = o.order_id
       AND oi.order_item_id = (SELECT MIN(order_item_id) FROM order_item WHERE order_id = o.order_id)
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     ${where}`,
    params,
  );

  const items = (rows as any[]).map(r => ({
    ...r,
    evidence_images: r.evidence_images ? String(r.evidence_images).split(',') : [],
  }));

  return { requests: items, total, page, limit };
}

export async function getAdminWarrantyDetail(warrantyId: string) {
  const [[row]] = await pool.execute<any[]>(`${LIST_SELECT} WHERE w.warranty_id = ?`, [warrantyId]);
  if (!row) return null;
  return { ...row, evidence_images: row.evidence_images ? String(row.evidence_images).split(',') : [] };
}

export async function getWarrantyStats() {
  const [[stats]] = await pool.execute<any[]>(
    `SELECT
       COUNT(*) AS total,
       SUM(warranty_status = 'PENDING') AS pending_count,
       SUM(warranty_status IN ('ACCEPTED','IN_PROGRESS')) AS in_progress_count,
       SUM(warranty_status = 'REJECTED') AS rejected_count,
       AVG(CASE WHEN warranty_status = 'COMPLETED' AND received_at IS NOT NULL AND completed_at IS NOT NULL
                THEN DATEDIFF(completed_at, received_at) END) AS avg_repair_days
     FROM warranty_request`,
  );
  return {
    total: Number(stats.total) || 0,
    pendingCount: Number(stats.pending_count) || 0,
    inProgressCount: Number(stats.in_progress_count) || 0,
    rejectedCount: Number(stats.rejected_count) || 0,
    avgRepairDays: stats.avg_repair_days !== null ? Number(stats.avg_repair_days) : null,
  };
}

export async function updateWarrantyStatus(
  warrantyId: string, newStatus: string, adminEmployeeId: string, rejectionReason?: string,
) {
  if (!STATUSES.includes(newStatus as WarrantyStatus)) {
    throw { status: 400, message: 'Trạng thái không hợp lệ.' };
  }

  const [[req]] = await pool.execute<any[]>(
    `SELECT warranty_status FROM warranty_request WHERE warranty_id = ?`,
    [warrantyId],
  );
  if (!req) throw { status: 404, message: 'Không tìm thấy yêu cầu bảo hành.' };

  const current = req.warranty_status as WarrantyStatus;
  if (!ALLOWED_TRANSITIONS[current].includes(newStatus as WarrantyStatus)) {
    throw { status: 409, message: `Không thể chuyển từ ${current} sang ${newStatus}.` };
  }
  if (newStatus === 'REJECTED' && !rejectionReason?.trim()) {
    throw { status: 400, message: 'Vui lòng nhập lý do từ chối.' };
  }

  const sets: string[] = ['warranty_status = ?', 'handler_id = ?'];
  const params: any[] = [newStatus, adminEmployeeId];

  if (newStatus === 'ACCEPTED') { sets.push('received_at = CURDATE()'); }
  if (newStatus === 'REJECTED') { sets.push('rejection_reason = ?'); params.push(rejectionReason!.trim()); }
  if (newStatus === 'COMPLETED') { sets.push('completed_at = CURDATE()'); }

  params.push(warrantyId);
  await pool.execute(`UPDATE warranty_request SET ${sets.join(', ')} WHERE warranty_id = ?`, params);
}

// WAR-02: nhân viên gửi báo giá sửa chữa (chỉ áp dụng cho yêu cầu đang PENDING) —
// chuyển sang QUOTED và gửi email báo giá cho khách.
export async function sendWarrantyQuote(
  warrantyId: string, adminEmployeeId: string, estimatedCost: number, estimatedTime: string,
) {
  if (!(estimatedCost > 0)) throw { status: 400, message: 'Chi phí dự kiến phải lớn hơn 0.' };
  if (!estimatedTime?.trim()) throw { status: 400, message: 'Vui lòng nhập thời gian hoàn thành dự kiến.' };

  const [[req]] = await pool.execute<any[]>(
    `SELECT warranty_status FROM warranty_request WHERE warranty_id = ?`,
    [warrantyId],
  );
  if (!req) throw { status: 404, message: 'Không tìm thấy yêu cầu bảo hành.' };

  const current = req.warranty_status as WarrantyStatus;
  if (!ALLOWED_TRANSITIONS[current].includes('QUOTED')) {
    throw { status: 409, message: `Không thể gửi báo giá cho yêu cầu ở trạng thái ${current}.` };
  }

  await pool.execute(
    `UPDATE warranty_request
     SET warranty_status = 'QUOTED', handler_id = ?, estimated_cost = ?, estimated_time = ?
     WHERE warranty_id = ?`,
    [adminEmployeeId, estimatedCost, estimatedTime.trim(), warrantyId],
  );

  notifyWarrantyQuoted(warrantyId, estimatedCost, estimatedTime.trim())
    .catch(err => console.error(`[notification] notifyWarrantyQuoted(${warrantyId}) lỗi:`, err));
}
