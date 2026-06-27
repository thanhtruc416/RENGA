import { Router } from 'express';
import bcrypt from 'bcrypt';
import { requireAuth } from '../middleware/auth';
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
router.get('/profile', requireAuth, async (req, res) => {
  const clientId = req.user!.client_id;
  try {
    const [[row]] = await pool.execute<any[]>(
      `SELECT c.client_id, c.email, c.phone,
              cu.full_name, cu.birth_date, cu.address,
              cu.tier_id, cu.loyalty_points
       FROM client c
       JOIN customer cu ON cu.client_id = c.client_id
       WHERE c.client_id = ?`,
      [clientId]
    );
    if (!row) {
      res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });
      return;
    }
    res.json({
      success: true,
      data: {
        id:           row.client_id,
        fullName:     row.full_name   ?? '',
        email:        row.email       ?? '',
        phone:        row.phone       ?? '',
        birthDate:    toDisplayDate(row.birth_date),
        address:      row.address     ?? '',
        role:         'customer',
        tierId:       row.tier_id,
        loyaltyPoints: Number(row.loyalty_points) || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/account/profile ────────────────────────────────────────────────
router.patch('/profile', requireAuth, async (req, res) => {
  const clientId = req.user!.client_id;
  const { fullName, email, phone, birthDate, address } = req.body as {
    fullName?: string; email?: string; phone?: string;
    birthDate?: string; address?: string;
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
    if (address   !== undefined) { cuSets.push('address = ?');    cuVals.push(address   || null); }
    if (cuSets.length) {
      await pool.execute(
        `UPDATE customer SET ${cuSets.join(', ')} WHERE client_id = ?`,
        [...cuVals, clientId]
      );
    }

    res.json({ success: true, data: null });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/account/password ───────────────────────────────────────────────
router.patch('/password', requireAuth, async (req, res) => {
  const clientId = req.user!.client_id;
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
router.get('/loyalty', requireAuth, async (req, res) => {
  const clientId = req.user!.client_id;
  try {
    const [[cu]] = await pool.execute<any[]>(
      `SELECT cu.loyalty_points, cu.tier_id,
              t.tier_name, t.max_points AS next_tier_points
       FROM customer cu
       LEFT JOIN membership_tier t ON t.tier_id = cu.tier_id
       WHERE cu.client_id = ?`,
      [clientId]
    );

    let history: any[] = [];
    try {
      const [rows] = await pool.execute<any[]>(
        `SELECT transaction_id, transaction_type, points, description, created_at
         FROM loyalty_transaction
         WHERE client_id = ?
         ORDER BY created_at DESC
         LIMIT 10`,
        [clientId]
      );
      history = (rows as any[]).map(h => ({
        id:          h.transaction_id,
        type:        String(h.transaction_type).toUpperCase() === 'EARN' ? 'earn' : 'redeem',
        points:      Number(h.points),
        description: h.description ?? '',
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
router.post('/loyalty/redeem', requireAuth, async (req, res) => {
  const clientId = req.user!.client_id;
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