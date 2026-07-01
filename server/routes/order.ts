import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createOrder, getUserOrders, getOrderDetail, getUserAddresses, cancelOrder } from '../services/order.service';

const router = Router();
router.use(authenticate as any);

router.get('/', async (req, res) => {
  const orders = await getUserOrders(req.user!.clientId);
  res.json({ success: true, data: orders });
});

router.get('/addresses', async (req, res) => {
  const addresses = await getUserAddresses(req.user!.clientId);
  res.json({ success: true, data: addresses });
});

router.get('/:id', async (req, res) => {
  const order = await getOrderDetail(req.params['id'], req.user!.clientId);
  if (!order) { res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' }); return; }
  res.json({ success: true, data: order });
});

const PAYMENT_METHOD_MAP: Record<string, 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD'> = {
  cod:     'CASH',
  bank:    'BANK_TRANSFER',
  ewallet: 'BANK_TRANSFER',
  card:    'CREDIT_CARD',
};

router.post('/', async (req, res) => {
  const { items, address, discount_amount, customer_voucher_id, note, payment_method } = req.body;
  if (!items?.length || !address) {
    res.status(400).json({ success: false, message: 'Thiếu items hoặc địa chỉ' });
    return;
  }
  const dbMethod = PAYMENT_METHOD_MAP[payment_method] ?? 'CASH';
  const { orderId, expiresAt } = await createOrder({
    clientId: req.user!.clientId,
    payment_method: dbMethod,
    items, address, discount_amount, customer_voucher_id, note,
  });
  res.status(201).json({ success: true, data: { order_id: orderId, payment_expires_at: expiresAt } });
});

router.patch('/:id/cancel', async (req, res) => {
  try {
    const reason = (req.body?.reason as string) ?? 'Khách yêu cầu hủy';
    const result = await cancelOrder(req.params['id'], req.user!.clientId, reason);
    res.json({ success: true, data: result });
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    res.status(status).json({ success: false, message: err?.message ?? 'Lỗi máy chủ nội bộ.' });
  }
});

export default router;
