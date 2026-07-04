import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getBlanks, createStudioOrder } from '../services/studio.service';

const router = Router();

router.get('/blanks', async (req, res) => {
  try {
    const data = await getBlanks();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', authenticate as any, async (req, res) => {
  const { customerVoucherId, blankId, materialId, stoneId, carat, engraveTextLength, address, note } = req.body;
  if (!address) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đơn hàng' });
    return;
  }
  try {
    const orderId = await createStudioOrder({
      clientId: req.user!.clientId,
      blankId, materialId, stoneId, carat, engraveTextLength, customerVoucherId, address, note,
    });
    res.status(201).json({ success: true, data: { order_id: orderId } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message ?? 'Lỗi tạo đơn hàng' });
  }
});

export default router;
