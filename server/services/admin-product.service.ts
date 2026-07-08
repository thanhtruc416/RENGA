import pool from '../db';
import { shortenName } from './product.service';

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export async function getCategories() {
  const [rows] = await pool.execute<any[]>(
    `SELECT category_id, category_name, slug FROM category WHERE is_active = 1 ORDER BY display_order`,
  );
  return rows;
}

export async function getAdminProducts(page = 1, limit = 20, search?: string, status?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (search) {
    where += ' AND p.product_name LIKE ?';
    params.push(`%${search}%`);
  }
  if (status) {
    where += ' AND p.status = ?';
    params.push(status);
  }

  const [rows] = await pool.execute<any[]>(
    `SELECT p.product_id, p.product_name, p.base_price, p.status, p.created_at,
            c.category_name,
            pri.image_url,
            COALESCE(SUM(pv.stock_quantity), 0) AS stock
     FROM product p
     JOIN category c ON c.category_id = p.category_id
     LEFT JOIN product_image pri ON pri.product_id = p.product_id AND pri.is_primary = 1
     LEFT JOIN product_variant pv ON pv.product_id = p.product_id
     ${where}
     GROUP BY p.product_id, p.product_name, p.base_price, p.status, p.created_at, c.category_name, pri.image_url
     ORDER BY p.created_at DESC
     LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total FROM product p JOIN category c ON c.category_id = p.category_id ${where}`,
    params,
  );

  const products = (rows as any[]).map(p => ({ ...p, product_name: shortenName(p.product_name) }));
  return { products, total, page, limit };
}

export async function getAdminProductById(id: string) {
  const [[product]] = await pool.execute<any[]>(
    `SELECT p.*, c.category_name
     FROM product p
     JOIN category c ON c.category_id = p.category_id
     WHERE p.product_id = ?`,
    [id],
  );
  if (!product) return null;

  const [variants] = await pool.execute<any[]>(
    `SELECT variant_id, variant_name, size_value, price, stock_quantity, status
     FROM product_variant WHERE product_id = ?`,
    [id],
  );
  const [images] = await pool.execute<any[]>(
    `SELECT image_id, image_url, is_primary, image_type, display_order
     FROM product_image WHERE product_id = ? ORDER BY display_order`,
    [id],
  );

  return { ...product, variants, images };
}

interface ProductInput {
  category_id:   string;
  product_name:  string;
  description?:  string;
  base_price:    number;
  status?:       'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  image_url?:    string;
  variant?:      { variant_name: string; size_value?: string; price: number; stock_quantity: number };
}

export async function createAdminProduct(input: ProductInput, createdByAdminId: string) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const productId = await nextId('PRD', 'product', 'product_id');
    await conn.execute(
      `INSERT INTO product (product_id, category_id, product_name, description, base_price, status, created_by_admin_id, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,NOW(),NOW())`,
      [productId, input.category_id, input.product_name, input.description ?? null, input.base_price,
       input.status ?? 'ACTIVE', createdByAdminId],
    );

    if (input.variant) {
      const variantId = await nextId('VAR', 'product_variant', 'variant_id');
      await conn.execute(
        `INSERT INTO product_variant (variant_id, product_id, variant_name, size_value, price, stock_quantity, status)
         VALUES (?,?,?,?,?,?,'AVAILABLE')`,
        [variantId, productId, input.variant.variant_name, input.variant.size_value ?? null,
         input.variant.price, input.variant.stock_quantity],
      );
    }

    if (input.image_url) {
      const imageId = await nextId('IMG', 'product_image', 'image_id');
      await conn.execute(
        `INSERT INTO product_image (image_id, product_id, image_url, is_primary, image_type, display_order)
         VALUES (?,?,?,1,'GALLERY',1)`,
        [imageId, productId, input.image_url],
      );
    }

    await conn.commit();
    return { productId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function updateAdminProduct(id: string, input: Partial<ProductInput>) {
  const fields: string[] = [];
  const params: any[] = [];

  if (input.category_id  !== undefined) { fields.push('category_id = ?');  params.push(input.category_id); }
  if (input.product_name !== undefined) { fields.push('product_name = ?'); params.push(input.product_name); }
  if (input.description  !== undefined) { fields.push('description = ?');  params.push(input.description); }
  if (input.base_price   !== undefined) { fields.push('base_price = ?');   params.push(input.base_price); }
  if (input.status       !== undefined) { fields.push('status = ?');       params.push(input.status); }

  if (!fields.length) return;

  fields.push('updated_at = NOW()');
  params.push(id);

  const [result] = await pool.execute<any>(
    `UPDATE product SET ${fields.join(', ')} WHERE product_id = ?`,
    params,
  );
  if (result.affectedRows === 0) {
    throw { status: 404, message: 'Không tìm thấy sản phẩm.' };
  }
}

// Soft delete — chỉ đổi status, không xóa cứng vì order_item/product_variant có FK tới product
export async function softDeleteAdminProduct(id: string) {
  const [result] = await pool.execute<any>(
    `UPDATE product SET status = 'INACTIVE', updated_at = NOW() WHERE product_id = ?`,
    [id],
  );
  if (result.affectedRows === 0) {
    throw { status: 404, message: 'Không tìm thấy sản phẩm.' };
  }
}
