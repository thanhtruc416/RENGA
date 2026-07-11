import { Router } from 'express';
import bcrypt from 'bcrypt';
import { authenticate } from '../middlewares/auth.middleware';
import pool from '../db';

const router = Router();

// ── helpers ──────────────────────────────────────────────────────────────────

function toDisplayDate(d: Date | string | null): string {
  if (!d) return '';
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return '';
  return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`;
}

function toISODate(ddmmyyyy: string): string | null {
  if (!ddmmyyyy) return null;
  const p = ddmmyyyy.split('/');
  if (p.length !== 3) return null;
  return `${p[2]}-${p[1]}-${p[0]}`;
}

// ── GET /api/account/profile ──────────────────────────────────────────────────
router.get('/profile', authenticate, async (req, res) => {
  const clientId = (req.user as any)?.clientId;
  try {
    const [[row]] = await pool.execute<any[]>(
      `SELECT c.client_id, c.email, c.phone,
              cu.full_name, cu.birth_date, cu.gender,
              cu.tier_id, cu.loyalty_points,
              a.address_line, a.ward, a.province
       FROM client c
       JOIN customer cu ON cu.client_id = c.client_id
       LEFT JOIN address a ON a.client_id = c.client_id AND a.is_default = 1
       WHERE c.client_id = ?`,
      [clientId]
    );
    if (!row) {
      res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });
      return;
    }
    const addressParts = [row.address_line, row.ward, row.province].filter(Boolean);
    res.json({
      success: true,
      data: {
        id:            row.client_id,
        fullName:      row.full_name  ?? '',
        email:         row.email      ?? '',
        phone:         row.phone      ?? '',
        birthDate:     toDisplayDate(row.birth_date),
        gender:        row.gender     ?? '',
        address:       addressParts.join(', '),
        role:          'customer',
        tierId:        row.tier_id,
        loyaltyPoints: Number(row.loyalty_points) || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/account/profile ────────────────────────────────────────────────
router.patch('/profile', authenticate, async (req, res) => {
  const clientId = req.user!.clientId!;
  const { fullName, email, phone, birthDate, gender } = req.body as {
    fullName?: string; email?: string; phone?: string; birthDate?: string; gender?: string;
  };
  try {
    const clientSets: string[] = [];
    const clientVals: any[]    = [];
    if (email !== undefined) { clientSets.push('email = ?');   clientVals.push(email || null); }
    if (phone !== undefined) { clientSets.push('phone = ?');   clientVals.push(phone || null); }
    if (clientSets.length) {
      clientSets.push('updated_at = NOW()');
      await pool.execute(
        `UPDATE client SET ${clientSets.join(', ')} WHERE client_id = ?`,
        [...clientVals, clientId]
      );
    }

    const cuSets: string[] = [];
    const cuVals: any[]    = [];
    if (fullName  !== undefined) { cuSets.push('full_name = ?');  cuVals.push(fullName  || null); }
    if (birthDate !== undefined) { cuSets.push('birth_date = ?'); cuVals.push(toISODate(birthDate)); }
    if (gender    !== undefined) { cuSets.push('gender = ?');     cuVals.push(gender || null); }
    if (cuSets.length) {
      await pool.execute(
        `UPDATE customer SET ${cuSets.join(', ')} WHERE client_id = ?`,
        [...cuVals, clientId]
      );
    }

    res.json({ success: true, data: null });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      const field = String(err.message).includes('uq_client_email') ? 'Email'
        : String(err.message).includes('uq_client_phone') ? 'Số điện thoại'
        : 'Thông tin';
      res.status(409).json({ success: false, message: `${field} này đã được sử dụng bởi tài khoản khác.` });
      return;
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/account/password ───────────────────────────────────────────────
router.patch('/password', authenticate, async (req, res) => {
  const clientId = req.user!.clientId!;
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string; newPassword: string;
  };
  if (!currentPassword || !newPassword) {
    res.status(400).json({ success: false, message: 'Thiếu mật khẩu' });
    return;
  }
  try {
    const [[row]] = await pool.execute<any[]>(
      `SELECT password_hash FROM account WHERE client_id = ? AND provider = 'LOCAL'`,
      [clientId]
    );
    if (!row) {
      res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản' });
      return;
    }
    const match = await bcrypt.compare(currentPassword, row.password_hash);
    if (!match) {
      res.status(401).json({ success: false, message: 'Mật khẩu hiện tại không đúng' });
      return;
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.execute(
      `UPDATE account SET password_hash = ? WHERE client_id = ? AND provider = 'LOCAL'`,
      [hash, clientId]
    );
    res.json({ success: true, data: null });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/account/loyalty ──────────────────────────────────────────────────
router.get('/loyalty', authenticate, async (req, res) => {
  const clientId = req.user!.clientId!;
  try {
    const [[cu]] = await pool.execute<any[]>(
      `SELECT cu.loyalty_points, cu.tier_id,
              t.tier_name, t.max_points AS next_tier_points
       FROM customer cu
       LEFT JOIN member_tier t ON t.tier_id = cu.tier_id
       WHERE cu.client_id = ?`,
      [clientId]
    );

    let history: any[] = [];
    try {
      const [rows] = await pool.execute<any[]>(
        `SELECT transaction_id, transaction_type, points_changed, note, created_at
         FROM loyalty_transaction
         WHERE client_id = ?
         ORDER BY created_at DESC
         LIMIT 10`,
        [clientId]
      );
      history = (rows as any[]).map(h => ({
        id:          h.transaction_id,
        type:        Number(h.points_changed) >= 0 ? 'earn' : 'redeem',
        // Trước đây lấy Math.abs() nên mất dấu âm — lịch sử hoàn điểm (huỷ đơn)
        // luôn hiện "+" dù thực chất là trừ điểm. Giữ nguyên dấu để FE hiển thị đúng.
        points:      Number(h.points_changed),
        description: h.note ?? '',
        createdAt:   h.created_at,
      }));
    } catch { /* loyalty_transaction table may not exist yet */ }

    const points = Number(cu?.loyalty_points) || 0;

    res.json({
      success: true,
      data: {
        total:          points,
        available:      points,
        used:           history.filter(h => h.type === 'redeem').length,
        tierName:       cu?.tier_name ?? cu?.tier_id ?? 'Silver',
        nextTierPoints: Number(cu?.next_tier_points) || 5000,
        history,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/account/loyalty/redeem ─────────────────────────────────────────
router.post('/loyalty/redeem', authenticate, async (req, res) => {
  const clientId = req.user!.clientId!;
  const { rewardTitle, pointCost } = req.body as { rewardTitle: string; pointCost: number };

  if (!rewardTitle || !pointCost || pointCost <= 0) {
    res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
    return;
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Deduct points atomically — only succeeds if user has enough
    const [result] = await conn.execute<any>(
      `UPDATE customer SET loyalty_points = loyalty_points - ?
       WHERE client_id = ? AND loyalty_points >= ?`,
      [pointCost, clientId, pointCost]
    );

    if (result.affectedRows === 0) {
      await conn.rollback();
      res.status(400).json({ success: false, message: 'Điểm tích lũy không đủ để đổi thưởng này' });
      return;
    }

    const [[cu]] = await conn.execute<any[]>(
      'SELECT loyalty_points FROM customer WHERE client_id = ?',
      [clientId]
    );

    // Try to log transaction (table may not exist yet)
    try {
      const [[{ maxTxn }]] = await conn.execute<any[]>(
        "SELECT MAX(CAST(SUBSTRING(transaction_id, 4) AS UNSIGNED)) AS maxTxn FROM loyalty_transaction"
      );
      const txnId = `LTX${String((maxTxn || 0) + 1).padStart(6, '0')}`;
      await conn.execute(
        `INSERT INTO loyalty_transaction
           (transaction_id, client_id, transaction_type, points, description, created_at)
         VALUES (?, ?, 'REDEEM', ?, ?, NOW())`,
        [txnId, clientId, -pointCost, `Đổi thưởng: ${rewardTitle}`]
      );
    } catch { /* loyalty_transaction table may not exist yet */ }

    await conn.commit();
    res.json({ success: true, data: { remainingPoints: Number(cu?.loyalty_points) || 0 } });
  } catch (err: any) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally {
    conn.release();
  }
});

export default router;