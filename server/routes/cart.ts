import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getCart, addCartItem, updateCartItem, removeCartItem, clearCart } from '../services/cart.service';

const router = Router();
router.use(authenticate as any);

router.get('/', async (req, res) => {
  // Token nhân viên/admin không có clientId (không phải khách hàng) — trả giỏ rỗng
  // thay vì lỗi, vì header dùng chung component hiện cả cho trang admin.
  if (!req.user!.clientId) {
    res.json({ success: true, data: { cart_id: null, items: [] } });
    return;
  }
  const data = await getCart(req.user!.clientId);
  res.json({ success: true, data });
});

router.post('/items', async (req, res) => {
  const { variant_id, quantity = 1, unit_price } = req.body;
  if (!variant_id || !unit_price) {
    res.status(400).json({ success: false, message: 'Thiếu variant_id hoặc unit_price' });
    return;
  }
  const id = await addCartItem(req.user!.clientId, { variant_id, quantity, unit_price });
  res.json({ success: true, data: { cart_item_id: id } });
});

router.patch('/items/:id', async (req, res) => {
  const { quantity } = req.body;
  await updateCartItem(req.params['id'], req.user!.clientId, Number(quantity));
  res.json({ success: true });
});

router.delete('/items/:id', async (req, res) => {
  await removeCartItem(req.params['id'], req.user!.clientId);
  res.json({ success: true });
});

router.delete('/clear', async (req, res) => {
  await clearCart(req.user!.clientId);
  res.json({ success: true });
});

export default router;
