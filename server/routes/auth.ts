import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import {
  registerSendOtp,
  registerVerifyOtp,
  checkGuestByPhone,
  loginCustomer,
  sendLoginLockOtp,
  verifyLoginLockOtp,
  loginEmployee,
  refreshAccessToken,
  logout,
  forgotPasswordSendOtp,
  resetPassword,
  createGuestProfile,
  oauthLogin,
} from '../services/auth.service';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

// ─── Passport Google OAuth2 ───────────────────────────────────────────────────
// Cần thêm vào .env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APP_BASE_URL
// Cần gọi app.use(passport.initialize()) trong server.ts

// Chỉ đăng ký strategy nếu đã có đủ Client ID/Secret trong .env.
// Nếu chưa cấu hình, bỏ qua (không crash server) — route /auth/google sẽ lỗi nếu gọi,
// nhưng các route khác (đăng ký, đăng nhập, OTP...) vẫn hoạt động bình thường.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  `${process.env.APP_BASE_URL}/auth/google/callback`,
      },
      (_accessToken, _refreshToken, profile: Profile, done) => {
        done(null, profile as unknown as Express.User);
      }
    )
  );
} else {
  console.warn('⚠️  GOOGLE_CLIENT_ID/SECRET chưa được cấu hình trong .env — tạm bỏ qua Google OAuth.');
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function handleError(err: any, res: Response): void {
    console.error('[AUTH ERROR]', err);
  if (err?.status) {
    res.status(err.status).json({
      message: err.message,
      ...(err.requireOtp && { requireOtp: true }),
    });
  } else {
    console.error('UNHANDLED ERROR:', JSON.stringify(err, null, 2));
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
}

function getClientMeta(req: Request) {
  return {
    device: req.headers['user-agent'] as string | undefined,
    ip:     req.ip,
  };
}

// ─── POST /auth/register/send-otp ────────────────────────────────────────────
/**
 * Bước 1 đăng ký: validate + gửi OTP về SĐT/email.
 * Body: { fullName, phone, password, confirmPassword, email?, gender?, birthDate? }
 * Response 200: { message }
 */
router.post('/register/send-otp', async (req: Request, res: Response) => {
  const { fullName, phone, password, confirmPassword, email, gender, birthDate } = req.body;

  if (!fullName || !phone || !password || !confirmPassword) {
    res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ họ tên, số điện thoại và mật khẩu.' });
    return;
  }

  try {
    const result = await registerSendOtp({ fullName, phone, password, confirmPassword, email, gender, birthDate });
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/register/verify-otp ──────────────────────────────────────────
/**
 * Bước 2 đăng ký: xác thực OTP → tạo tài khoản.
 * Body: { fullName, phone, password, otp, email?, gender?, birthDate?, mergeGuestId? }
 * Response 201: { accessToken, refreshToken, clientId, fullName }
 */
router.post('/register/verify-otp', async (req: Request, res: Response) => {
  const { fullName, phone, password, otp, email, gender, birthDate, mergeGuestId } = req.body;

  if (!fullName || !phone || !password || !otp) {
    res.status(400).json({ message: 'Thiếu thông tin xác thực.' });
    return;
  }

  try {
    const result = await registerVerifyOtp(
      { fullName, phone, password, email, gender, birthDate, mergeGuestId },
      otp,
      getClientMeta(req)
    );
    res.status(201).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── GET /auth/register/check-guest?phone=... ────────────────────────────────
/**
 * Kiểm tra SĐT có hồ sơ guest không → FE hiện popup gợi ý merge.
 * Response 200: { hasGuest, guestClientId? }
 */
router.get('/register/check-guest', async (req: Request, res: Response) => {
  const phone = req.query['phone'] as string;

  if (!phone) {
    res.status(400).json({ message: 'Vui lòng cung cấp số điện thoại.' });
    return;
  }

  try {
    const result = await checkGuestByPhone(phone);
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/login ─────────────────────────────────────────────────────────
/**
 * Đăng nhập customer (SĐT hoặc email + mật khẩu).
 * Body: { identifier, password }
 * Response 200: { accessToken, refreshToken, clientId, fullName }
 * Response 423: { message, requireOtp: true } — bị khoá sau 5 lần sai
 */
router.post('/login', async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    res.status(400).json({ message: 'Vui lòng nhập thông tin đăng nhập.' });
    return;
  }

  try {
    const result = await loginCustomer({ identifier, password }, getClientMeta(req));
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/login/unlock/send-otp ────────────────────────────────────────
/**
 * Gửi OTP mở khoá sau 5 lần nhập sai mật khẩu.
 * Body: { identifier }
 * Response 200: { message }
 */
router.post('/login/unlock/send-otp', async (req: Request, res: Response) => {
  const { identifier } = req.body;

  if (!identifier) {
    res.status(400).json({ message: 'Vui lòng cung cấp thông tin tài khoản.' });
    return;
  }

  try {
    const result = await sendLoginLockOtp(identifier);
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/login/unlock/verify-otp ──────────────────────────────────────
/**
 * Xác thực OTP → mở khoá tài khoản (reset failed_login_attempts + locked_until).
 * Body: { identifier, otp }
 * Response 200: { message }
 */
router.post('/login/unlock/verify-otp', async (req: Request, res: Response) => {
  const { identifier, otp } = req.body;

  if (!identifier || !otp) {
    res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    return;
  }

  try {
    await verifyLoginLockOtp({ identifier, otp });
    res.status(200).json({ message: 'Tài khoản đã được mở khóa. Vui lòng đăng nhập lại.' });
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/token/refresh ─────────────────────────────────────────────────
/**
 * Làm mới Access Token bằng Refresh Token.
 * Body: { refreshToken }
 * Response 200: { accessToken }
 */
router.post('/token/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: 'Thiếu refresh token.' });
    return;
  }

  try {
    const result = await refreshAccessToken(refreshToken);
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/logout ────────────────────────────────────────────────────────
/**
 * Đăng xuất: thu hồi Refresh Token.
 * Body: { refreshToken }
 * Response 200: { message }
 */
router.post('/logout', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: 'Thiếu refresh token.' });
    return;
  }

  try {
    await logout(refreshToken);
    res.status(200).json({ message: 'Đăng xuất thành công.' });
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/admin/login ───────────────────────────────────────────────────
/**
 * Đăng nhập Admin / Designer.
 * Body: { email, password }
 * Response 200: { accessToken, refreshToken, employeeId, employeeType }
 */
router.post('/admin/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
    return;
  }

  try {
    const result = await loginEmployee({ email, password }, getClientMeta(req));
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/guest ─────────────────────────────────────────────────────────
/**
 * Tạo hồ sơ guest khi đặt hàng không cần đăng nhập.
 * Body: { phone, email? }
 * Response 201: { clientId }
 */
router.post('/guest', async (req: Request, res: Response) => {
  const { phone, email } = req.body;

  if (!phone) {
    res.status(400).json({ message: 'Vui lòng cung cấp số điện thoại.' });
    return;
  }

  try {
    const result = await createGuestProfile({ phone, email });
    res.status(201).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/forgot-password/send-otp ─────────────────────────────────────
/**
 * Quên mật khẩu bước 1: nhập SĐT → gửi OTP.
 * Body: { phone }
 * Response 200: { message } — luôn 200 dù SĐT không tồn tại (chống enumerate)
 */
router.post('/forgot-password/send-otp', async (req: Request, res: Response) => {
  const { phone } = req.body;

  if (!phone) {
    res.status(400).json({ message: 'Vui lòng cung cấp số điện thoại.' });
    return;
  }

  try {
    const result = await forgotPasswordSendOtp(phone);
    res.status(200).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// ─── POST /auth/forgot-password/reset ────────────────────────────────────────
/**
 * Quên mật khẩu bước 2: xác thực OTP + đặt lại mật khẩu.
 * Body: { phone, otp, newPassword, confirmPassword }
 * Response 200: { message }
 */
router.post('/forgot-password/reset', async (req: Request, res: Response) => {
  const { phone, otp, newPassword, confirmPassword } = req.body;

  if (!phone || !otp || !newPassword || !confirmPassword) {
    res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    return;
  }

  try {
    await resetPassword({ phone, otp, newPassword, confirmPassword });
    res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công.' });
  } catch (err) {
    handleError(err, res);
  }
});

// ─── Google OAuth2 ────────────────────────────────────────────────────────────
/**
 * GET /auth/google
 * FE redirect trình duyệt tới endpoint này.
 * BE redirect tiếp sang Google consent screen.
 *
 * Thêm vào .env:
 *   GOOGLE_CLIENT_ID=...
 *   GOOGLE_CLIENT_SECRET=...
 *   APP_BASE_URL=http://localhost:4200   (hoặc domain production)
 *   FRONTEND_URL=http://localhost:4200   (FE sẽ nhận token qua query string)
 *
 * Thêm vào Google Cloud Console → Authorized redirect URIs:
 *   http://localhost:3000/auth/google/callback
 *
 * Cài thêm package:
 *   npm install passport passport-google-oauth20
 *   npm install -D @types/passport @types/passport-google-oauth20
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope:   ['profile', 'email'],
    session: false,
  })
);

/**
 * GET /auth/google/callback
 * Google redirect về đây sau khi user đồng ý.
 * BE đổi code → profile → tạo/lấy account → redirect FE kèm token.
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth` }),
  async (req: Request, res: Response) => {
    const profile = req.user as unknown as Profile;

    const providerUid = profile.id;
    const email       = profile.emails?.[0]?.value;
    const fullName    = profile.displayName;

    try {
      const result = await oauthLogin({ provider: 'GOOGLE', providerUid, email, fullName });

      // Redirect FE kèm token trong query string
      // FE đọc params, lưu vào memory/state rồi xoá khỏi URL
      const redirectUrl = new URL(`${process.env.FRONTEND_URL}/oauth/callback`);
      redirectUrl.searchParams.set('accessToken',  result.accessToken);
      redirectUrl.searchParams.set('refreshToken', result.refreshToken);
      redirectUrl.searchParams.set('clientId',     result.clientId);
      redirectUrl.searchParams.set('isNew',        String(result.isNew));

      res.redirect(redirectUrl.toString());
    } catch {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
    }
  }
);

// ─── GET /auth/me ─────────────────────────────────────────────────────────────
/**
 * Lấy thông tin user từ Access Token.
 * Header: Authorization: Bearer <accessToken>
 * Response 200: { user }
 */
router.get(
  '/me',
  (req: Request, res: Response, next: NextFunction) => authenticate(req as AuthRequest, res, next),
  (req: Request, res: Response) => {
    res.status(200).json({ user: (req as AuthRequest).user });
  }
);

export default router;