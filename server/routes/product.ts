import { Router, Request, Response } from 'express';
import { getProducts, getProductById } from '../services/product.service';

const router = Router();

// Ảnh nhẫn TRYON (CDN của PNJ) không gửi header CORS, nên trình duyệt không thể
// vẽ lên <canvas> rồi xuất ảnh (toBlob/toDataURL) cho tính năng "chụp ảnh" ở AR
// thử nhẫn — proxy qua server để trả về same-origin, né CORS hoàn toàn.
const ALLOWED_IMAGE_HOSTS = ['cdn.pnj.io'];

router.get('/image-proxy', async (req: Request, res: Response) => {
  const url = req.query['url'] as string | undefined;
  if (!url) { res.status(400).json({ message: 'Thiếu url' }); return; }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    res.status(400).json({ message: 'url không hợp lệ' });
    return;
  }
  if (!ALLOWED_IMAGE_HOSTS.includes(parsed.hostname)) {
    res.status(400).json({ message: 'Domain ảnh không được phép' });
    return;
  }

  try {
    const upstream = await fetch(parsed.toString());
    if (!upstream.ok) { res.status(upstream.status).end(); return; }
    res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch {
    res.status(502).json({ message: 'Không tải được ảnh gốc' });
  }
});

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
