import pool from '../db';

// BR-34: tự hủy lịch tư vấn chưa thanh toán sau 10 phút.
//
// Lưu ý: kể từ khi createAppointment() (design.service.ts) được sửa để thanh toán
// 100% ngay lúc đặt lịch (BR-18) — appointment chỉ tồn tại ở 2 trạng thái: tạo
// thành công VÀ đã trả tiền (payment_status='PAID'), hoặc không được tạo ra
// (request lỗi, rollback toàn bộ transaction). Không còn đường nào để 1 dòng
// appointment tồn tại ở trạng thái "PENDING + UNPAID" kéo dài trong hệ thống hiện
// tại — nên job này về lý thuyết sẽ không tìm thấy gì để hủy. Vẫn giữ lại như một
// lưới an toàn phòng hờ (VD nếu sau này có luồng tạo lịch khác không đi qua
// createAppointment(), hoặc một lỗi khiến giao dịch không rollback đúng).
export async function cancelUnpaidAppointments(): Promise<{ cancelled: number }> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [expired] = await conn.execute<any[]>(
      `SELECT appointment_id, slot_id FROM appointment
       WHERE appointment_status = 'PENDING'
         AND payment_status = 'UNPAID'
         AND created_at < DATE_SUB(NOW(), INTERVAL 10 MINUTE)
       FOR UPDATE`
    );

    if (!expired.length) {
      await conn.commit();
      return { cancelled: 0 };
    }

    const appointmentIds = (expired as any[]).map(r => r.appointment_id);
    const slotIds        = (expired as any[]).map(r => r.slot_id);
    const ph = (n: number) => Array(n).fill('?').join(',');

    await conn.execute(
      `UPDATE appointment SET appointment_status='CANCELLED',
         cancel_reason='Tự động hủy do chưa thanh toán trong 10 phút', updated_at=NOW()
       WHERE appointment_id IN (${ph(appointmentIds.length)})`,
      appointmentIds
    );
    await conn.execute(
      `UPDATE appointment_slot SET is_available = 1
       WHERE slot_id IN (${ph(slotIds.length)})`,
      slotIds
    );

    await conn.commit();
    console.log(`[appointment-cancel] Hủy ${appointmentIds.length} lịch hẹn chưa thanh toán:`, appointmentIds.join(', '));
    return { cancelled: appointmentIds.length };
  } catch (err) {
    await conn.rollback();
    console.error('[appointment-cancel] Lỗi:', err);
    return { cancelled: 0 };
  } finally {
    conn.release();
  }
}
