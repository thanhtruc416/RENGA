import pool from '../db';
import { reconcileTier } from '../services/loyalty.service';

// BR-43: quét đối chiếu hạng cho toàn bộ khách hàng. Trong luồng bình thường,
// reconcileTier() đã được gọi ngay sau mỗi lần cộng/trừ điểm (loyalty.service.ts)
// nên hạng luôn đúng theo thời gian thực — job này chỉ cần dùng để backfill/vá lại
// dữ liệu cũ (VD sau khi sửa point_multiplier) hoặc chạy định kỳ như một lưới an toàn.
export async function reconcileAllTiers(): Promise<{ checked: number; changed: number }> {
  const [clients] = await pool.execute<any[]>('SELECT client_id, tier_id FROM customer');
  let changed = 0;

  for (const { client_id, tier_id } of clients as any[]) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await reconcileTier(conn, client_id);
      const [[after]] = await conn.execute<any[]>(
        'SELECT tier_id FROM customer WHERE client_id = ?', [client_id]
      );
      if (after && after.tier_id !== tier_id) changed++;
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      console.error(`[loyalty-tier] Lỗi đối chiếu hạng cho ${client_id}:`, err);
    } finally {
      conn.release();
    }
  }

  return { checked: (clients as any[]).length, changed };
}
