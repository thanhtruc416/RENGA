import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getDesigners, getAvailableSlots, createAppointment, getUserAppointments, cancelAppointment } from '../services/design.service';
import { cancelUnpaidAppointments } from '../jobs/appointment-cancel.job';
import { checkAndSendAppointmentConfirmedEmails } from '../services/notification.service';

const router = Router();

router.get('/designers', async (_req, res) => {
  try {
    const data = await getDesigners();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/appointments', authenticate as any, async (req, res) => {
  try {
    await cancelUnpaidAppointments();
    // Dormant cho tới khi có luồng admin xác nhận lịch hẹn thật (xem notification.service.ts)
    checkAndSendAppointmentConfirmedEmails().catch(err => console.error('[notification] checkAndSendAppointmentConfirmedEmails lỗi:', err));
    const data = await getUserAppointments(req.user!.clientId);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/slots', async (req, res) => {
  const { designerId, date } = req.query as { designerId: string; date: string };
  if (!designerId || !date) {
    res.status(400).json({ success: false, message: 'Thiếu designerId hoặc date' });
    return;
  }
  try {
    const data = await getAvailableSlots(designerId, date);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/appointments', authenticate as any, async (req, res) => {
  const { slotId, ideaDescription, consultationFee } = req.body;
  if (!slotId || !consultationFee) {
    res.status(400).json({ success: false, message: 'Thiếu slotId hoặc consultationFee' });
    return;
  }
  try {
    const appointmentId = await createAppointment({
      clientId: req.user!.clientId,
      slotId, ideaDescription, consultationFee,
    });
    res.status(201).json({ success: true, data: { appointment_id: appointmentId } });
  } catch (err: any) {
    res.status(409).json({ success: false, message: err.message ?? 'Không thể đặt lịch' });
  }
});

router.patch('/appointments/:id/cancel', authenticate as any, async (req, res) => {
  const { id } = req.params as { id: string };
  const { reason } = req.body as { reason?: string };
  try {
    const { refundPct, refundAmount } = await cancelAppointment(id, req.user!.clientId, reason ?? '');
    res.json({ success: true, data: { refundPct, refundAmount } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
