import pool from '../db';

const LIST_SELECT = `
  SELECT q.question_id, q.product_id, q.client_id, q.question_content, q.reply_content,
         q.visibility_status, q.created_at, q.replied_at, q.replied_by_admin_id,
         cu.full_name AS customer_name, mt.tier_name AS customer_tier,
         p.product_name, pi.image_url AS product_image
  FROM question q
  JOIN customer cu ON cu.client_id = q.client_id
  LEFT JOIN member_tier mt ON mt.tier_id = cu.tier_id
  JOIN product p ON p.product_id = q.product_id
  LEFT JOIN product_image pi ON pi.product_id = p.product_id AND pi.is_primary = 1
`;

function statusWhere(status?: string): string {
  if (status === 'pending') return `AND q.reply_content IS NULL AND q.visibility_status = 'VISIBLE'`;
  if (status === 'replied') return `AND q.reply_content IS NOT NULL AND q.visibility_status = 'VISIBLE'`;
  if (status === 'hidden')  return `AND q.visibility_status = 'HIDDEN'`;
  return '';
}

export async function getAdminQuestions(page = 1, limit = 20, status?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = `WHERE 1=1 ${statusWhere(status)}`;
  if (search) {
    where += ' AND (cu.full_name LIKE ? OR p.product_name LIKE ? OR q.question_content LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `${LIST_SELECT} ${where} ORDER BY q.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total FROM question q
     JOIN customer cu ON cu.client_id = q.client_id
     JOIN product p ON p.product_id = q.product_id
     ${where}`,
    params,
  );

  return { questions: rows, total, page, limit };
}

export async function getQaStats() {
  const [[stats]] = await pool.execute<any[]>(
    `SELECT
       COUNT(*) AS total,
       SUM(reply_content IS NULL AND visibility_status = 'VISIBLE') AS pending_count,
       SUM(reply_content IS NOT NULL AND visibility_status = 'VISIBLE') AS replied_count,
       SUM(visibility_status = 'HIDDEN') AS hidden_count,
       SUM(created_at >= NOW() - INTERVAL 1 DAY) AS new_last_24h,
       AVG(CASE WHEN reply_content IS NOT NULL AND replied_at IS NOT NULL
                THEN TIMESTAMPDIFF(HOUR, created_at, replied_at) END) AS avg_reply_hours
     FROM question`,
  );
  const total = Number(stats.total) || 0;
  const repliedVisible = Number(stats.replied_count) || 0;
  const repliedOverall = total - (Number(stats.pending_count) || 0);
  return {
    total,
    pendingCount: Number(stats.pending_count) || 0,
    repliedCount: repliedVisible,
    hiddenCount: Number(stats.hidden_count) || 0,
    newLast24h: Number(stats.new_last_24h) || 0,
    replyRatePct: total > 0 ? Math.round((repliedOverall / total) * 100) : 0,
    avgReplyHours: stats.avg_reply_hours !== null ? Number(stats.avg_reply_hours) : null,
  };
}

export async function replyToQuestion(questionId: string, replyContent: string, adminEmployeeId: string) {
  if (!replyContent.trim()) throw { status: 400, message: 'Vui lòng nhập nội dung phản hồi.' };

  const [[q]] = await pool.execute<any[]>(`SELECT question_id FROM question WHERE question_id = ?`, [questionId]);
  if (!q) throw { status: 404, message: 'Không tìm thấy câu hỏi.' };

  await pool.execute(
    `UPDATE question SET reply_content = ?, replied_at = NOW(), replied_by_admin_id = ? WHERE question_id = ?`,
    [replyContent.trim(), adminEmployeeId, questionId],
  );
}

export async function setQuestionVisibility(questionId: string, visibility: 'VISIBLE' | 'HIDDEN') {
  if (!['VISIBLE', 'HIDDEN'].includes(visibility)) {
    throw { status: 400, message: 'Trạng thái hiển thị không hợp lệ.' };
  }
  const [result] = await pool.execute<any>(
    `UPDATE question SET visibility_status = ? WHERE question_id = ?`,
    [visibility, questionId],
  );
  if (result.affectedRows === 0) throw { status: 404, message: 'Không tìm thấy câu hỏi.' };
}
