import type { PoolConnection } from 'mysql2/promise';

// BR-40/41: 1 điểm mỗi 10.000đ chi tiêu, nhân theo point_multiplier của hạng thành viên.
const POINTS_PER_VND = 1 / 10_000;

async function nextId(conn: PoolConnection, prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await conn.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export interface TierChangeResult {
  upgraded: boolean;
  newTierName?: string;
}

// BR-43: đối chiếu lại hạng thành viên theo loyalty_points hiện tại — gọi ngay sau mỗi
// lần cộng/trừ điểm thay vì chạy 1 job quét định kỳ, để hạng luôn đúng ngay lập tức.
// LOY-03/04/05/06: trả về có phải LÊN hạng không (so sánh min_points cũ/mới) để caller
// gửi mail báo lên hạng sau khi transaction commit — LOY-07: hoàn điểm chỉ có thể làm
// hạ hạng nên upgraded luôn false, không bao giờ tự gửi nhầm mail lên hạng ở đó.
export async function reconcileTier(conn: PoolConnection, clientId: string): Promise<TierChangeResult> {
  const [[cust]] = await conn.execute<any[]>(
    'SELECT loyalty_points, tier_id FROM customer WHERE client_id = ?', [clientId]
  );
  if (!cust) return { upgraded: false };

  const [[oldTier]] = await conn.execute<any[]>(
    'SELECT min_points FROM member_tier WHERE tier_id = ?', [cust.tier_id]
  );

  const [[correctTier]] = await conn.execute<any[]>(
    `SELECT tier_id, tier_name, min_points FROM member_tier
     WHERE ? >= min_points AND (max_points IS NULL OR ? <= max_points)
     ORDER BY min_points DESC LIMIT 1`,
    [cust.loyalty_points, cust.loyalty_points]
  );
  if (!correctTier || correctTier.tier_id === cust.tier_id) return { upgraded: false };

  await conn.execute(
    'UPDATE customer SET tier_id = ?, tier_start_date = NOW() WHERE client_id = ?',
    [correctTier.tier_id, clientId]
  );

  const upgraded = !oldTier || Number(correctTier.min_points) > Number(oldTier.min_points);
  return { upgraded, newTierName: upgraded ? correctTier.tier_name : undefined };
}

// Cộng điểm khi đặt hàng thành công — gọi trong cùng transaction với việc tạo order.
export async function awardPurchasePoints(
  conn: PoolConnection,
  clientId: string,
  orderId: string,
  orderTotal: number,
): Promise<TierChangeResult> {
  const [[cust]] = await conn.execute<any[]>(
    `SELECT cu.loyalty_points, t.point_multiplier
     FROM customer cu LEFT JOIN member_tier t ON t.tier_id = cu.tier_id
     WHERE cu.client_id = ?`,
    [clientId]
  );
  if (!cust) return { upgraded: false };

  const multiplier = Number(cust.point_multiplier) || 1;
  const points = Math.round(orderTotal * POINTS_PER_VND * multiplier);
  if (points <= 0) return { upgraded: false };

  const newBalance = Number(cust.loyalty_points) + points;
  const txId = await nextId(conn, 'LTX', 'loyalty_transaction', 'transaction_id');
  await conn.execute(
    `INSERT INTO loyalty_transaction
       (transaction_id, client_id, transaction_type, points_changed, points_balance, source_id, source_type, note, created_at)
     VALUES (?,?,'PURCHASE',?,?,?,'ORDER',?,NOW())`,
    [txId, clientId, points, newBalance, orderId, `Tích điểm đơn hàng ${orderId}`]
  );
  await conn.execute('UPDATE customer SET loyalty_points = ? WHERE client_id = ?', [newBalance, clientId]);
  return reconcileTier(conn, clientId);
}

// BR-40/41: cộng 50 điểm khi khách viết đánh giá — gọi trong cùng transaction với submitReview.
// review.points_awarded đánh dấu đã cộng, tránh cộng trùng nếu hàm này lỡ được gọi lại.
const REVIEW_POINTS = 50;

export async function awardReviewPoints(
  conn: PoolConnection,
  clientId: string,
  reviewId: string,
): Promise<TierChangeResult> {
  const [[cust]] = await conn.execute<any[]>(
    'SELECT loyalty_points FROM customer WHERE client_id = ?', [clientId]
  );
  if (!cust) return { upgraded: false };

  const newBalance = Number(cust.loyalty_points) + REVIEW_POINTS;
  const txId = await nextId(conn, 'LTX', 'loyalty_transaction', 'transaction_id');
  await conn.execute(
    `INSERT INTO loyalty_transaction
       (transaction_id, client_id, transaction_type, points_changed, points_balance, source_id, source_type, note, created_at)
     VALUES (?,?,'REVIEW',?,?,?,'REVIEW',?,NOW())`,
    [txId, clientId, REVIEW_POINTS, newBalance, reviewId, `Tích điểm đánh giá sản phẩm ${reviewId}`]
  );
  await conn.execute('UPDATE customer SET loyalty_points = ? WHERE client_id = ?', [newBalance, clientId]);
  await conn.execute('UPDATE review SET points_awarded = 1 WHERE review_id = ?', [reviewId]);
  return reconcileTier(conn, clientId);
}

// BR-42: hoàn lại đúng số điểm đã cộng cho 1 đơn khi đơn đó bị hủy (auto-cancel hoặc khách tự hủy).
export async function revokePurchasePoints(conn: PoolConnection, orderId: string): Promise<void> {
  const [[tx]] = await conn.execute<any[]>(
    `SELECT client_id, points_changed FROM loyalty_transaction
     WHERE source_id = ? AND source_type = 'ORDER' AND transaction_type = 'PURCHASE'
     ORDER BY created_at DESC LIMIT 1`,
    [orderId]
  );
  if (!tx || tx.points_changed <= 0) return;

  const [[cust]] = await conn.execute<any[]>(
    'SELECT loyalty_points FROM customer WHERE client_id = ?', [tx.client_id]
  );
  if (!cust) return;

  // Không trừ quá số điểm khách hiện có (có thể đã tiêu bớt qua đổi thưởng).
  const deduction = Math.min(tx.points_changed, Number(cust.loyalty_points));
  if (deduction <= 0) return;
  const newBalance = Number(cust.loyalty_points) - deduction;

  const txId = await nextId(conn, 'LTX', 'loyalty_transaction', 'transaction_id');
  await conn.execute(
    `INSERT INTO loyalty_transaction
       (transaction_id, client_id, transaction_type, points_changed, points_balance, source_id, source_type, note, created_at)
     VALUES (?,?,'DEDUCT_REFUND',?,?,?,'ORDER',?,NOW())`,
    [txId, tx.client_id, -deduction, newBalance, orderId, `Hoàn điểm do hủy đơn ${orderId}`]
  );
  await conn.execute('UPDATE customer SET loyalty_points = ? WHERE client_id = ?', [newBalance, tx.client_id]);
  await reconcileTier(conn, tx.client_id);
}
