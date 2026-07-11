import pool from '../db';

const BRAND_WORDS = /\b(PNJ|By|Disney|Doji|Pandora)\b/gi;

export function shortenName(name: string): string {
  // cắt tại PNJ (kể cả Disney|PNJ)
  let s = name.replace(/[\s|]+PNJ.*/i, '');
  // xóa các brand/từ thừa còn lại
  s = s.replace(BRAND_WORDS, '');
  // xóa mã sản phẩm/style code còn sót ở cuối tên (VD: XMXMW005194, PFXMW000012)
  s = s.replace(/\s+[A-Z]{2,}[0-9]{4,}\s*$/, '');
  return s.replace(/\s+/g, ' ').trim();
}

export interface ProductRow {
  product_id: string;
  product_name: string;
  base_price: number;
  status: string;
  category: string;
  category_name: string;
  image_url: string | null;
  tryon_url: string | null;
}

export interface ProductDetailRow extends ProductRow {
  description: string;
}

export async function getProducts(category?: string, page = 1, limit = 12, q?: string) {
  const offset = (page - 1) * limit;

  const params: any[] = [];
  // Sản phẩm còn ACTIVE nhưng tất cả variant đều hết hàng (stock_quantity=0) thì ẩn
  // khỏi danh sách "sản phẩm có sẵn" — khách không nên thấy thứ không mua được.
  let where = `WHERE p.status = 'ACTIVE'
    AND EXISTS (SELECT 1 FROM product_variant pv WHERE pv.product_id = p.product_id AND pv.stock_quantity > 0)`;
  if (category) {
    where += ' AND c.slug = ?';
    params.push(category);
  }
  if (q) {
    where += ' AND p.product_name LIKE ?';
    params.push(`%${q}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `SELECT
       p.product_id,
       p.product_name,
       p.base_price,
       p.status,
       c.slug        AS category,
       c.category_name,
       pri.image_url AS image_url,
       try.image_url AS tryon_url
     FROM product p
     JOIN category c ON c.category_id = p.category_id
     JOIN product_image pri ON pri.product_id = p.product_id AND pri.is_primary = 1
     LEFT JOIN product_image try ON try.product_id = p.product_id AND try.image_type = 'TRYON'
     ${where}
     ORDER BY p.product_id
     LIMIT ${limit} OFFSET ${offset}`,
    params
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total FROM product p
     JOIN category c ON c.category_id = p.category_id
     JOIN product_image pri ON pri.product_id = p.product_id AND pri.is_primary = 1
     ${where}`,
    params
  );

  const products = (rows as any[]).map(r => ({
    ...r,
    product_name: shortenName(r.product_name),
  }));

  return { products, total, page, limit };
}

export async function getProductById(id: string) {
  const [[product]] = await pool.execute<any[]>(
    `SELECT
       p.product_id,
       p.product_name,
       p.description,
       p.base_price,
       p.status,
       c.slug        AS category,
       c.category_name
     FROM product p
     JOIN category c ON c.category_id = p.category_id
     WHERE p.product_id = ?`,
    [id]
  );
  if (!product) return null;

  const [images] = await pool.execute<any[]>(
    `SELECT image_url, is_primary, image_type
     FROM product_image
     WHERE product_id = ?
     ORDER BY display_order`,
    [id]
  );

  const [variants] = await pool.execute<any[]>(
    `SELECT variant_id, variant_name, size_value, price, stock_quantity, status
     FROM product_variant
     WHERE product_id = ?
     ORDER BY CAST(size_value AS UNSIGNED)`,
    [id]
  );

  return { ...product, product_name: shortenName(product.product_name), images, variants };
}

// BR-38: khách đã đăng nhập gửi câu hỏi công khai dưới sản phẩm.
async function nextQuestionId(): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(question_id, 4) AS UNSIGNED)) AS max FROM question`
  );
  return `QST${String((max || 0) + 1).padStart(6, '0')}`;
}

export async function getProductQuestions(productId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT q.question_id, q.question_content, q.reply_content, q.created_at, q.replied_at,
            cu.full_name AS author
     FROM question q
     JOIN customer cu ON cu.client_id = q.client_id
     WHERE q.product_id = ? AND q.visibility_status = 'VISIBLE'
     ORDER BY q.created_at DESC`,
    [productId]
  );
  return (rows as any[]).map(r => ({
    id: r.question_id,
    question: r.question_content,
    answer: r.reply_content,
    author: r.author,
    askedAt: r.created_at,
    repliedAt: r.replied_at,
  }));
}

export async function submitQuestion(productId: string, clientId: string, content: string) {
  if (!content?.trim()) {
    throw { status: 400, message: 'Vui lòng nhập nội dung câu hỏi.' };
  }

  const [[product]] = await pool.execute<any[]>(
    `SELECT product_id FROM product WHERE product_id = ?`, [productId]
  );
  if (!product) throw { status: 404, message: 'Không tìm thấy sản phẩm.' };

  const questionId = await nextQuestionId();
  await pool.execute(
    `INSERT INTO question (question_id, product_id, client_id, question_content, visibility_status, created_at)
     VALUES (?,?,?,?,'VISIBLE',NOW())`,
    [questionId, productId, clientId, content.trim()]
  );
  return { questionId };
}
