import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import productRouter from './server/routes/product';
import authRouter    from './server/routes/auth';
import cartRouter    from './server/routes/cart';
import orderRouter   from './server/routes/order';
import voucherRouter from './server/routes/voucher';
import studioRouter  from './server/routes/studio';
import designRouter   from './server/routes/design';
import accountRouter  from './server/routes/account';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/auth',     authRouter);
app.use('/api/cart',     cartRouter);
app.use('/api/orders',   orderRouter);
app.use('/api/vouchers', voucherRouter);
app.use('/api/studio',   studioRouter);
app.use('/api/design',   designRouter);
app.use('/api/account',  accountRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
export default app;
