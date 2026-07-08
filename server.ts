import dns from 'dns';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config({ quiet: true });

// Một số nền tảng hosting (vd Railway) không route được IPv6 ra ngoài, trong khi
// nhiều DNS (Gmail SMTP...) trả về địa chỉ IPv6 trước — ép ưu tiên IPv4 toàn cục
// để tránh ENETUNREACH khi kết nối ra ngoài.
dns.setDefaultResultOrder('ipv4first');

import productRouter from './server/routes/product';
import authRouter    from './server/routes/auth';
import cartRouter    from './server/routes/cart';
import orderRouter   from './server/routes/order';
import voucherRouter from './server/routes/voucher';
import studioRouter  from './server/routes/studio';
import designRouter  from './server/routes/design';
import accountRouter from './server/routes/account';
import reviewRouter  from './server/routes/review';
import warrantyRouter from './server/routes/warranty';
import chatbotRouter  from './server/routes/chatbot';
import adminRouter    from './server/routes/admin';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      /^http:\/\/localhost(:\d+)?$/.test(origin) ||
      // renga-amber.vercel.app là domain ổn định; renga-<hash>-thanhtruc1.vercel.app
      // là domain riêng Vercel tự tạo cho mỗi bản deploy/preview — cho phép cả 2.
      /^https:\/\/renga(-[a-z0-9]+)*-thanhtruc1\.vercel\.app$/.test(origin) ||
      origin === 'https://renga-amber.vercel.app'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(passport.initialize());

app.use((req, _res, next) => {
  console.log(`>>> ${req.method} ${req.path}`, (JSON.stringify(req.body) ?? '').slice(0, 200));
  next();
});

app.use('/api/products', productRouter);
app.use('/api/auth',     authRouter);
app.use('/api/cart',     cartRouter);
app.use('/api/orders',   orderRouter);
app.use('/api/vouchers', voucherRouter);
app.use('/api/studio',   studioRouter);
app.use('/api/design',   designRouter);
app.use('/api/account',  accountRouter);
app.use('/api/reviews',  reviewRouter);
app.use('/api/warranty', warrantyRouter);
app.use('/api/chatbot',  chatbotRouter);
app.use('/api/admin',    adminRouter);

// Error handler — phải ở cuối cùng
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[GLOBAL ERROR]', err);
  res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

export default app;

process.stdin.resume();