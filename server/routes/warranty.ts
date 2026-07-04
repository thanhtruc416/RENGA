import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  createWarrantyRequest, getUserWarrantyRequests, createReturnRequest,
} from '../services/warranty.service';

const router = Router();
router.use(authenticate as any);

router.get('/', async (req, res) => {
  const data = await getUserWarrantyRequests(req.user!.clientId);
  res.json({ success: true, data });
});

router.post('/', async (req, res) => {
  const { orderId, issueDescription, evidenceImages } = req.body;
  if (!orderId || !issueDescription) {
    res.status(400).json({ success: false, message: 'Thiếu orderId hoặc mô tả lỗi' });
    return;
  }
  try {
    const warrantyId = await createWarrantyRequest({
      clientId: req.user!.clientId,
      orderId, issueDescription, evidenceImages,
    });
    res.status(201).json({ success: true, data: { warranty_id: warrantyId } });
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    res.status(status).json({ success: false, message: err?.message ?? 'Lỗi máy chủ nội bộ.' });
  }
});

router.post('/return', async (req, res) => {
  const { orderId, issueDescription, evidenceImages } = req.body;
  if (!orderId || !issueDescription) {
    res.status(400).json({ success: false, message: 'Thiếu orderId hoặc lý do trả hàng' });
    return;
  }
  try {
    const warrantyId = await createReturnRequest({
      clientId: req.user!.clientId,
      orderId, issueDescription, evidenceImages,
    });
    res.status(201).json({ success: true, data: { warranty_id: warrantyId } });
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    res.status(status).json({ success: false, message: err?.message ?? 'Lỗi máy chủ nội bộ.' });
  }
});

export default router;
