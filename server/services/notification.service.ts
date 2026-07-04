import pool from '../db';
import { sendMail } from './mailer.service';

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

interface RecordNotificationPayload {
  clientId: string;
  notificationType: string;
  channel: 'EMAIL' | 'SMS' | 'IN_APP';
  title: string;
  content: string;
  referenceId?: string | null;
  referenceType?: 'ORDER' | 'APPOINTMENT' | 'WARRANTY' | 'REFUND' | null;
  status: 'PENDING' | 'SENT' | 'FAILED';
}

async function recordNotification(payload: RecordNotificationPayload): Promise<void> {
  const id = await nextId('NOT', 'notification', 'notification_id');
  await pool.execute(
    `INSERT INTO notification
       (notification_id, client_id, notification_type, channel, title, content, reference_id, reference_type, status, sent_at, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,NOW())`,
    [id, payload.clientId, payload.notificationType, payload.channel, payload.title, payload.content,
      payload.referenceId ?? null, payload.referenceType ?? null, payload.status,
      payload.status === 'SENT' ? new Date() : null]
  );
}

// Scenario 2 (trigger trực tiếp): gửi mail thông báo hủy đơn — gọi ngay sau khi
// cancelOrder() commit thành công. Lỗi gửi mail không được chặn luồng hủy đơn
// (khách vẫn hủy thành công dù mail lỗi) — chỉ log + ghi FAILED vào notification.
export async function notifyOrderCancelled(
  orderId: string, clientId: string, reason: string, refundAmount: number,
): Promise<void> {
  const [[row]] = await pool.execute<any[]>(
    `SELECT c.email, cu.full_name FROM client c JOIN customer cu ON cu.client_id = c.client_id WHERE c.client_id = ?`,
    [clientId]
  );
  if (!row?.email) return; // khách vãng lai/không có email — bỏ qua, không phải lỗi

  const subject = 'Thông báo: Đơn hàng của bạn đã được hủy thành công';
  const html = `
    <h3>Chào ${row.full_name},</h3>
    <p>Yêu cầu hủy đơn hàng <b>#${orderId}</b> của bạn đã được xử lý.</p>
    <p><b>Lý do:</b> ${reason}</p>
    <p><b>Số tiền hoàn trả:</b> ${refundAmount.toLocaleString('vi-VN')} VND.</p>
    <p>Tiền hoàn trả sẽ được xử lý về tài khoản của bạn trong vòng 3-5 ngày làm việc.</p>
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMail(row.email, subject, html);
  } catch (err) {
    console.error(`[notification] Gửi mail hủy đơn ${orderId} thất bại:`, err);
    status = 'FAILED';
  }

  await recordNotification({
    clientId, notificationType: 'CANCEL_RESULT', channel: 'EMAIL',
    title: subject, content: `Thông báo hủy đơn #${orderId}, hoàn ${refundAmount}đ`,
    referenceId: orderId, referenceType: 'ORDER', status,
  });
}

// Scenario 3 (trigger trực tiếp): gửi mail xác nhận đặt hàng thành công — gọi ngay
// sau khi createOrder()/createStudioOrder() commit thành công. App hiện chưa có
// cổng thanh toán thật (payment_status luôn PENDING chờ xác nhận thủ công/COD) nên
// đây là "đặt hàng thành công", không phải "đã trừ tiền thành công".
export async function notifyOrderPlaced(
  orderId: string, clientId: string, totalAmount: number, orderTypeLabel: string,
): Promise<void> {
  const [[row]] = await pool.execute<any[]>(
    `SELECT c.email, cu.full_name FROM client c JOIN customer cu ON cu.client_id = c.client_id WHERE c.client_id = ?`,
    [clientId]
  );
  if (!row?.email) return;

  const subject = 'Xác nhận đặt hàng thành công tại RENGA';
  const html = `
    <h3>Chào ${row.full_name},</h3>
    <p>Cảm ơn bạn đã đặt hàng tại RENGA! Đơn hàng của bạn đã được ghi nhận thành công.</p>
    <p><b>Thông tin đơn hàng:</b></p>
    <ul>
      <li>Mã đơn hàng: #${orderId}</li>
      <li>Loại đơn: ${orderTypeLabel}</li>
      <li>Tổng giá trị: ${totalAmount.toLocaleString('vi-VN')} VND</li>
    </ul>
    <p>Chúng tôi sẽ sớm liên hệ để xác nhận và xử lý đơn hàng của bạn.</p>
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMail(row.email, subject, html);
  } catch (err) {
    console.error(`[notification] Gửi mail xác nhận đơn hàng ${orderId} thất bại:`, err);
    status = 'FAILED';
  }

  await recordNotification({
    clientId, notificationType: 'ORDER_CONFIRMED', channel: 'EMAIL',
    title: subject, content: `Đã gửi email xác nhận đặt hàng #${orderId}`,
    referenceId: orderId, referenceType: 'ORDER', status,
  });
}

// Scenario 1 (quét theo điều kiện, giống script gốc): appointment_status hiện tại
// không bao giờ chuyển thành 'CONFIRMED' trong codebase (chưa có luồng admin xác
// nhận lịch hẹn thật) — hàm này coi như dormant cho tới khi luồng đó được xây,
// gọi lazy mỗi lần load danh sách lịch hẹn (giống cancelExpiredOrders()).
export async function checkAndSendAppointmentConfirmedEmails(): Promise<void> {
  const [rows] = await pool.execute<any[]>(`
    SELECT a.appointment_id, a.client_id, a.consultation_fee, s.slot_date, s.start_time,
           c.email, cu.full_name
    FROM appointment a
    JOIN appointment_slot s ON s.slot_id = a.slot_id
    JOIN client c ON c.client_id = a.client_id
    JOIN customer cu ON cu.client_id = a.client_id
    WHERE a.appointment_status = 'CONFIRMED' AND a.payment_status = 'PAID'
      AND a.appointment_id NOT IN (
        SELECT reference_id FROM notification
        WHERE reference_type = 'APPOINTMENT' AND notification_type = 'APPOINTMENT_CONFIRMED' AND status = 'SENT'
      )
  `);

  for (const appt of rows as any[]) {
    if (!appt.email) continue;

    const subject = 'Xác nhận lịch hẹn thành công (Đã thanh toán)';
    const html = `
      <h3>Chào ${appt.full_name},</h3>
      <p>Hệ thống RENGA đã nhận được thanh toán <b>${Number(appt.consultation_fee).toLocaleString('vi-VN')} VND</b> cho phí tư vấn lịch hẹn của bạn.</p>
      <p><b>Thông tin lịch hẹn:</b></p>
      <ul>
        <li>Mã lịch hẹn: #${appt.appointment_id}</li>
        <li>Ngày hẹn: ${appt.slot_date}</li>
        <li>Thời gian bắt đầu: ${appt.start_time}</li>
      </ul>
      <p>Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi!</p>
    `;

    let status: 'SENT' | 'FAILED' = 'SENT';
    try {
      await sendMail(appt.email, subject, html);
    } catch (err) {
      console.error(`[notification] Gửi mail xác nhận lịch hẹn ${appt.appointment_id} thất bại:`, err);
      status = 'FAILED';
    }

    await recordNotification({
      clientId: appt.client_id, notificationType: 'APPOINTMENT_CONFIRMED', channel: 'EMAIL',
      title: subject, content: `Đã gửi email xác nhận lịch hẹn #${appt.appointment_id}`,
      referenceId: appt.appointment_id, referenceType: 'APPOINTMENT', status,
    });
  }
}
