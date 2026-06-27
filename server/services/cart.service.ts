import pool from '../db';
import { shortenName } from './product.service';

async function getOrCreateCart(clientId: string): Promise<string> {
  const [[existing]] = await pool.execute<any[]>(
    'SELECT cart_id FROM cart WHERE client_id = ?', [clientId]
  );
  if (existing) return existing.cart_id;

  const [[{ maxCart }]] = await pool.execute<any[]>(
    "SELECT MAX(CAST(SUBSTRING(cart_id,4) AS UNSIGNED)) as maxCart FROM cart"
  );
  const cartId = `CRT${String((maxCart || 0) + 1).padStart(6, '0')}`;
  await pool.execute(
    'INSERT INTO cart (cart_id, client_id, created_at, updated_at) VALUES (?,?,NOW(),NOW())',
    [cartId, clientId]
  );
  return cartId;
}

export async function getCart(clientId: string) {
  const cartId = await getOrCreateCart(clientId);

  const [rows] = await pool.execute<any[]>(
    `SELECT ci.cart_item_id, ci.item_type, ci.variant_id, ci.quantity, ci.unit_price,
            p.product_id, p.product_name, pv.size_value
     FROM cart_item ci
     LEFT JOIN product_variant pv ON pv.variant_id = ci.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     WHERE ci.cart_id = ?`,
    [cartId]
  );

  // Lấy ảnh cho tất cả product_id trong giỏ hàng
  const productIds = [...new Set((rows as any[]).filter(r => r.product_id).map((r: any) => r.product_id as string))];
  const imageMap: Record<string, string> = {};
  if (productIds.length > 0) {
    const placeholders = productIds.map(() => '?').join(',');
    const [images] = await pool.execute<any[]>(
      `SELECT product_id, image_url FROM product_image
       WHERE product_id IN (${placeholders})
       ORDER BY is_primary DESC, display_order ASC`,
      productIds
    );
    for (const img of images as any[]) {
      if (!imageMap[img.product_id]) imageMap[img.product_id] = img.image_url;
    }
  }

  const items = (rows as any[]).map(r => ({
    ...r,
    product_name: r.product_name ? shortenName(r.product_name) : r.product_name,
    image_url: r.product_id ? (imageMap[r.product_id] ?? null) : null,
  }));

  return { cart_id: cartId, items };
}

export async function addCartItem(clientId: string, item: {
  variant_id: string; quantity: number; unit_price: number;
}) {
  const cartId = await getOrCreateCart(clientId);

  // Nếu variant đã có trong giỏ thì tăng số lượng
  const [[existing]] = await pool.execute<any[]>(
    'SELECT cart_item_id, quantity FROM cart_item WHERE cart_id = ? AND variant_id = ?',
    [cartId, item.variant_id]
  );
  if (existing) {
    await pool.execute(
      'UPDATE cart_item SET quantity = quantity + ? WHERE cart_item_id = ?',
      [item.quantity, existing.cart_item_id]
    );
    return existing.cart_item_id;
  }

  const [[{ maxItem }]] = await pool.execute<any[]>(
    "SELECT MAX(CAST(SUBSTRING(cart_item_id,4) AS UNSIGNED)) as maxItem FROM cart_item"
  );
  const itemId = `CTI${String((maxItem || 0) + 1).padStart(6, '0')}`;
  await pool.execute(
    `INSERT INTO cart_item (cart_item_id, cart_id, item_type, variant_id, quantity, unit_price, added_at)
     VALUES (?,?,'PRODUCT',?,?,?,NOW())`,
    [itemId, cartId, item.variant_id, item.quantity, item.unit_price]
  );
  await pool.execute('UPDATE cart SET updated_at = NOW() WHERE cart_id = ?', [cartId]);
  return itemId;
}

export async function updateCartItem(cartItemId: string, clientId: string, quantity: number) {
  if (quantity <= 0) {
    await pool.execute(
      `DELETE ci FROM cart_item ci
       JOIN cart c ON c.cart_id = ci.cart_id
       WHERE ci.cart_item_id = ? AND c.client_id = ?`,
      [cartItemId, clientId]
    );
  } else {
    await pool.execute(
      `UPDATE cart_item ci
       JOIN cart c ON c.cart_id = ci.cart_id
       SET ci.quantity = ?
       WHERE ci.cart_item_id = ? AND c.client_id = ?`,
      [quantity, cartItemId, clientId]
    );
  }
}

export async function removeCartItem(cartItemId: string, clientId: string) {
  await pool.execute(
    `DELETE ci FROM cart_item ci
     JOIN cart c ON c.cart_id = ci.cart_id
     WHERE ci.cart_item_id = ? AND c.client_id = ?`,
    [cartItemId, clientId]
  );
}

export async function clearCart(clientId: string) {
  const [[cart]] = await pool.execute<any[]>(
    'SELECT cart_id FROM cart WHERE client_id = ?', [clientId]
  );
  if (cart) {
    await pool.execute('DELETE FROM cart_item WHERE cart_id = ?', [cart.cart_id]);
  }
}
