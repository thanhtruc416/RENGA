import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getHomeReviews, getProductReviews, getReviewableItems, submitReview } from '../services/review.service';

const router = Router();

// GET /api/reviews/home?limit=8
router.get('/home', async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query['limit']) || 8;
    const reviews = await getHomeReviews(limit);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
});

// GET /api/reviews/product/:id?limit=20
router.get('/product/:id', async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query['limit']) || 20;
    const reviews = await getProductReviews(req.params['id'] as string, limit);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
});

// GET /api/reviews/reviewable — sản phẩm đủ điều kiện đánh giá của khách đang đăng nhập
router.get('/reviewable', authenticate, async (req: Request, res: Response) => {
  try {
    const items = await getReviewableItems(req.user!.clientId!);
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// POST /api/reviews — gửi đánh giá thật (BR-37: chỉ khách đã mua + nhận hàng)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { orderItemId, rating, content } = req.body;
    if (!orderItemId || !rating) {
      res.status(400).json({ success: false, message: 'Thiếu dữ liệu đánh giá.' });
      return;
    }
    const result = await submitReview({ orderItemId, clientId: req.user!.clientId!, rating, content });
    res.json({ success: true, data: result });
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    res.status(status).json({ success: false, message: err?.message ?? 'Lỗi server' });
  }
});

export default router;
