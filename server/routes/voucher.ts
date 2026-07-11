import { Router } from 'express';
import { authenticate, optionalAuthenticate } from '../middlewares/auth.middleware';
import { validateVoucher, getUserVouchers } from '../services/voucher.service';

const router = Router();

// POST /api/vouchers/validate — không bắt buộc đăng nhập, nhưng đọc token nếu có
// (để phân biệt khách vãng lai với khách đã đăng nhập — vd voucher NEWMEMBER chỉ
// dành cho khách đã đăng nhập, và để ràng buộc 1 tài khoản dùng 1 lần).
router.post('/validate', optionalAuthenticate as any, async (req, res) => {
  const { code, order_total } = req.body as { code: string; order_total: number };
  if (!code) { res.status(400).json({ success: false, message: 'Thiếu mã voucher' }); return; }

  // client_id tùy chọn — nếu có thì check voucher đã dùng chưa
  const clientId = req.user?.clientId;
  const result = await validateVoucher(code, order_total ?? 0, clientId);
  res.json(result);
});

// GET /api/vouchers/mine — cần đăng nhập
router.get('/mine', authenticate as any, async (req, res) => {
  const data = await getUserVouchers(req.user!.clientId);
  res.json({ success: true, data });
});

export default router;
