import { Router, Request, Response } from 'express';
import * as authService from '../services/auth.service';

const router = Router();

function handleError(err: any, res: Response): void {
  const status  = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message ?? 'Lỗi máy chủ nội bộ.';
  if (status === 500) console.error('[auth] Lỗi 500:', err);
  res.status(status).json({
    success: false,
    message,
    ...(err?.requireOtp         && { requireOtp:         true }),
    ...(err?.remainingAttempts !== undefined && { remainingAttempts: err.remainingAttempts }),
  });
}

// ── Đăng ký ────────────────────────────────────────────────────────────────

// POST /api/auth/register/send-otp
router.post('/register/send-otp', async (req: Request, res: Response) => {
  try {
    const result = await authService.registerSendOtp(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/register/verify-otp
router.post('/register/verify-otp', async (req: Request, res: Response) => {
  try {
    const { otp, ...data } = req.body;
    const result = await authService.registerVerifyOtp(data, otp, {
      device: req.headers['user-agent'],
      ip:     req.ip,
    });
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// GET /api/auth/register/check-guest?phone=xxx
router.get('/register/check-guest', async (req: Request, res: Response) => {
  try {
    const phone = req.query['phone'] as string;
    if (!phone) {
      res.status(400).json({ success: false, message: 'Thiếu số điện thoại.' });
      return;
    }
    const result = await authService.checkGuestByPhone(phone);
    res.json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/guest-checkout — cấp token tạm cho khách vãng lai để tạo đơn hàng thật
router.post('/guest-checkout', async (req: Request, res: Response) => {
  try {
    const { phone, email } = req.body;
    if (!phone) {
      res.status(400).json({ success: false, message: 'Thiếu số điện thoại.' });
      return;
    }
    const result = await authService.guestCheckout({ phone, email });
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Đăng nhập ──────────────────────────────────────────────────────────────

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    const result = await authService.loginCustomer(
      { identifier: phone, password },
      { device: req.headers['user-agent'], ip: req.ip },
    );
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Quên mật khẩu ──────────────────────────────────────────────────────────

// POST /api/auth/forgot-password/send-otp
router.post('/forgot-password/send-otp', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    const result = await authService.forgotPasswordSendOtp(phone);
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/forgot-password/verify-otp
router.post('/forgot-password/verify-otp', async (req: Request, res: Response) => {
  try {
    const result = await authService.forgotPasswordVerifyOtp(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/forgot-password/reset
router.post('/forgot-password/reset', async (req: Request, res: Response) => {
  try {
    await authService.resetPassword(req.body);
    res.json({ success: true, message: 'Đặt lại mật khẩu thành công.' });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Mở khoá tài khoản ──────────────────────────────────────────────────────

// POST /api/auth/login/unlock/send-otp
router.post('/login/unlock/send-otp', async (req: Request, res: Response) => {
  try {
    const { identifier } = req.body;
    const result = await authService.sendLoginLockOtp(identifier);
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/login/unlock/verify-otp
router.post('/login/unlock/verify-otp', async (req: Request, res: Response) => {
  try {
    await authService.verifyLoginLockOtp(req.body);
    res.json({ success: true, message: 'Mở khóa tài khoản thành công.' });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Token ──────────────────────────────────────────────────────────────────

// POST /api/auth/token/refresh
router.post('/token/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/logout
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) await authService.logout(refreshToken);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
