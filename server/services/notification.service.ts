import pool from '../db';
import { sendMailWithRetry } from './mailer.service';

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

// MAIL-04/06: email cho các thông báo gắn với 1 đơn cụ thể (xác nhận, huỷ...) — ưu
// tiên contact_email đã lưu trên địa chỉ của đơn đó (khách gõ lúc checkout, không
// phụ thuộc việc lưu vào hồ sơ tài khoản có bị trùng hay không), rồi mới tới email
// định danh của tài khoản (client.email) nếu đơn không có contact_email riêng.
async function resolveOrderEmail(orderId: string, clientId: string): Promise<{ email: string | null; fullName: string | null }> {
  const [[row]] = await pool.execute<any[]>(
    `SELECT COALESCE(a.contact_email, c.email) AS email, cu.full_name
     FROM \`order\` o
     JOIN address a ON a.address_id = o.address_id
     JOIN client c ON c.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = c.client_id
     WHERE o.order_id = ? AND o.client_id = ?`,
    [orderId, clientId]
  );
  return { email: row?.email ?? null, fullName: row?.full_name ?? null };
}

// MAIL-07/08/09: email cho thông báo KHÔNG gắn với 1 đơn cụ thể (lên hạng...) — ưu
// tiên client.email, nếu chưa có thì mượn tạm contact_email của đơn gần nhất khách
// từng đặt (cùng lý do resolveOrderEmail — email đã lưu ở đó không phụ thuộc việc
// lưu vào hồ sơ tài khoản có bị trùng với tài khoản khác hay không).
async function resolveClientEmail(clientId: string): Promise<{ email: string | null; fullName: string | null }> {
  const [[row]] = await pool.execute<any[]>(
    `SELECT c.email, cu.full_name FROM client c LEFT JOIN customer cu ON cu.client_id = c.client_id WHERE c.client_id = ?`,
    [clientId]
  );
  if (row?.email) return { email: row.email, fullName: row.full_name ?? null };

  const [[addrRow]] = await pool.execute<any[]>(
    `SELECT a.contact_email FROM \`order\` o JOIN address a ON a.address_id = o.address_id
     WHERE o.client_id = ? AND a.contact_email IS NOT NULL ORDER BY o.created_at DESC LIMIT 1`,
    [clientId]
  );
  return { email: addrRow?.contact_email ?? null, fullName: row?.full_name ?? null };
}

// Scenario 2 (trigger trực tiếp): gửi mail thông báo hủy đơn — gọi ngay sau khi
// cancelOrder() commit thành công. Lỗi gửi mail không được chặn luồng hủy đơn
// (khách vẫn hủy thành công dù mail lỗi) — chỉ log + ghi FAILED vào notification.
export async function notifyOrderCancelled(
  orderId: string, clientId: string, reason: string, refundAmount: number,
  wasPaidUpfront = true,
): Promise<void> {
  const { email, fullName } = await resolveOrderEmail(orderId, clientId);
  if (!email) return; // khách vãng lai/không có email — bỏ qua, không phải lỗi

  // COD chưa thu tiền trước (trả khi nhận hàng) nên huỷ đơn không có gì để hoàn —
  // trước đây luôn hiện dòng "hoàn tiền" bất kể phương thức, gây hiểu nhầm cho đơn COD.
  const refundHtml = wasPaidUpfront
    ? `
    <p><b>Số tiền hoàn trả:</b> ${refundAmount.toLocaleString('vi-VN')} VND.</p>
    <p>Tiền hoàn trả sẽ được xử lý về tài khoản của bạn trong vòng 3-5 ngày làm việc.</p>`
    : `<p>Đơn hàng thanh toán khi nhận hàng (COD) nên không phát sinh khoản hoàn trả nào.</p>`;

  const subject = 'Thông báo: Đơn hàng của bạn đã được hủy thành công';
  const html = `
    <h3>Chào ${fullName ?? 'quý khách'},</h3>
    <p>Yêu cầu hủy đơn hàng <b>#${orderId}</b> của bạn đã được xử lý.</p>
    <p><b>Lý do:</b> ${reason}</p>
    ${refundHtml}
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMailWithRetry(email, subject, html);
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

// ADM-05: gửi mail từ chối yêu cầu hủy đơn — gọi ngay sau khi admin từ chối
// (rejectCancellationRequest() commit thành công).
export async function notifyCancellationRejected(
  orderId: string, clientId: string, adminReason: string,
): Promise<void> {
  const { email, fullName } = await resolveOrderEmail(orderId, clientId);
  if (!email) return;

  const subject = 'RENGA đã xem xét yêu cầu hủy đơn hàng của bạn';
  const html = `
    <h3>Chào ${fullName ?? 'quý khách'},</h3>
    <p>Yêu cầu hủy đơn hàng <b>#${orderId}</b> của bạn đã được RENGA xem xét và <b>không thể chấp thuận</b>.</p>
    <p><b>Lý do:</b> ${adminReason}</p>
    <p>Đơn hàng của bạn sẽ tiếp tục được xử lý và giao đến bạn theo tiến độ hiện tại. Nếu có thắc mắc, vui lòng liên hệ hotline hoặc email hỗ trợ của RENGA.</p>
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMailWithRetry(email, subject, html);
  } catch (err) {
    console.error(`[notification] Gửi mail từ chối hủy đơn ${orderId} thất bại:`, err);
    status = 'FAILED';
  }

  await recordNotification({
    clientId, notificationType: 'CANCEL_RESULT', channel: 'EMAIL',
    title: subject, content: `Từ chối yêu cầu hủy đơn #${orderId}: ${adminReason}`,
    referenceId: orderId, referenceType: 'ORDER', status,
  });
}

// WAR-02: gửi mail báo giá sửa chữa cho khách — gọi ngay sau khi nhân viên gửi báo giá
// (sendWarrantyQuote() commit thành công). Lỗi gửi mail không chặn luồng gửi báo giá.
export async function notifyWarrantyQuoted(
  warrantyId: string, estimatedCost: number, estimatedTime: string,
): Promise<void> {
  const [[row]] = await pool.execute<any[]>(
    `SELECT c.client_id, c.email, cu.full_name
     FROM warranty_request w
     JOIN \`order\` o ON o.order_id = w.order_id
     JOIN client c ON c.client_id = o.client_id
     LEFT JOIN customer cu ON cu.client_id = c.client_id
     WHERE w.warranty_id = ?`,
    [warrantyId]
  );
  if (!row?.email) return;

  const subject = 'RENGA đã gửi báo giá sửa chữa cho yêu cầu bảo hành của bạn';
  const html = `
    <h3>Chào ${row.full_name ?? 'quý khách'},</h3>
    <p>Yêu cầu bảo hành/sửa chữa <b>#${warrantyId}</b> của bạn đã được RENGA xem xét và gửi báo giá:</p>
    <p><b>Chi phí dự kiến:</b> ${estimatedCost.toLocaleString('vi-VN')} VND</p>
    <p><b>Thời gian hoàn thành dự kiến:</b> ${estimatedTime}</p>
    <p>Vui lòng đăng nhập vào tài khoản RENGA để xác nhận Đồng ý hoặc Từ chối báo giá này.</p>
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMailWithRetry(row.email, subject, html);
  } catch (err) {
    console.error(`[notification] Gửi mail báo giá bảo hành ${warrantyId} thất bại:`, err);
    status = 'FAILED';
  }

  await recordNotification({
    clientId: row.client_id, notificationType: 'REPAIR_QUOTE_ISSUED', channel: 'EMAIL',
    title: subject, content: `Báo giá sửa chữa ${warrantyId}: ${estimatedCost.toLocaleString('vi-VN')}đ, ${estimatedTime}`,
    referenceId: warrantyId, referenceType: 'WARRANTY', status,
  });
}

// Scenario 3 (trigger trực tiếp): gửi mail xác nhận đặt hàng thành công — gọi ngay
// sau khi createOrder()/createStudioOrder() commit thành công. App hiện chưa có
// cổng thanh toán thật (payment_status luôn PENDING chờ xác nhận thủ công/COD) nên
// đây là "đặt hàng thành công", không phải "đã trừ tiền thành công".
export async function notifyOrderPlaced(
  orderId: string, clientId: string, totalAmount: number, orderTypeLabel: string,
): Promise<void> {
  // ORD-05/MAIL-01: ưu tiên contact_email lưu riêng cho đơn này (khách gõ lúc
  // checkout, không phụ thuộc việc lưu vào hồ sơ tài khoản có bị trùng email với
  // tài khoản khác hay không — xem resolveOrderEmail), rồi mới tới client.email.
  const { email: recipientEmail, fullName } = await resolveOrderEmail(orderId, clientId);
  if (!recipientEmail) return;

  // MAIL-11: chặn gửi trùng nếu hàm này lỡ được gọi 2 lần cho cùng 1 đơn (vd sự kiện
  // xác nhận thanh toán bị báo lặp từ cổng thanh toán trong tương lai).
  const [[existing]] = await pool.execute<any[]>(
    `SELECT notification_id FROM notification
     WHERE reference_id = ? AND reference_type = 'ORDER' AND notification_type = 'ORDER_CONFIRMED' AND status = 'SENT'`,
    [orderId]
  );
  if (existing) return;

  // MAIL-02: email trước đây chỉ có mã đơn/tổng tiền — thiếu hẳn danh sách món và
  // địa chỉ giao, không đối chiếu được với đơn thật. Lấy đủ dữ liệu để hiển thị.
  const [[addr]] = await pool.execute<any[]>(
    `SELECT a.recipient_name, a.recipient_phone, a.address_line, a.ward, a.province
     FROM \`order\` o JOIN address a ON a.address_id = o.address_id
     WHERE o.order_id = ?`,
    [orderId]
  );
  const [items] = await pool.execute<any[]>(
    `SELECT oi.quantity, oi.unit_price, oi.subtotal,
            COALESCE(p.product_name, bf.blank_name, 'Trang sức tùy chỉnh') AS item_name
     FROM order_item oi
     LEFT JOIN product_variant pv ON pv.variant_id = oi.variant_id
     LEFT JOIN product p ON p.product_id = pv.product_id
     LEFT JOIN customization c ON c.custom_id = oi.custom_id
     LEFT JOIN blank_form bf ON bf.blank_id = c.blank_id
     WHERE oi.order_id = ?`,
    [orderId]
  );

  const itemsHtml = (items as any[]).map(i => `
      <li>${i.item_name} × ${i.quantity} — ${Number(i.subtotal ?? i.unit_price * i.quantity).toLocaleString('vi-VN')} VND</li>
  `).join('');

  const addressHtml = addr
    ? `<p><b>Địa chỉ giao hàng:</b><br>${addr.recipient_name} — ${addr.recipient_phone}<br>${[addr.address_line, addr.ward, addr.province].filter(Boolean).join(', ')}</p>`
    : '';

  const subject = 'Xác nhận đặt hàng thành công tại RENGA';
  const html = `
    <h3>Chào ${fullName ?? 'Quý khách'},</h3>
    <p>Cảm ơn bạn đã đặt hàng tại RENGA! Đơn hàng của bạn đã được ghi nhận thành công.</p>
    <p><b>Thông tin đơn hàng:</b></p>
    <ul>
      <li>Mã đơn hàng: #${orderId}</li>
      <li>Loại đơn: ${orderTypeLabel}</li>
    </ul>
    <p><b>Sản phẩm:</b></p>
    <ul>${itemsHtml}</ul>
    <p><b>Tổng giá trị:</b> ${totalAmount.toLocaleString('vi-VN')} VND</p>
    ${addressHtml}
    <p>Chúng tôi sẽ sớm liên hệ để xác nhận và xử lý đơn hàng của bạn.</p>
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMailWithRetry(recipientEmail, subject, html);
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

const TIER_LABELS: Record<string, string> = {
  SILVER: 'Bạc', GOLD: 'Vàng', PLATINUM: 'Bạch Kim', DIAMOND: 'Kim Cương',
};

// LOY-03/04/05/06: báo lên hạng qua email — chỉ gọi khi thật sự LÊN hạng (reconcileTier
// trả upgraded=true), không gọi khi hạ hạng do hoàn điểm (LOY-07).
export async function notifyTierUpgrade(clientId: string, newTierName: string): Promise<void> {
  const { email, fullName } = await resolveClientEmail(clientId);
  if (!email) return;

  const tierLabel = TIER_LABELS[newTierName] ?? newTierName;
  const subject = `Chúc mừng! Bạn đã lên hạng ${tierLabel} tại RENGA`;
  const html = `
    <h3>Chào ${fullName ?? 'Quý khách'},</h3>
    <p>Chúc mừng bạn đã đạt hạng thành viên <b>${tierLabel}</b> tại RENGA!</p>
    <p>Cảm ơn bạn đã đồng hành cùng RENGA — hạng thành viên mới sẽ mang lại nhiều ưu đãi và hệ số tích điểm cao hơn cho những lần mua sắm tiếp theo.</p>
  `;

  let status: 'SENT' | 'FAILED' = 'SENT';
  try {
    await sendMailWithRetry(email, subject, html);
  } catch (err) {
    console.error(`[notification] Gửi mail lên hạng cho ${clientId} thất bại:`, err);
    status = 'FAILED';
  }

  await recordNotification({
    clientId, notificationType: 'TIER_UPGRADE', channel: 'EMAIL',
    title: subject, content: `Đã gửi email báo lên hạng ${tierLabel}`,
    status,
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
      await sendMailWithRetry(appt.email, subject, html);
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
