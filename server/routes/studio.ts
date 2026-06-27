import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
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

router.post('/', requireAuth, async (req, res) => {
  const { totalPrice, discountAmount, customerVoucherId, blankId, materialId, address, note } = req.body;
  if (!totalPrice || !address) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đơn hàng' });
    return;
  }
  try {
    const orderId = await createStudioOrder({
      clientId: req.user!.client_id,
      totalPrice, discountAmount, customerVoucherId, blankId, materialId, address, note,
    });
    res.status(201).json({ success: true, data: { order_id: orderId } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message ?? 'Lỗi tạo đơn hàng' });
  }
});

export default router;
