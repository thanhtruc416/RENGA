import pool from '../db';
import { shortenName } from './product.service';

export interface HomeReviewRow {
  review_id: string;
  rating: number;
  content: string;
  author: string;
}

/**
 * Lấy review nổi bật cho trang chủ (rating >= 4, còn hiển thị, có nội dung).
 * Join: review -> order_item -> order -> customer (lấy tên khách hàng thật).
 */
export async function getHomeReviews(limit = 8) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 8, 20));

  const [rows] = await pool.execute<any[]>(
    `SELECT
       r.review_id,
       r.rating,
       r.content,
       c.full_name AS author
     FROM review r
     JOIN order_item oi ON oi.order_item_id = r.order_item_id
     JOIN \`order\` o   ON o.order_id = oi.order_id
     JOIN customer c    ON c.client_id = o.client_id
     WHERE r.visibility_status = 'VISIBLE'
       AND r.rating >= 4
       AND r.content IS NOT NULL
       AND r.content <> ''
     ORDER BY RAND()
     LIMIT ${safeLimit}`
  );

  return (rows as HomeReviewRow[]).map(r => ({
    id: r.review_id,
    rating: r.rating,
    quote: `"${r.content}"`,
    author: r.author,
  }));
}

export interface ProductReviewRow {
  review_id: string;
  rating: number;
  content: string | null;
  media_urls: string | null;
  created_at: string;
  author: string;
}

/**
 * Lấy review thật của 1 sản phẩm cụ thể.
 * Join: review -> order_item -> product_variant -> product, order -> customer (tên khách hàng thật).
 */
export async function getProductReviews(productId: string, limit = 20) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 50));

  const [rows] = await pool.execute<any[]>(
    `SELECT
       r.review_id,
       r.rating,
       r.content,
       r.media_urls,
       r.created_at,
       c.full_name AS author
     FROM review r
     JOIN order_item oi      ON oi.order_item_id = r.order_item_id
     JOIN product_variant pv ON pv.variant_id = oi.variant_id
     JOIN \`order\` o        ON o.order_id = oi.order_id
     JOIN customer c         ON c.client_id = o.client_id
     WHERE pv.product_id = ?
       AND r.visibility_status = 'VISIBLE'
     ORDER BY r.created_at DESC
     LIMIT ${safeLimit}`,
    [productId]
  );

  return (rows as ProductReviewRow[]).map(r => ({
    id: r.review_id,
    rating: r.rating,
    quote: r.content ? `"${r.content}"` : '',
    author: r.author,
    photoUrl: r.media_urls,
    date: r.created_at,
  }));
}

/**
 * BR-37: chỉ khách đã mua và nhận hàng thành công (order_status = COMPLETED) mới đánh giá được.
 * Trả về mọi order_item thuộc các đơn COMPLETED của khách, kèm trạng thái đã đánh giá hay chưa.
 */
export async function getReviewableItems(clientId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT
       oi.order_item_id, oi.item_type, oi.unit_price, oi.quantity,
       o.order_id, o.order_type, o.updated_at,
       p.product_name,
       pri.image_url,
       r.review_id, r.rating, r.content
     FROM order_item oi
     JOIN \`order\` o ON o.order_id = oi.order_id
     LEFT JOIN product_variant pv  ON pv.variant_id = oi.variant_id
     LEFT JOIN product p           ON p.product_id = pv.product_id
     LEFT JOIN product_image pri   ON pri.product_id = p.product_id AND pri.is_primary = 1
     LEFT JOIN review r            ON r.order_item_id = oi.order_item_id
     WHERE o.client_id = ? AND o.order_status = 'COMPLETED'
     ORDER BY o.updated_at DESC`,
    [clientId]
  );

  return (rows as any[]).map(r => ({
    orderItemId: r.order_item_id,
    orderId: r.order_id,
    orderType: r.order_type,
    date: r.updated_at,
    productName: r.product_name
      ? shortenName(r.product_name)
      : (r.item_type === 'CUSTOMIZATION' ? 'Trang sức thiết kế theo yêu cầu' : 'Sản phẩm'),
    imageUrl: r.image_url,
    price: Number(r.unit_price) * Number(r.quantity),
    reviewed: !!r.review_id,
    rating: r.rating ?? null,
    content: r.content ?? null,
  }));
}

interface SubmitReviewInput {
  orderItemId: string;
  clientId: string;
  rating: number;
  content?: string;
}

export async function submitReview({ orderItemId, clientId, rating, content }: SubmitReviewInput) {
  const [[owned]] = await pool.execute<any[]>(
    `SELECT oi.order_item_id
     FROM order_item oi
     JOIN \`order\` o ON o.order_id = oi.order_id
     WHERE oi.order_item_id = ? AND o.client_id = ? AND o.order_status = 'COMPLETED'`,
    [orderItemId, clientId]
  );
  if (!owned) {
    throw { status: 403, message: 'Bạn chưa mua sản phẩm này hoặc đơn hàng chưa hoàn tất.' };
  }

  const [[existing]] = await pool.execute<any[]>(
    `SELECT review_id FROM review WHERE order_item_id = ?`,
    [orderItemId]
  );
  if (existing) {
    throw { status: 409, message: 'Bạn đã đánh giá sản phẩm này rồi.' };
  }

  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(review_id, 4) AS UNSIGNED)) AS max FROM review`
  );
  const reviewId = `RVW${String((max || 0) + 1).padStart(6, '0')}`;

  await pool.execute(
    `INSERT INTO review (review_id, order_item_id, rating, content, visibility_status, created_at)
     VALUES (?,?,?,?,'VISIBLE',NOW())`,
    [reviewId, orderItemId, rating, content || null]
  );

  return { reviewId };
}