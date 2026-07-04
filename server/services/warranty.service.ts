import pool from '../db';

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export interface CreateWarrantyRequestPayload {
  clientId: string;
  orderId: string;
  issueDescription: string;
  evidenceImages?: string[];
}

// BR-45/46: bảo hành lỗi sản xuất — miễn phí duy nhất 1 lần trong 12 tháng cho
// trang sức vàng/bạc thường; đơn tùy biến (Studio/Designer) bảo hành trọn đời.
export async function createWarrantyRequest(payload: CreateWarrantyRequestPayload): Promise<string> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[order]] = await conn.execute<any[]>(
      `SELECT order_id, order_type, order_status, created_at FROM \`order\`
       WHERE order_id = ? AND client_id = ? FOR UPDATE`,
      [payload.orderId, payload.clientId]
    );
    if (!order) {
      const err: any = new Error('Không tìm thấy đơn hàng.');
      err.status = 404;
      throw err;
    }
    if (order.order_status !== 'COMPLETED') {
      const err: any = new Error('Chỉ có thể yêu cầu bảo hành cho đơn hàng đã hoàn tất.');
      err.status = 409;
      throw err;
    }

    const isLifetimeWarranty = order.order_type === 'STUDIO' || order.order_type === 'DESIGN';

    if (!isLifetimeWarranty) {
      const monthsSinceOrder =
        (Date.now() - new Date(order.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsSinceOrder > 12) {
        const err: any = new Error('Đơn hàng đã quá thời hạn bảo hành 12 tháng.');
        err.status = 409;
        throw err;
      }

      const [[existing]] = await conn.execute<any[]>(
        `SELECT warranty_id FROM warranty_request
         WHERE order_id = ? AND request_type = 'WARRANTY'
           AND warranty_status != 'REJECTED'
         LIMIT 1`,
        [payload.orderId]
      );
      if (existing) {
        const err: any = new Error('Đơn hàng này đã sử dụng lượt bảo hành miễn phí.');
        err.status = 409;
        throw err;
      }
    }

    const warrantyId = await nextId('WAR', 'warranty_request', 'warranty_id');
    await conn.execute(
      `INSERT INTO warranty_request
         (warranty_id, order_id, request_type, issue_description, evidence_images, warranty_status, created_at)
       VALUES (?,?,'WARRANTY',?,?,'PENDING',NOW())`,
      [warrantyId, payload.orderId, payload.issueDescription,
        payload.evidenceImages?.length ? payload.evidenceImages.join(',') : null]
    );

    await conn.commit();
    return warrantyId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function getUserWarrantyRequests(clientId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT w.warranty_id, w.order_id, w.request_type, w.issue_description,
            w.warranty_status, w.rejection_reason, w.created_at
     FROM warranty_request w
     JOIN \`order\` o ON o.order_id = w.order_id
     WHERE o.client_id = ?
     ORDER BY w.created_at DESC`,
    [clientId]
  );
  return rows;
}

export interface CreateReturnRequestPayload {
  clientId: string;
  orderId: string;
  issueDescription: string;
  evidenceImages?: string[];
}

// BR-28/29: trả hàng trong vòng 3 ngày kể từ khi đơn hoàn tất (giao hàng) — chỉ áp
// dụng cho đơn hàng có sẵn (STANDARD); đơn tùy biến Studio/Designer là hàng đặt
// riêng, không nhận trả.
export async function createReturnRequest(payload: CreateReturnRequestPayload): Promise<string> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[order]] = await conn.execute<any[]>(
      `SELECT order_id, order_type, order_status, updated_at FROM \`order\`
       WHERE order_id = ? AND client_id = ? FOR UPDATE`,
      [payload.orderId, payload.clientId]
    );
    if (!order) {
      const err: any = new Error('Không tìm thấy đơn hàng.');
      err.status = 404;
      throw err;
    }
    if (order.order_status !== 'COMPLETED') {
      const err: any = new Error('Chỉ có thể yêu cầu trả hàng cho đơn hàng đã giao thành công.');
      err.status = 409;
      throw err;
    }
    if (order.order_type !== 'STANDARD') {
      const err: any = new Error('Đơn hàng tùy biến (Studio/Designer) không áp dụng chính sách trả hàng.');
      err.status = 409;
      throw err;
    }

    const daysSinceCompleted = (Date.now() - new Date(order.updated_at).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCompleted > 3) {
      const err: any = new Error('Đơn hàng đã quá thời hạn trả hàng 3 ngày kể từ khi giao.');
      err.status = 409;
      throw err;
    }

    const [[existing]] = await conn.execute<any[]>(
      `SELECT warranty_id FROM warranty_request
       WHERE order_id = ? AND request_type = 'RETURN' AND warranty_status != 'REJECTED'
       LIMIT 1`,
      [payload.orderId]
    );
    if (existing) {
      const err: any = new Error('Đơn hàng này đã có yêu cầu trả hàng.');
      err.status = 409;
      throw err;
    }

    const warrantyId = await nextId('WAR', 'warranty_request', 'warranty_id');
    await conn.execute(
      `INSERT INTO warranty_request
         (warranty_id, order_id, request_type, issue_description, evidence_images, warranty_status, created_at)
       VALUES (?,?,'RETURN',?,?,'PENDING',NOW())`,
      [warrantyId, payload.orderId, payload.issueDescription,
        payload.evidenceImages?.length ? payload.evidenceImages.join(',') : null]
    );

    await conn.commit();
    return warrantyId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
