import * as dotenv from 'dotenv';
dotenv.config();

console.log('SMTP config:', {
  host: process.env.SMTP_HOST,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS ? '✅' : '❌ trống',
});

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import db, { withTransaction } from '../db';
import { AuthPayload } from '../middlewares/auth.middleware';

// ─── Constants ────────────────────────────────────────────────────────────────

const JWT_SECRET           = process.env.JWT_SECRET || 'changeme';
const JWT_ACCESS_EXPIRES   = '24h';
const REFRESH_EXPIRES_DAYS = 7;
const OTP_EXPIRES_MINUTES  = 5;
const OTP_RESEND_SECONDS   = 30;
const SALT_ROUNDS          = 12;
const MAX_LOGIN_ATTEMPTS   = 5;

// ─── Types ────────────────────────────────────────────────────────────────────

type OtpPurpose = 'REGISTER' | 'RESET_PASSWORD' | 'VERIFY' | 'LOGIN_LOCK';

// ─── Regex ────────────────────────────────────────────────────────────────────

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const EMAIL_REGEX    = /^[a-zA-Z0-9][a-zA-Z0-9._+\-]{1,}@[a-zA-Z0-9][a-zA-Z0-9.\-]*\.[a-zA-Z]{2,}$/;

// ─── ID generators ────────────────────────────────────────────────────────────

function generateClientId(): string {
  return 'CL' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100).toString().padStart(2, '0');
}

function generateAccountId(): string {
  return 'ACC' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100).toString().padStart(2, '0');
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validatePassword(password: string): void {
  if (!PASSWORD_REGEX.test(password)) {
    throw {
      status: 400,
      message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&).',
    };
  }
}

export function validateEmail(email: string): void {
  const lower = email.toLowerCase().trim();
  if (/\.\./.test(lower) || lower.startsWith('.') || lower.endsWith('.') || /\s/.test(lower)) {
    throw { status: 400, message: 'Email không hợp lệ.' };
  }
  if (!EMAIL_REGEX.test(lower)) {
    throw { status: 400, message: 'Email không đúng định dạng.' };
  }
}

// ─── Mailer ───────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error('❌ SMTP lỗi:', error);
  else       console.log('✅ SMTP kết nối thành công');
});

const OTP_SUBJECT: Record<OtpPurpose, string> = {
  REGISTER:       'Xác thực đăng ký tài khoản RENGA',
  RESET_PASSWORD: 'Đặt lại mật khẩu RENGA',
  VERIFY:         'Xác thực tài khoản RENGA',
  LOGIN_LOCK:     'Mở khóa tài khoản RENGA',
};

async function sendOtpEmail(to: string, otp: string, purpose: OtpPurpose): Promise<void> {
  const info = await transporter.sendMail({
    from:    `"RENGA" <${process.env.SMTP_USER}>`,
    to,
    subject: OTP_SUBJECT[purpose],
    html: `
      <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
      <p>Mã có hiệu lực trong <strong>${OTP_EXPIRES_MINUTES} phút</strong>.</p>
      <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
    `,
  });

  console.log('SMTP response:', {
    messageId: info.messageId,
    accepted:  info.accepted,
    rejected:  info.rejected,
    response:  info.response,
  });
}

// ─── Token helpers ────────────────────────────────────────────────────────────

function signAccessToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES });
}

async function createRefreshToken(
  accountId: string,
  device?:   string,
  ip?:       string,
): Promise<string> {
  const tokenId      = uuidv4();
  const refreshToken = crypto.randomBytes(64).toString('hex');
  // Dùng NOW() + INTERVAL thay vì Date() để tránh lệch timezone
  await db.query(
    `INSERT INTO refresh_token (token_id, account_id, refresh_token, device, ip_address, expired_at)
     VALUES (?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))`,
    [tokenId, accountId, refreshToken, device ?? null, ip ?? null, REFRESH_EXPIRES_DAYS],
  );
  return refreshToken;
}

async function revokeRefreshToken(refreshToken: string): Promise<void> {
  await db.query('UPDATE refresh_token SET is_revoked = 1 WHERE refresh_token = ?', [refreshToken]);
}

async function revokeAllRefreshTokens(accountId: string): Promise<void> {
  await db.query('UPDATE refresh_token SET is_revoked = 1 WHERE account_id = ?', [accountId]);
}

// ─── OTP helpers ──────────────────────────────────────────────────────────────

async function checkOtpResendCooldown(params: {
  phone?:   string;
  email?:   string;
  purpose:  OtpPurpose;
}): Promise<void> {
  const { phone, email, purpose } = params;

  const [rows] = await db.query(
    `SELECT created_at FROM otp_request
     WHERE purpose = ?
       AND (
         (phone IS NOT NULL AND phone = ?)
         OR (email IS NOT NULL AND email = ?)
       )
     ORDER BY created_at DESC
     LIMIT 1`,
    [purpose, phone ?? null, email ?? null],
  ) as [any[], any];

  if (rows.length > 0) {
    // TIMESTAMPDIFF tính bằng giây trong MySQL — tránh hoàn toàn vấn đề timezone JS
    const [diff] = await db.query(
      'SELECT TIMESTAMPDIFF(SECOND, ?, NOW()) AS diff',
      [rows[0].created_at],
    ) as [any[], any];

    const elapsed = diff[0].diff as number;
    if (elapsed < OTP_RESEND_SECONDS) {
      const remaining = OTP_RESEND_SECONDS - elapsed;
      throw { status: 429, message: `Vui lòng chờ ${remaining}s trước khi gửi lại mã.` };
    }
  }
}

async function issueOtp(params: {
  clientId?: string;
  phone?:    string;
  email?:    string;
  purpose:   OtpPurpose;
}): Promise<string> {
  const { clientId, phone, email, purpose } = params;

  // Vô hiệu hoá OTP cũ chưa dùng
  await db.query(
    `UPDATE otp_request
     SET is_used = 1
     WHERE purpose = ? AND is_used = 0
       AND (
         (phone IS NOT NULL AND phone = ?)
         OR (email IS NOT NULL AND email = ?)
       )`,
    [purpose, phone ?? null, email ?? null],
  );

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // expired_at = NOW() + 5 phút — tính trong MySQL, không dùng Date() JS
  await db.query(
    `INSERT INTO otp_request (otp_id, client_id, phone, email, otp_code, purpose, expired_at)
     VALUES (?, ?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))`,
    [uuidv4(), clientId ?? null, phone ?? null, email ?? null, otp, purpose, OTP_EXPIRES_MINUTES],
  );

  return otp;
}

async function verifyOtp(params: {
  phone?:  string;
  email?:  string;
  otp:     string;
  purpose: OtpPurpose;
}): Promise<void> {
  const { phone, email, otp, purpose } = params;

  const [rows] = await db.query(
    `SELECT otp_id,
            expired_at,
            (NOW() > expired_at) AS is_expired
     FROM otp_request
     WHERE purpose  = ?
       AND otp_code = ?
       AND is_used  = 0
       AND (
         (phone IS NOT NULL AND phone = ?)
         OR (email IS NOT NULL AND email = ?)
       )
     ORDER BY created_at DESC
     LIMIT 1`,
    [purpose, otp, phone ?? null, email ?? null],
  ) as [any[], any];

  if (rows.length === 0) {
    throw { status: 400, message: 'Mã OTP không hợp lệ.' };
  }

  // is_expired tính bằng MySQL NOW() — không bị lệch timezone
  if (rows[0].is_expired) {
    await db.query('UPDATE otp_request SET is_used = 1 WHERE otp_id = ?', [rows[0].otp_id]);
    throw { status: 400, message: 'Mã OTP đã hết hạn.' };
  }

  await db.query('UPDATE otp_request SET is_used = 1 WHERE otp_id = ?', [rows[0].otp_id]);
}

// ─── Đăng ký: bước 1 — validate & gửi OTP ────────────────────────────────────

export async function registerSendOtp(data: {
  fullName:        string;
  phone:           string;
  password:        string;
  confirmPassword: string;
  email?:          string;
  gender?:         'MALE' | 'FEMALE' | 'OTHER';
  birthDate?:      string;
}): Promise<{ message: string }> {
  const { fullName, phone, password, confirmPassword, email } = data;

  if (!fullName.trim()) throw { status: 400, message: 'Họ tên không được để trống.' };
  if (password !== confirmPassword) throw { status: 400, message: 'Mật khẩu xác nhận không khớp.' };
  validatePassword(password);

  const normalizedEmail = email ? email.toLowerCase().trim() : null;
  if (normalizedEmail) validateEmail(normalizedEmail);

  const [existing] = await db.query(
    `SELECT c.client_id FROM client c
     WHERE (c.phone = ? OR (c.email IS NOT NULL AND c.email = ?))
       AND c.client_type = 'CUSTOMER'`,
    [phone, normalizedEmail],
  ) as [any[], any];

  if (existing.length > 0) {
    throw { status: 400, message: 'Số điện thoại hoặc email đã được sử dụng.' };
  }

  await checkOtpResendCooldown({ phone, purpose: 'REGISTER' });
  const otp = await issueOtp({ phone, email: normalizedEmail ?? undefined, purpose: 'REGISTER' });

  if (normalizedEmail) {
    await sendOtpEmail(normalizedEmail, otp, 'REGISTER');
  } else {
    // Không có email → log OTP ra console để test (xóa khi có SMS)
    console.log(`[DEV] OTP cho ${phone}: ${otp}`);
  }

  return { message: 'Mã OTP đã được gửi. Vui lòng xác thực trong 5 phút.' };
}

// ─── Đăng ký: bước 2 — xác thực OTP & tạo tài khoản ─────────────────────────

export async function registerVerifyOtp(
  data: {
    fullName:      string;
    phone:         string;
    password:      string;
    email?:        string;
    gender?:       'MALE' | 'FEMALE' | 'OTHER';
    birthDate?:    string;
    mergeGuestId?: string;
  },
  otp:  string,
  meta: { device?: string; ip?: string },
): Promise<{ accessToken: string; refreshToken: string; clientId: string; fullName: string }> {
    console.log('[registerVerifyOtp] data:', data, 'otp:', otp);
  const { fullName, phone, password, email, gender, birthDate, mergeGuestId } = data;
  const normalizedEmail = email ? email.toLowerCase().trim() : null;

  await verifyOtp({ phone, otp, purpose: 'REGISTER' });

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const identifier   = normalizedEmail ?? phone;

  let clientId:  string;
  const accountId = generateAccountId();

  if (mergeGuestId) {
    const [guestCheck] = await db.query(
      `SELECT client_id FROM client WHERE client_id = ? AND client_type = 'GUEST'`,
      [mergeGuestId],
    ) as [any[], any];

    if (guestCheck.length === 0) throw { status: 400, message: 'Hồ sơ guest không hợp lệ.' };
    clientId = mergeGuestId;

    await withTransaction(async (conn) => {
      await conn.query(
        `UPDATE client
         SET client_type = 'CUSTOMER', status = 'ACTIVE',
             email = COALESCE(?, email), updated_at = NOW()
         WHERE client_id = ?`,
        [normalizedEmail, clientId],
      );
      await conn.query('DELETE FROM guest WHERE client_id = ?', [clientId]);
      await conn.query(
        `INSERT INTO customer (client_id, full_name, gender, birth_date, tier_id, loyalty_points, tier_start_date)
        VALUES (?, ?, ?, ?, 'TIR000001', 0, NOW())`,
        [clientId, fullName, gender ?? null, birthDate ?? null],
      );
      await conn.query(
        `INSERT INTO account (account_id, client_id, provider, identifier, password_hash, is_verified, created_at)
         VALUES (?, ?, 'LOCAL', ?, ?, 1, NOW())`,
        [accountId, clientId, identifier, passwordHash],
      );
    });
  } else {
    clientId = generateClientId();

    await withTransaction(async (conn) => {
      await conn.query(
        `INSERT INTO client (client_id, email, phone, client_type, status, created_at, updated_at)
         VALUES (?, ?, ?, 'CUSTOMER', 'ACTIVE', NOW(), NOW())`,
        [clientId, normalizedEmail, phone],
      );
      await conn.query(
        `INSERT INTO customer (client_id, full_name, gender, birth_date, tier_id, loyalty_points, tier_start_date)
        VALUES (?, ?, ?, ?, 'TIR000001', 0, NOW())`,
        [clientId, fullName, gender ?? null, birthDate ?? null],
      );
      await conn.query(
        `INSERT INTO account (account_id, client_id, provider, identifier, password_hash, is_verified, created_at)
         VALUES (?, ?, 'LOCAL', ?, ?, 1, NOW())`,
        [accountId, clientId, identifier, passwordHash],
      );
    });
  }

  const payload: AuthPayload = { accountId, clientId, role: 'CUSTOMER' };
  const accessToken  = signAccessToken(payload);
  const refreshToken = await createRefreshToken(accountId, meta.device, meta.ip);

  console.log(`[INFO] Đăng ký thành công: clientId=${clientId}, accountId=${accountId}`);

  return { accessToken, refreshToken, clientId, fullName };
}

// ─── Kiểm tra guest ───────────────────────────────────────────────────────────

export async function checkGuestByPhone(phone: string): Promise<{
  hasGuest:       boolean;
  guestClientId?: string;
}> {
  const [rows] = await db.query(
    `SELECT client_id FROM client WHERE phone = ? AND client_type = 'GUEST'`,
    [phone],
  ) as [any[], any];

  if (rows.length === 0) return { hasGuest: false };
  return { hasGuest: true, guestClientId: rows[0].client_id };
}

// ─── Đăng nhập customer ───────────────────────────────────────────────────────

export async function loginCustomer(
  data:  { identifier: string; password: string },
  meta?: { device?: string; ip?: string },
): Promise<{ accessToken: string; refreshToken: string; clientId: string; fullName: string }> {
  const { identifier, password } = data;

  const [rows] = await db.query(
    `SELECT a.account_id, a.client_id, a.password_hash,
            a.failed_login_attempts, a.locked_until,
            c.status, cu.full_name
     FROM account a
     JOIN client   c  ON c.client_id  = a.client_id
     JOIN customer cu ON cu.client_id = a.client_id
     WHERE a.provider = 'LOCAL'
       AND c.phone = ?`,
    [identifier],
  ) as [any[], any];

  if (rows.length === 0) {
    throw { status: 404, message: 'Số điện thoại chưa được đăng ký.' };
  }

  const acc = rows[0];

  if (acc.status === 'INACTIVE') {
    throw { status: 403, message: 'Tài khoản đã bị vô hiệu hoá. Vui lòng liên hệ hỗ trợ.' };
  }

  if (acc.locked_until) {
    const [lockCheck] = await db.query(
      'SELECT (NOW() < ?) AS still_locked',
      [acc.locked_until],
    ) as [any[], any];

    if (lockCheck[0].still_locked) {
      throw {
        status:     423,
        message:    'Tài khoản tạm khóa do nhập sai quá nhiều lần. Vui lòng xác thực OTP để mở khóa.',
        requireOtp: true,
      };
    }
  }

  if (!acc.password_hash) {
    throw { status: 401, message: 'Tài khoản này đăng nhập bằng mạng xã hội. Vui lòng dùng Google/Facebook.' };
  }

  const isMatch = await bcrypt.compare(password, acc.password_hash);

  if (!isMatch) {
    const attempts = (acc.failed_login_attempts ?? 0) + 1;

    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      await db.query(
        `UPDATE account
         SET failed_login_attempts = ?,
             locked_until = DATE_ADD(NOW(), INTERVAL 30 MINUTE)
         WHERE account_id = ?`,
        [attempts, acc.account_id],
      );
      throw {
        status:     423,
        message:    'Bạn đã nhập sai mật khẩu 5 lần. Vui lòng xác thực OTP để mở khóa tài khoản.',
        requireOtp: true,
      };
    }

    await db.query(
      'UPDATE account SET failed_login_attempts = ? WHERE account_id = ?',
      [attempts, acc.account_id],
    );
    throw {
      status:            401,
      message:           `Thông tin đăng nhập không chính xác. Còn ${MAX_LOGIN_ATTEMPTS - attempts} lần thử.`,
      remainingAttempts: MAX_LOGIN_ATTEMPTS - attempts,
    };
  }

  await db.query(
    'UPDATE account SET failed_login_attempts = 0, locked_until = NULL WHERE account_id = ?',
    [acc.account_id],
  );

  const payload: AuthPayload = { accountId: acc.account_id, clientId: acc.client_id, role: 'CUSTOMER' };
  const accessToken  = signAccessToken(payload);
  const refreshToken = await createRefreshToken(acc.account_id, meta?.device, meta?.ip);

  return { accessToken, refreshToken, clientId: acc.client_id, fullName: acc.full_name };
}

// ─── Mở khoá tài khoản — gửi OTP ─────────────────────────────────────────────

export async function sendLoginLockOtp(identifier: string): Promise<{ message: string }> {
  const GENERIC_MSG = 'Nếu tài khoản tồn tại, OTP sẽ được gửi đi.';

  const [rows] = await db.query(
    `SELECT a.account_id, c.phone, c.email
     FROM account a
     JOIN client c ON c.client_id = a.client_id
     WHERE a.provider = 'LOCAL' AND a.identifier = ?`,
    [identifier],
  ) as [any[], any];

  if (rows.length === 0) return { message: GENERIC_MSG };

  const { phone, email } = rows[0];
  await checkOtpResendCooldown({ phone, purpose: 'LOGIN_LOCK' });
  const otp = await issueOtp({ phone, email: email ?? undefined, purpose: 'LOGIN_LOCK' });

  if (email) await sendOtpEmail(email, otp, 'LOGIN_LOCK');
  else       console.log(`[DEV] OTP mở khoá cho ${phone}: ${otp}`);

  return { message: GENERIC_MSG };
}

// ─── Mở khoá tài khoản — xác thực OTP ───────────────────────────────────────

export async function verifyLoginLockOtp(data: {
  identifier: string;
  otp:        string;
}): Promise<void> {
  const { identifier, otp } = data;

  const [rows] = await db.query(
    `SELECT a.account_id, c.phone
     FROM account a
     JOIN client c ON c.client_id = a.client_id
     WHERE a.provider = 'LOCAL' AND a.identifier = ?`,
    [identifier],
  ) as [any[], any];

  if (rows.length === 0) throw { status: 400, message: 'Tài khoản không tồn tại.' };

  const { phone, account_id } = rows[0];
  await verifyOtp({ phone, otp, purpose: 'LOGIN_LOCK' });

  await db.query(
    'UPDATE account SET failed_login_attempts = 0, locked_until = NULL WHERE account_id = ?',
    [account_id],
  );
}

// ─── Đăng nhập employee ───────────────────────────────────────────────────────

export async function loginEmployee(
  data:  { email: string; password: string },
  meta?: { device?: string; ip?: string },
): Promise<{ accessToken: string; refreshToken: string; employeeId: string; employeeType: string }> {
  const { email, password } = data;

  const [rows] = await db.query(
    `SELECT e.employee_id, e.password_hash, e.status, e.employee_type,
            a.role AS admin_role
     FROM employee e
     LEFT JOIN admin a ON a.employee_id = e.employee_id
     WHERE e.email = ?`,
    [email],
  ) as [any[], any];

  if (rows.length === 0) throw { status: 401, message: 'Thông tin đăng nhập không chính xác.' };

  const emp = rows[0];
  if (emp.status === 'INACTIVE') throw { status: 403, message: 'Tài khoản đã bị khóa.' };

  const isMatch = await bcrypt.compare(password, emp.password_hash);
  if (!isMatch) throw { status: 401, message: 'Thông tin đăng nhập không chính xác.' };

  const role = emp.employee_type as 'ADMIN' | 'DESIGNER';
  const payload: AuthPayload = {
    accountId:    emp.employee_id,
    employeeId:   emp.employee_id,
    role,
    employeeType: role,
    ...(role === 'ADMIN' && { adminRole: emp.admin_role }),
  };

  const accessToken  = signAccessToken(payload);
  const refreshToken = await createRefreshToken(emp.employee_id, meta?.device, meta?.ip);

  return { accessToken, refreshToken, employeeId: emp.employee_id, employeeType: emp.employee_type };
}

// ─── Refresh access token ─────────────────────────────────────────────────────

export async function refreshAccessToken(
  incomingRefreshToken: string,
): Promise<{ accessToken: string }> {
  const [rows] = await db.query(
    `SELECT account_id, is_revoked,
            (NOW() > expired_at) AS is_expired
     FROM refresh_token
     WHERE refresh_token = ?`,
    [incomingRefreshToken],
  ) as [any[], any];

  if (rows.length === 0 || rows[0].is_revoked) {
    throw { status: 401, message: 'Refresh token không hợp lệ hoặc đã bị thu hồi.' };
  }
  if (rows[0].is_expired) {
    throw { status: 401, message: 'Refresh token đã hết hạn. Vui lòng đăng nhập lại.' };
  }

  const accountId = rows[0].account_id;

  const [accRows] = await db.query(
    `SELECT account_id, client_id FROM account WHERE account_id = ?`,
    [accountId],
  ) as [any[], any];

  if (accRows.length > 0 && accRows[0].client_id) {
    const payload: AuthPayload = { accountId, clientId: accRows[0].client_id, role: 'CUSTOMER' };
    return { accessToken: signAccessToken(payload) };
  }

  const [empRows] = await db.query(
    `SELECT e.employee_id, e.employee_type, a.role AS admin_role
     FROM employee e
     LEFT JOIN admin a ON a.employee_id = e.employee_id
     WHERE e.employee_id = ?`,
    [accountId],
  ) as [any[], any];

  if (empRows.length === 0) throw { status: 401, message: 'Tài khoản không tồn tại.' };

  const role = empRows[0].employee_type as 'ADMIN' | 'DESIGNER';
  const payload: AuthPayload = {
    accountId,
    employeeId:   empRows[0].employee_id,
    role,
    employeeType: role,
    ...(role === 'ADMIN' && { adminRole: empRows[0].admin_role }),
  };
  return { accessToken: signAccessToken(payload) };
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout(refreshToken: string): Promise<void> {
  await revokeRefreshToken(refreshToken);
}

// ─── Quên mật khẩu: bước 1 ───────────────────────────────────────────────────

export async function forgotPasswordSendOtp(phone: string): Promise<{ message: string }> {
  const GENERIC_MSG = 'Nếu số điện thoại tồn tại, mã OTP sẽ được gửi trong vài giây.';

  console.log('[forgotPassword] phone received:', JSON.stringify(phone));

  const [rows] = await db.query(
    `SELECT a.account_id, c.phone, c.email
     FROM account a
     JOIN client c ON c.client_id = a.client_id
     WHERE a.provider = 'LOCAL' AND c.phone = ?`,
    [phone],
  ) as [any[], any];

  console.log('[forgotPassword] rows found:', rows.length, rows.map((r: any) => ({ phone: r.phone, email: r.email })));

  if (rows.length === 0) return { message: GENERIC_MSG };

  const { email } = rows[0];

  if (!email) {
    throw {
      status:  422,
      message: 'Tài khoản của bạn chưa có địa chỉ email, vui lòng liên hệ hỗ trợ.',
    };
  }

  await checkOtpResendCooldown({ phone, purpose: 'RESET_PASSWORD' });
  const otp = await issueOtp({ phone, email, purpose: 'RESET_PASSWORD' });
  await sendOtpEmail(email, otp, 'RESET_PASSWORD');

  return { message: GENERIC_MSG };
}

// ─── Quên mật khẩu: bước 2 — xác thực OTP & lấy reset token ─────────────────

const RESET_TOKEN_EXPIRES_MINUTES = 10;

export async function forgotPasswordVerifyOtp(data: {
  phone: string;
  otp:   string;
}): Promise<{ resetToken: string }> {
  const { phone, otp } = data;

  const [rows] = await db.query(
    `SELECT a.account_id
     FROM account a
     JOIN client c ON c.client_id = a.client_id
     WHERE a.provider = 'LOCAL' AND c.phone = ?`,
    [phone],
  ) as [any[], any];

  if (rows.length === 0) throw { status: 400, message: 'Tài khoản không tồn tại.' };

  await verifyOtp({ phone, otp, purpose: 'RESET_PASSWORD' });

  const resetToken = jwt.sign(
    { phone, purpose: 'RESET_PASSWORD' },
    JWT_SECRET,
    { expiresIn: `${RESET_TOKEN_EXPIRES_MINUTES}m` },
  );

  return { resetToken };
}

// ─── Quên mật khẩu: bước 3 — đặt lại mật khẩu ───────────────────────────────

export async function resetPassword(data: {
  resetToken:      string;
  newPassword:     string;
  confirmPassword: string;
}): Promise<void> {
  const { resetToken, newPassword, confirmPassword } = data;

  if (newPassword !== confirmPassword) {
    throw { status: 400, message: 'Mật khẩu xác nhận không khớp.' };
  }
  validatePassword(newPassword);

  let decoded: { phone: string; purpose: string };
  try {
    decoded = jwt.verify(resetToken, JWT_SECRET) as { phone: string; purpose: string };
  } catch {
    throw { status: 400, message: 'Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.' };
  }

  if (decoded.purpose !== 'RESET_PASSWORD') {
    throw { status: 400, message: 'Token không hợp lệ.' };
  }

  const { phone } = decoded;

  const [rows] = await db.query(
    `SELECT a.account_id
     FROM account a
     JOIN client c ON c.client_id = a.client_id
     WHERE a.provider = 'LOCAL' AND c.phone = ?`,
    [phone],
  ) as [any[], any];

  if (rows.length === 0) throw { status: 400, message: 'Tài khoản không tồn tại.' };

  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await db.query(
    `UPDATE account
     SET password_hash = ?, failed_login_attempts = 0, locked_until = NULL
     WHERE account_id = ?`,
    [passwordHash, rows[0].account_id],
  );

  await revokeAllRefreshTokens(rows[0].account_id);
}

// ─── Tạo hồ sơ guest ─────────────────────────────────────────────────────────

export async function createGuestProfile(data: {
  phone:  string;
  email?: string;
}): Promise<{ clientId: string }> {
  const { phone, email } = data;
  const normalizedEmail  = email ? email.toLowerCase().trim() : null;
  const clientId         = generateClientId();

  await withTransaction(async (conn) => {
    await conn.query(
      `INSERT INTO client (client_id, email, phone, client_type, status, created_at, updated_at)
       VALUES (?, ?, ?, 'GUEST', 'ANONYMOUS', NOW(), NOW())`,
      [clientId, normalizedEmail, phone],
    );
    await conn.query('INSERT INTO guest (client_id) VALUES (?)', [clientId]);
  });

  return { clientId };
}

function generateGuestPlaceholderPhone(): string {
  // SĐT giả duy nhất cho riêng client guest này — KHÔNG phải SĐT người nhận thật.
  return 'G' + Date.now().toString().slice(-9) + Math.floor(Math.random() * 10);
}

/**
 * Đăng nhập tạm cho khách vãng lai lúc checkout. SĐT/email khách nhập ở form checkout là
 * thông tin LIÊN HỆ GIAO HÀNG cho đơn này (VD: mua tặng bạn bè → là SĐT của bạn, không phải
 * của người đặt) — không được dùng để tra/gộp vào 1 client_id có sẵn, vì có thể trùng với
 * SĐT của 1 tài khoản CUSTOMER thật khác, khiến đơn hàng bị gán nhầm vào tài khoản người đó.
 *
 * Vì vậy mỗi lượt checkout guest luôn được cấp 1 client_id GUEST hoàn toàn mới, độc lập —
 * không liên quan gì tới SĐT nhập trong form. SĐT/tên người nhận thật vẫn được lưu đúng chỗ
 * của nó là bảng `address` (order.service.ts) để giao hàng & tra cứu đơn.
 */
export async function guestCheckout(_data: {
  phone:  string;
  email?: string;
}): Promise<{ accessToken: string; clientId: string }> {
  const clientId = generateClientId();

  await withTransaction(async (conn) => {
    await conn.query(
      `INSERT INTO client (client_id, email, phone, client_type, status, created_at, updated_at)
       VALUES (?, NULL, ?, 'GUEST', 'ANONYMOUS', NOW(), NOW())`,
      [clientId, generateGuestPlaceholderPhone()],
    );
    await conn.query('INSERT INTO guest (client_id) VALUES (?)', [clientId]);
  });

  const payload: AuthPayload = { accountId: `GUEST-${clientId}`, clientId, role: 'GUEST' };
  const accessToken = signAccessToken(payload);

  return { accessToken, clientId };
}

// ─── OAuth ────────────────────────────────────────────────────────────────────

export async function oauthLogin(data: {
  provider:    'GOOGLE' | 'FACEBOOK';
  providerUid: string;
  email?:      string;
  fullName?:   string;
}): Promise<{ accessToken: string; refreshToken: string; clientId: string; isNew: boolean }> {
  const { provider, providerUid, email, fullName } = data;
  const normalizedEmail = email ? email.toLowerCase().trim() : null;

  const [rows] = await db.query(
    `SELECT account_id, client_id FROM account WHERE provider = ? AND identifier = ?`,
    [provider, providerUid],
  ) as [any[], any];

  if (rows.length > 0) {
    const { account_id, client_id } = rows[0];
    const payload: AuthPayload      = { accountId: account_id, clientId: client_id, role: 'CUSTOMER' };
    const accessToken               = signAccessToken(payload);
    const refreshToken              = await createRefreshToken(account_id);
    return { accessToken, refreshToken, clientId: client_id, isNew: false };
  }

  const clientId  = generateClientId();
  const accountId = generateAccountId();

  await withTransaction(async (conn) => {
    await conn.query(
      `INSERT INTO client (client_id, email, phone, client_type, status, created_at, updated_at)
       VALUES (?, ?, NULL, 'CUSTOMER', 'ACTIVE', NOW(), NOW())`,
      [clientId, normalizedEmail],
    );
    await conn.query(
      `INSERT INTO customer (client_id, full_name, tier_id, loyalty_points, tier_start_date)
      VALUES (?, ?, 'TIR000001', 0, NOW())`,
      [clientId, fullName ?? normalizedEmail ?? providerUid],
    );
    await conn.query(
      `INSERT INTO account (account_id, client_id, provider, identifier, password_hash, is_verified, created_at)
       VALUES (?, ?, ?, ?, NULL, 1, NOW())`,
      [accountId, clientId, provider, providerUid],
    );
  });

  const payload: AuthPayload = { accountId, clientId, role: 'CUSTOMER' };
  const accessToken          = signAccessToken(payload);
  const refreshToken         = await createRefreshToken(accountId);
  return { accessToken, refreshToken, clientId, isNew: true };
}