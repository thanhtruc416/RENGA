import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { createOrder, getUserOrders, getOrderDetail, getUserAddresses } from '../services/order.service';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const orders = await getUserOrders(req.user!.client_id);
  res.json({ success: true, data: orders });
});

router.get('/addresses', async (req, res) => {
  const addresses = await getUserAddresses(req.user!.client_id);
  res.json({ success: true, data: addresses });
});

router.get('/:id', async (req, res) => {
  const order = await getOrderDetail(req.params['id'], req.user!.client_id);
  if (!order) { res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' }); return; }
  res.json({ success: true, data: order });
});

router.post('/', async (req, res) => {
  const { items, address, discount_amount, customer_voucher_id, note } = req.body;
  if (!items?.length || !address) {
    res.status(400).json({ success: false, message: 'Thiếu items hoặc địa chỉ' });
    return;
  }
  const orderId = await createOrder({
    clientId: req.user!.client_id,
    items, address, discount_amount, customer_voucher_id, note,
  });
  res.status(201).json({ success: true, data: { order_id: orderId } });
});

export default router;
