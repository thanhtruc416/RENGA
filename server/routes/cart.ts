import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  getCart, addCartItem, updateCartItem, removeCartItem, removeCartItems, clearCart, addStudioCartItem,
  getStudioCartItemDetail,
} from '../services/cart.service';

const router = Router();
router.use(authenticate as any);

function handleError(err: any, res: Response): void {
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message ?? 'Lỗi máy chủ nội bộ.';
  if (status === 500) console.error('[cart] Lỗi 500:', err);
  res.status(status).json({ success: false, message, maxQuantity: err?.maxQuantity });
}

router.get('/', async (req: Request, res: Response) => {
  // Token nhân viên/admin không có clientId (không phải khách hàng) — trả giỏ rỗng
  // thay vì lỗi, vì header dùng chung component hiện cả cho trang admin.
  if (!req.user!.clientId) {
    res.json({ success: true, data: { cart_id: null, items: [], customItems: [] } });
    return;
  }
  const data = await getCart(req.user!.clientId);
  res.json({ success: true, data });
});

router.post('/items', async (req: Request, res: Response) => {
  const { variant_id, quantity = 1, unit_price } = req.body;
  if (!variant_id || !unit_price) {
    res.status(400).json({ success: false, message: 'Thiếu variant_id hoặc unit_price' });
    return;
  }
  try {
    const id = await addCartItem(req.user!.clientId, { variant_id, quantity, unit_price });
    res.json({ success: true, data: { cart_item_id: id } });
  } catch (err) {
    handleError(err, res);
  }
});

// CART-02: lưu thiết kế Studio vào giỏ hàng thật (bảng customization, status='DRAFT')
// thay vì chỉ giữ trong bộ nhớ tạm của trình duyệt.
router.post('/studio-items', async (req: Request, res: Response) => {
  if (!req.user!.clientId) {
    res.status(403).json({ success: false, message: 'Chỉ tài khoản khách hàng mới lưu được thiết kế.' });
    return;
  }
  try {
    const id = await addStudioCartItem(req.user!.clientId, req.body);
    res.json({ success: true, data: { cart_item_id: id } });
  } catch (err) {
    handleError(err, res);
  }
});

// CART-02: chi tiết 1 thiết kế Studio đang DRAFT trong giỏ, dùng cho "Tiếp tục thiết kế".
router.get('/studio-items/:id', async (req: Request, res: Response) => {
  if (!req.user!.clientId) {
    res.status(403).json({ success: false, message: 'Chỉ tài khoản khách hàng mới có thiết kế đã lưu.' });
    return;
  }
  try {
    const data = await getStudioCartItemDetail(req.params['id'] as string, req.user!.clientId);
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/items/:id', async (req: Request, res: Response) => {
  const { quantity } = req.body;
  try {
    await updateCartItem(req.params['id'] as string, req.user!.clientId, Number(quantity));
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/items/:id', async (req: Request, res: Response) => {
  await removeCartItem(req.params['id'] as string, req.user!.clientId);
  res.json({ success: true });
});

// CART-05: xoá nhiều item đã chọn cùng lúc.
router.post('/items/bulk-delete', async (req: Request, res: Response) => {
  const ids = req.body?.ids as string[] | undefined;
  if (!Array.isArray(ids) || !ids.length) {
    res.status(400).json({ success: false, message: 'Thiếu danh sách item cần xoá.' });
    return;
  }
  await removeCartItems(ids, req.user!.clientId);
  res.json({ success: true });
});

router.delete('/clear', async (req: Request, res: Response) => {
  await clearCart(req.user!.clientId);
  res.json({ success: true });
});

export default router;
