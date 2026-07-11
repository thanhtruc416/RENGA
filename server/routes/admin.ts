import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getAdminProducts, getAdminProductById, createAdminProduct, updateAdminProduct, softDeleteAdminProduct, getCategories,
} from '../services/admin-product.service';
import {
  getAdminOrders, getAdminOrderDetail, updateAdminOrderStatus,
} from '../services/admin-order.service';
import { getDashboardStats } from '../services/admin-dashboard.service';
import {
  getAdminAppointments, getAdminAppointmentDetail, updateAppointmentStatus, reassignAppointmentSlot,
} from '../services/admin-appointment.service';
import { getDesigners, getAvailableSlots } from '../services/design.service';
import {
  getAdminWarrantyRequests, getAdminWarrantyDetail, getWarrantyStats, updateWarrantyStatus, sendWarrantyQuote,
} from '../services/admin-warranty.service';
import {
  getAdminVouchers, getAdminVoucherDetail, createAdminVoucher, updateAdminVoucher,
} from '../services/admin-voucher.service';
import {
  getAdminQuestions, getQaStats, replyToQuestion, setQuestionVisibility,
} from '../services/admin-qa.service';
import {
  getAdminReviews, setReviewVisibility, replyToReview,
} from '../services/admin-review.service';
import { getAdminFaqs, createFaq, updateFaq } from '../services/admin-faq.service';
import {
  getAdminCancellationRequests, approveCancellationRequest, rejectCancellationRequest,
} from '../services/admin-cancellation.service';

const router = Router();
router.use(authenticate as any, requireRole('ADMIN'));

function handleError(err: any, res: Response): void {
  const status  = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message ?? 'Lỗi máy chủ nội bộ.';
  if (status === 500) console.error('[admin] Lỗi 500:', err);
  res.status(status).json({ success: false, message });
}

// ── Dashboard ────────────────────────────────────────────────────────────────

router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const data = await getDashboardStats();
    // ADM-01: doanh số chỉ Super Admin mới được xem — nhân viên thường (STAFF) vẫn
    // vào được dashboard bình thường nhưng không thấy tổng doanh thu.
    if (req.user!.adminRole !== 'SUPER_ADMIN') {
      const { totalRevenue, ...rest } = data;
      res.json({ success: true, data: rest });
      return;
    }
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Sản phẩm ─────────────────────────────────────────────────────────────────

router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const data = await getCategories();
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/products', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const search   = req.query['search'] as string | undefined;
    const status   = req.query['status'] as string | undefined;
    const category = req.query['category'] as string | undefined;
    const data = await getAdminProducts(page, limit, search, status, category);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await getAdminProductById(req.params['id'] as string);
    if (!product) { res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' }); return; }
    res.json({ success: true, data: product });
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/products', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    const result = await createAdminProduct(req.body, employeeId);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/products/:id', async (req: Request, res: Response) => {
  try {
    await updateAdminProduct(req.params['id'] as string, req.body);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    await softDeleteAdminProduct(req.params['id'] as string);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Đơn hàng ─────────────────────────────────────────────────────────────────

router.get('/orders', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const status = req.query['status'] as string | undefined;
    const type   = req.query['type'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const data = await getAdminOrders(page, limit, status, type, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/orders/:id', async (req: Request, res: Response) => {
  try {
    const order = await getAdminOrderDetail(req.params['id'] as string);
    if (!order) { res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng.' }); return; }
    res.json({ success: true, data: order });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/orders/:id/status', async (req: Request, res: Response) => {
  try {
    await updateAdminOrderStatus(req.params['id'] as string, req.body?.status, req.user!.employeeId);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Lịch hẹn tư vấn ──────────────────────────────────────────────────────────

router.get('/designers', async (_req: Request, res: Response) => {
  try {
    const data = await getDesigners();
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/designer-slots', async (req: Request, res: Response) => {
  try {
    const designerId = req.query['designerId'] as string;
    const date = req.query['date'] as string;
    if (!designerId || !date) { res.status(400).json({ success: false, message: 'Thiếu designerId hoặc date.' }); return; }
    const data = await getAvailableSlots(designerId, date);
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/appointments', async (req: Request, res: Response) => {
  try {
    const page       = Number(req.query['page'])  || 1;
    const limit      = Number(req.query['limit']) || 20;
    const status     = req.query['status'] as string | undefined;
    const designerId = req.query['designerId'] as string | undefined;
    const dateFrom   = req.query['dateFrom'] as string | undefined;
    const dateTo     = req.query['dateTo'] as string | undefined;
    const search     = req.query['search'] as string | undefined;
    const data = await getAdminAppointments(page, limit, status, designerId, dateFrom, dateTo, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/appointments/:id', async (req: Request, res: Response) => {
  try {
    const appt = await getAdminAppointmentDetail(req.params['id'] as string);
    if (!appt) { res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn.' }); return; }
    res.json({ success: true, data: appt });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/appointments/:id/status', async (req: Request, res: Response) => {
  try {
    await updateAppointmentStatus(req.params['id'] as string, req.body?.status);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/appointments/:id/reassign', async (req: Request, res: Response) => {
  try {
    await reassignAppointmentSlot(req.params['id'] as string, req.body?.slotId);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Bảo hành ─────────────────────────────────────────────────────────────────

router.get('/warranty-stats', async (_req: Request, res: Response) => {
  try {
    const data = await getWarrantyStats();
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/warranty-requests', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const status = req.query['status'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const data = await getAdminWarrantyRequests(page, limit, status, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/warranty-requests/:id', async (req: Request, res: Response) => {
  try {
    const data = await getAdminWarrantyDetail(req.params['id'] as string);
    if (!data) { res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu bảo hành.' }); return; }
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/warranty-requests/:id/status', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    await updateWarrantyStatus(req.params['id'] as string, req.body?.status, employeeId, req.body?.rejectionReason);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/warranty-requests/:id/quote', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    const estimatedCost = Number(req.body?.estimatedCost);
    await sendWarrantyQuote(req.params['id'] as string, employeeId, estimatedCost, req.body?.estimatedTime);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Voucher ──────────────────────────────────────────────────────────────────

router.get('/vouchers', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const status = req.query['status'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const data = await getAdminVouchers(page, limit, status, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/vouchers/:id', async (req: Request, res: Response) => {
  try {
    const data = await getAdminVoucherDetail(req.params['id'] as string);
    if (!data) { res.status(404).json({ success: false, message: 'Không tìm thấy voucher.' }); return; }
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/vouchers', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    const voucherId = await createAdminVoucher(req.body, employeeId);
    res.status(201).json({ success: true, data: { voucherId } });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/vouchers/:id', async (req: Request, res: Response) => {
  try {
    await updateAdminVoucher(req.params['id'] as string, req.body);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Hỏi-đáp sản phẩm ─────────────────────────────────────────────────────────

router.get('/questions/stats', async (_req: Request, res: Response) => {
  try {
    const data = await getQaStats();
    res.json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/questions', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const status = req.query['status'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const data = await getAdminQuestions(page, limit, status, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/questions/:id/reply', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    await replyToQuestion(req.params['id'] as string, req.body?.replyContent, employeeId);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/questions/:id/visibility', async (req: Request, res: Response) => {
  try {
    await setQuestionVisibility(req.params['id'] as string, req.body?.visibility);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Đánh giá sản phẩm ────────────────────────────────────────────────────────

router.get('/reviews', async (req: Request, res: Response) => {
  try {
    const page       = Number(req.query['page'])  || 1;
    const limit      = Number(req.query['limit']) || 20;
    const visibility = req.query['visibility'] as string | undefined;
    const search     = req.query['search'] as string | undefined;
    const data = await getAdminReviews(page, limit, visibility, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/reviews/:id/visibility', async (req: Request, res: Response) => {
  try {
    await setReviewVisibility(req.params['id'] as string, req.body?.visibility);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/reviews/:id/reply', async (req: Request, res: Response) => {
  try {
    await replyToReview(req.params['id'] as string, req.body?.replyContent);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── FAQ chatbot ──────────────────────────────────────────────────────────────

router.get('/faqs', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const topic  = req.query['topic'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const data = await getAdminFaqs(page, limit, topic, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/faqs', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    const faqId = await createFaq(req.body, employeeId);
    res.status(201).json({ success: true, data: { faqId } });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/faqs/:id', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    await updateFaq(req.params['id'] as string, req.body, employeeId);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

// ── Yêu cầu hủy/hoàn đơn hàng ────────────────────────────────────────────────

router.get('/cancellation-requests', async (req: Request, res: Response) => {
  try {
    const page   = Number(req.query['page'])  || 1;
    const limit  = Number(req.query['limit']) || 20;
    const status = req.query['status'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const data = await getAdminCancellationRequests(page, limit, status, search);
    res.json({ success: true, ...data });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/cancellation-requests/:id/approve', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    await approveCancellationRequest(req.params['id'] as string, employeeId);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/cancellation-requests/:id/reject', async (req: Request, res: Response) => {
  try {
    const employeeId = req.user!.employeeId!;
    await rejectCancellationRequest(req.params['id'] as string, employeeId, req.body?.reason);
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
