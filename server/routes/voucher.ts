import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { validateVoucher, getUserVouchers } from '../services/voucher.service';

const router = Router();

// POST /api/vouchers/validate — không cần đăng nhập
router.post('/validate', async (req, res) => {
  const { code, order_total } = req.body as { code: string; order_total: number };
  if (!code) { res.status(400).json({ success: false, message: 'Thiếu mã voucher' }); return; }

  // client_id tùy chọn — nếu có thì check voucher đã dùng chưa
  const clientId = (req as any).user?.client_id as string | undefined;
  const result = await validateVoucher(code, order_total ?? 0, clientId);
  res.json(result);
});

// GET /api/vouchers/mine — cần đăng nhập
router.get('/mine', requireAuth, async (req, res) => {
  const data = await getUserVouchers(req.user!.client_id);
  res.json({ success: true, data });
});

export default router;
