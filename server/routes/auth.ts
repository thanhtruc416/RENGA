import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'renga_secret';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body as { phone: string; password: string };
  if (!phone || !password) {
    res.status(400).json({ success: false, message: 'Thiếu số điện thoại hoặc mật khẩu' });
    return;
  }

  const [[row]] = await pool.execute<any[]>(
    `SELECT c.client_id, c.phone, cu.full_name, a.password_hash
     FROM client c
     JOIN account a  ON a.client_id  = c.client_id
     JOIN customer cu ON cu.client_id = c.client_id
     WHERE c.phone = ? AND c.client_type = 'CUSTOMER' AND c.status = 'ACTIVE'
     LIMIT 1`,
    [phone]
  );

  if (!row) {
    res.status(401).json({ success: false, message: 'Số điện thoại không tồn tại' });
    return;
  }

  const match = await bcrypt.compare(password, row.password_hash);
  if (!match) {
    res.status(401).json({ success: false, message: 'Mật khẩu không đúng' });
    return;
  }

  const token = jwt.sign(
    { client_id: row.client_id, phone: row.phone, full_name: row.full_name },
    SECRET,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'] }
  );

  res.json({
    success: true,
    data: {
      token,
      user: { id: row.client_id, fullName: row.full_name, phone: row.phone, role: 'customer' },
    },
  });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { fullName, phone, email, password } = req.body as {
    fullName: string; phone: string; email?: string; password: string;
  };
  if (!fullName || !phone || !password) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng ký' });
    return;
  }

  const [[existing]] = await pool.execute<any[]>('SELECT client_id FROM client WHERE phone = ?', [phone]);
  if (existing) {
    res.status(409).json({ success: false, message: 'Số điện thoại đã được đăng ký' });
    return;
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[{ maxClient }]] = await conn.execute<any[]>(
      "SELECT MAX(CAST(SUBSTRING(client_id,4) AS UNSIGNED)) as maxClient FROM client"
    );
    const clientId = `CLT${String((maxClient || 0) + 1).padStart(6, '0')}`;

    const [[{ maxAcc }]] = await conn.execute<any[]>(
      "SELECT MAX(CAST(SUBSTRING(account_id,4) AS UNSIGNED)) as maxAcc FROM account"
    );
    const accountId = `ACC${String((maxAcc || 0) + 1).padStart(6, '0')}`;

    const hash = await bcrypt.hash(password, 10);
    const now = new Date();

    await conn.execute(
      "INSERT INTO client (client_id, email, phone, client_type, status, created_at, updated_at) VALUES (?,?,?,'CUSTOMER','ACTIVE',?,?)",
      [clientId, email || null, phone, now, now]
    );
    await conn.execute(
      "INSERT INTO customer (client_id, full_name, tier_id, loyalty_points) VALUES (?,?,'SILVER',0)",
      [clientId, fullName]
    );
    await conn.execute(
      "INSERT INTO account (account_id, client_id, provider, identifier, password_hash, is_verified, created_at) VALUES (?,?,'LOCAL',?,?,1,?)",
      [accountId, clientId, phone, hash, now]
    );

    await conn.commit();

    const token = jwt.sign(
      { client_id: clientId, phone, full_name: fullName },
      SECRET,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'] }
    );

    res.status(201).json({
      success: true,
      data: { token, user: { id: clientId, fullName, phone, role: 'customer' } },
    });
  } catch (err: any) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally {
    conn.release();
  }
});

export default router;
