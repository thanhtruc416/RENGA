import pool from '../db';
import { shortenName } from './product.service';
import { computeStudioSubtotal, MATERIAL_DB_MAP, MATERIAL_FRONTEND_MAP, PriceInputs } from './studio.service';

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
            p.product_id, p.product_name, pv.size_value, pv.stock_quantity
     FROM cart_item ci
     LEFT JOIN product_variant pv ON pv.variant_id = ci.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     WHERE ci.cart_id = ? AND ci.item_type = 'PRODUCT'`,
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

  // CART-02: item Studio (CUSTOMIZATION) — trước đây chỉ lưu ở localStorage/bộ nhớ tạm
  // của trình duyệt nên mất khi F5. Giờ lưu thật trong customization (status='DRAFT').
  const [customRows] = await pool.execute<any[]>(
    `SELECT ci.cart_item_id, ci.item_type, ci.custom_id, ci.quantity, ci.unit_price,
            bf.blank_name, bf.image_url AS blank_image, bf.blank_type,
            mat.material_name, cst.engraving_text
     FROM cart_item ci
     JOIN customization cst ON cst.custom_id = ci.custom_id
     LEFT JOIN blank_form bf ON bf.blank_id = cst.blank_id
     LEFT JOIN material mat ON mat.material_id = cst.material_id
     WHERE ci.cart_id = ? AND ci.item_type = 'CUSTOMIZATION'`,
    [cartId]
  );

  return { cart_id: cartId, items, customItems: customRows };
}

export interface AddStudioCartItemInput extends PriceInputs {
  engraveText?: string;
}

export async function addStudioCartItem(clientId: string, input: AddStudioCartItemInput) {
  if (!input.blankId) throw { status: 400, message: 'Thiếu thông tin phôi sản phẩm.' };

  const cartId = await getOrCreateCart(clientId);
  const finalPrice = await computeStudioSubtotal(input);
  const dbMaterialId = MATERIAL_DB_MAP[input.materialId ?? ''] ?? 'MAT000002';

  const [[{ maxCst }]] = await pool.execute<any[]>(
    "SELECT MAX(CAST(SUBSTRING(custom_id,4) AS UNSIGNED)) as maxCst FROM customization"
  );
  const customId = `CST${String((maxCst || 0) + 1).padStart(6, '0')}`;
  await pool.execute(
    `INSERT INTO customization (custom_id, client_id, blank_id, material_id, engraving_text, calculated_price, status, created_at, updated_at)
     VALUES (?,?,?,?,?,?,'DRAFT',NOW(),NOW())`,
    [customId, clientId, input.blankId, dbMaterialId, input.engraveText ?? null, finalPrice]
  );

  const [[{ maxItem }]] = await pool.execute<any[]>(
    "SELECT MAX(CAST(SUBSTRING(cart_item_id,4) AS UNSIGNED)) as maxItem FROM cart_item"
  );
  const itemId = `CTI${String((maxItem || 0) + 1).padStart(6, '0')}`;
  await pool.execute(
    `INSERT INTO cart_item (cart_item_id, cart_id, item_type, custom_id, quantity, unit_price, added_at)
     VALUES (?,?,'CUSTOMIZATION',?,1,?,NOW())`,
    [itemId, cartId, customId, finalPrice]
  );
  await pool.execute('UPDATE cart SET updated_at = NOW() WHERE cart_id = ?', [cartId]);
  return itemId;
}

// CART-02: cho phép "Tiếp tục thiết kế" từ giỏ hàng nạp lại đúng lựa chọn cũ
// (blank/chất liệu/khắc chữ) thay vì đưa khách vào Studio trống trơn từ đầu.
export async function getStudioCartItemDetail(customId: string, clientId: string) {
  const [[row]] = await pool.execute<any[]>(
    `SELECT custom_id, blank_id, material_id, engraving_text
     FROM customization
     WHERE custom_id = ? AND client_id = ? AND status = 'DRAFT'`,
    [customId, clientId]
  );
  if (!row) throw { status: 404, message: 'Không tìm thấy thiết kế để tiếp tục chỉnh sửa.' };
  return {
    blankId: row.blank_id,
    materialId: MATERIAL_FRONTEND_MAP[row.material_id] ?? 'vang-18k',
    engraveText: row.engraving_text ?? '',
  };
}

export async function addCartItem(clientId: string, item: {
  variant_id: string; quantity: number; unit_price: number;
}) {
  const cartId = await getOrCreateCart(clientId);

  // CART-04: chặn thêm/tăng số lượng vượt quá tồn kho thật của variant.
  const [[variant]] = await pool.execute<any[]>(
    'SELECT stock_quantity, status FROM product_variant WHERE variant_id = ?',
    [item.variant_id]
  );
  if (!variant) throw { status: 404, message: 'Không tìm thấy phiên bản sản phẩm.' };
  if (variant.status !== 'AVAILABLE') {
    throw { status: 409, message: 'Sản phẩm hiện đã hết hàng.' };
  }

  // Nếu variant đã có trong giỏ thì tăng số lượng
  const [[existing]] = await pool.execute<any[]>(
    'SELECT cart_item_id, quantity FROM cart_item WHERE cart_id = ? AND variant_id = ?',
    [cartId, item.variant_id]
  );
  const requestedTotal = (existing?.quantity ?? 0) + item.quantity;
  if (requestedTotal > variant.stock_quantity) {
    throw {
      status: 409,
      message: `Vượt số lượng còn hàng — chỉ còn ${variant.stock_quantity} sản phẩm.`,
      maxQuantity: variant.stock_quantity,
    };
  }

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
    return;
  }

  // CART-04: chặn tăng số lượng vượt tồn kho (chỉ áp dụng cho item PRODUCT, có variant thật).
  const [[row]] = await pool.execute<any[]>(
    `SELECT ci.item_type, pv.stock_quantity
     FROM cart_item ci
     JOIN cart c ON c.cart_id = ci.cart_id
     LEFT JOIN product_variant pv ON pv.variant_id = ci.variant_id
     WHERE ci.cart_item_id = ? AND c.client_id = ?`,
    [cartItemId, clientId]
  );
  if (!row) throw { status: 404, message: 'Không tìm thấy sản phẩm trong giỏ hàng.' };
  if (row.item_type === 'PRODUCT' && quantity > row.stock_quantity) {
    throw {
      status: 409,
      message: `Vượt số lượng còn hàng — chỉ còn ${row.stock_quantity} sản phẩm.`,
      maxQuantity: row.stock_quantity,
    };
  }

  await pool.execute(
    `UPDATE cart_item ci
     JOIN cart c ON c.cart_id = ci.cart_id
     SET ci.quantity = ?
     WHERE ci.cart_item_id = ? AND c.client_id = ?`,
    [quantity, cartItemId, clientId]
  );
}

export async function removeCartItem(cartItemId: string, clientId: string) {
  await pool.execute(
    `DELETE ci FROM cart_item ci
     JOIN cart c ON c.cart_id = ci.cart_id
     WHERE ci.cart_item_id = ? AND c.client_id = ?`,
    [cartItemId, clientId]
  );
}

// CART-05: xoá nhiều item cùng lúc (chọn nhiều rồi xoá) — trước đây frontend gọi
// nhầm hàm chỉ dùng cho dọn giỏ sau checkout, không xoá đúng các item được chọn.
export async function removeCartItems(cartItemIds: string[], clientId: string) {
  if (!cartItemIds.length) return;
  const placeholders = cartItemIds.map(() => '?').join(',');
  await pool.execute(
    `DELETE ci FROM cart_item ci
     JOIN cart c ON c.cart_id = ci.cart_id
     WHERE ci.cart_item_id IN (${placeholders}) AND c.client_id = ?`,
    [...cartItemIds, clientId]
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
