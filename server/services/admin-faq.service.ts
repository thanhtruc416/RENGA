import pool from '../db';

const TOPICS = ['PRODUCT', 'ORDER', 'PAYMENT', 'WARRANTY', 'CUSTOMIZATION', 'MEMBERSHIP', 'APPOINTMENT', 'OTHER'] as const;
export type FaqTopic = typeof TOPICS[number];

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export async function getAdminFaqs(page = 1, limit = 20, topic?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (topic) { where += ' AND topic = ?'; params.push(topic); }
  if (search) { where += ' AND (question LIKE ? OR answer LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

  const [rows] = await pool.execute<any[]>(
    `SELECT faq_id, topic, question, answer, is_active, created_at, updated_at
     FROM faq ${where} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    params,
  );
  const [[{ total }]] = await pool.execute<any[]>(`SELECT COUNT(*) AS total FROM faq ${where}`, params);
  return { faqs: rows, total, page, limit };
}

export async function createFaq(input: { topic: string; question: string; answer: string }, adminId: string) {
  if (!TOPICS.includes(input.topic as FaqTopic)) throw { status: 400, message: 'Chủ đề không hợp lệ.' };
  if (!input.question?.trim() || !input.answer?.trim()) {
    throw { status: 400, message: 'Vui lòng nhập đầy đủ câu hỏi và câu trả lời.' };
  }

  const faqId = await nextId('FAQ', 'faq', 'faq_id');
  await pool.execute(
    `INSERT INTO faq (faq_id, topic, question, answer, is_active, created_by_admin_id, created_at)
     VALUES (?,?,?,?,1,?,NOW())`,
    [faqId, input.topic, input.question.trim(), input.answer.trim(), adminId],
  );
  return faqId;
}

export async function updateFaq(
  faqId: string, input: Partial<{ topic: string; question: string; answer: string; isActive: boolean }>, adminId: string,
) {
  const [[existing]] = await pool.execute<any[]>(`SELECT faq_id FROM faq WHERE faq_id = ?`, [faqId]);
  if (!existing) throw { status: 404, message: 'Không tìm thấy FAQ.' };

  if (input.topic !== undefined && !TOPICS.includes(input.topic as FaqTopic)) {
    throw { status: 400, message: 'Chủ đề không hợp lệ.' };
  }

  const sets: string[] = ['updated_by_admin_id = ?', 'updated_at = NOW()'];
  const params: any[] = [adminId];
  if (input.topic !== undefined)    { sets.push('topic = ?');    params.push(input.topic); }
  if (input.question !== undefined) { sets.push('question = ?'); params.push(input.question.trim()); }
  if (input.answer !== undefined)   { sets.push('answer = ?');   params.push(input.answer.trim()); }
  if (input.isActive !== undefined) { sets.push('is_active = ?'); params.push(input.isActive ? 1 : 0); }

  params.push(faqId);
  await pool.execute(`UPDATE faq SET ${sets.join(', ')} WHERE faq_id = ?`, params);
}
