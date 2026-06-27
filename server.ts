process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

import authRoutes from './server/routes/auth';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
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

app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.path}`, JSON.stringify(req.body).slice(0, 200));
  next();
});

app.use('/api/auth', authRoutes);

console.log('Routes mounted: /api/auth');

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[GLOBAL ERROR]', err);
  res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

export default app;

process.stdin.resume(); // giữ process sống