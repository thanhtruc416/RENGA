import pool from '../db';

const LIST_SELECT = `
  SELECT r.review_id, r.rating, r.content, r.media_urls, r.admin_reply, r.visibility_status, r.created_at,
         cu.full_name AS customer_name, p.product_id, p.product_name, pi.image_url AS product_image
  FROM review r
  JOIN order_item oi      ON oi.order_item_id = r.order_item_id
  JOIN \`order\` o         ON o.order_id = oi.order_id
  JOIN customer cu         ON cu.client_id = o.client_id
  LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
  LEFT JOIN product p          ON p.product_id = pv.product_id
  LEFT JOIN product_image pi   ON pi.product_id = p.product_id AND pi.is_primary = 1
`;

export async function getAdminReviews(page = 1, limit = 20, visibility?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (visibility) { where += ' AND r.visibility_status = ?'; params.push(visibility); }
  if (search) {
    where += ' AND (cu.full_name LIKE ? OR p.product_name LIKE ? OR r.content LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `${LIST_SELECT} ${where} ORDER BY r.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total
     FROM review r
     JOIN order_item oi ON oi.order_item_id = r.order_item_id
     JOIN \`order\` o ON o.order_id = oi.order_id
     JOIN customer cu ON cu.client_id = o.client_id
     LEFT JOIN order_item oi2 ON oi2.order_item_id = r.order_item_id
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     ${where}`,
    params,
  );

  const reviews = (rows as any[]).map(r => ({
    ...r,
    media_urls: r.media_urls ? String(r.media_urls).split(',') : [],
  }));

  return { reviews, total, page, limit };
}

export async function setReviewVisibility(reviewId: string, visibility: 'VISIBLE' | 'HIDDEN') {
  if (!['VISIBLE', 'HIDDEN'].includes(visibility)) {
    throw { status: 400, message: 'Trạng thái hiển thị không hợp lệ.' };
  }
  const [result] = await pool.execute<any>(
    `UPDATE review SET visibility_status = ? WHERE review_id = ?`,
    [visibility, reviewId],
  );
  if (result.affectedRows === 0) throw { status: 404, message: 'Không tìm thấy đánh giá.' };
}

export async function replyToReview(reviewId: string, replyContent: string) {
  if (!replyContent?.trim()) throw { status: 400, message: 'Vui lòng nhập nội dung phản hồi.' };
  const [result] = await pool.execute<any>(
    `UPDATE review SET admin_reply = ? WHERE review_id = ?`,
    [replyContent.trim(), reviewId],
  );
  if (result.affectedRows === 0) throw { status: 404, message: 'Không tìm thấy đánh giá.' };
}
