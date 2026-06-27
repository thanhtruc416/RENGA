import pool from '../db';

const BRAND_WORDS = /\b(PNJ|By|Disney|Doji|Pandora)\b/gi;

export function shortenName(name: string): string {
  // cắt tại PNJ (kể cả Disney|PNJ)
  let s = name.replace(/[\s|]+PNJ.*/i, '');
  // xóa các brand/từ thừa còn lại
  s = s.replace(BRAND_WORDS, '');
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

export async function getProducts(category?: string, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const params: any[] = [];
  let where = "WHERE p.status = 'ACTIVE'";
  if (category) {
    where += ' AND c.slug = ?';
    params.push(category);
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
     FROM PRODUCT p
     JOIN CATEGORY c ON c.category_id = p.category_id
     JOIN PRODUCT_IMAGE pri ON pri.product_id = p.product_id AND pri.is_primary = 1
     LEFT JOIN PRODUCT_IMAGE try ON try.product_id = p.product_id AND try.image_type = 'TRYON'
     ${where}
     ORDER BY p.product_id
     LIMIT ${limit} OFFSET ${offset}`,
    params
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total FROM PRODUCT p
     JOIN CATEGORY c ON c.category_id = p.category_id
     JOIN PRODUCT_IMAGE pri ON pri.product_id = p.product_id AND pri.is_primary = 1
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
     FROM PRODUCT p
     JOIN CATEGORY c ON c.category_id = p.category_id
     WHERE p.product_id = ?`,
    [id]
  );
  if (!product) return null;

  const [images] = await pool.execute<any[]>(
    `SELECT image_url, is_primary, image_type
     FROM PRODUCT_IMAGE
     WHERE product_id = ?
     ORDER BY display_order`,
    [id]
  );

  const [variants] = await pool.execute<any[]>(
    `SELECT variant_id, variant_name, size_value, price, stock_quantity, status
     FROM PRODUCT_VARIANT
     WHERE product_id = ?
     ORDER BY CAST(size_value AS UNSIGNED)`,
    [id]
  );

  return { ...product, product_name: shortenName(product.product_name), images, variants };
}
