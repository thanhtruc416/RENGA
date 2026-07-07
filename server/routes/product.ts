import { Router, Request, Response } from 'express';
import { getProducts, getProductById } from '../services/product.service';

const router = Router();

// GET /api/products?category=nhan&page=1&limit=12&q=nhẫn
router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query['category'] as string | undefined;
    const q        = req.query['q'] as string | undefined;
    const page     = Number(req.query['page'])  || 1;
    const limit    = Number(req.query['limit']) || 12;
    const data = await getProducts(category, page, limit, q);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
});

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params['id'] as string);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
});

export default router;
