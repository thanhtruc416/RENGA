import pool from '../db';

export async function getDesigners() {
  const [rows] = await pool.execute<any[]>(
    `SELECT d.employee_id, e.full_name, d.specialty, d.bio,
            d.consultation_fee, d.avatar, d.portfolio_url
     FROM designer d
     JOIN employee e ON e.employee_id = d.employee_id
     WHERE d.is_available = 1
     ORDER BY d.consultation_fee DESC`
  );
  return rows;
}

export async function getAvailableSlots(employeeId: string, date: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT s.slot_id, s.start_time, s.end_time, s.slot_date, s.is_available
     FROM appointment_slot s
     JOIN designer_schedule sch ON sch.schedule_id = s.schedule_id
     WHERE sch.employee_id = ? AND s.slot_date = ?
     ORDER BY s.start_time`,
    [employeeId, date]
  );
  return rows;
}

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export interface CreateAppointmentPayload {
  clientId: string;
  slotId: string;
  ideaDescription?: string;
  consultationFee: number;
}

export async function createAppointment(payload: CreateAppointmentPayload) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[slot]] = await conn.execute<any[]>(
      'SELECT is_available, slot_date, start_time FROM appointment_slot WHERE slot_id = ? FOR UPDATE',
      [payload.slotId]
    );
    if (!slot || !slot.is_available) {
      throw new Error('Khung giờ này đã được đặt, vui lòng chọn giờ khác');
    }
    // BR-33: phải đặt trước ít nhất 24 giờ
    const [h, m] = String(slot.start_time).split(':').map(Number);
    const slotDate = new Date(slot.slot_date);
    slotDate.setHours(h, m, 0, 0);
    if (slotDate.getTime() < Date.now() + 24 * 60 * 60 * 1000) {
      throw new Error('Chỉ được đặt lịch trước ít nhất 24 giờ');
    }

    const appointmentId = await nextId('APT', 'appointment', 'appointment_id');
    await conn.execute(
      `INSERT INTO appointment
         (appointment_id, client_id, slot_id, idea_description, consultation_fee,
          payment_status, appointment_status, created_at, updated_at)
       VALUES (?,?,?,?,?,'UNPAID','PENDING',NOW(),NOW())`,
      [appointmentId, payload.clientId, payload.slotId,
        payload.ideaDescription ?? null, payload.consultationFee]
    );

    await conn.execute(
      'UPDATE appointment_slot SET is_available = 0 WHERE slot_id = ?',
      [payload.slotId]
    );

    await conn.commit();
    return appointmentId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function getUserAppointments(clientId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT
       a.appointment_id, a.appointment_status, a.payment_status,
       a.consultation_fee, a.created_at,
       s.slot_date, s.start_time, s.end_time,
       e.full_name   AS designer_name,
       d.avatar      AS designer_avatar,
       d.specialty   AS designer_specialty
     FROM appointment a
     JOIN appointment_slot s  ON s.slot_id      = a.slot_id
     JOIN designer_schedule sch ON sch.schedule_id = s.schedule_id
     JOIN designer d           ON d.employee_id  = sch.employee_id
     JOIN employee e           ON e.employee_id  = d.employee_id
     WHERE a.client_id = ?
     ORDER BY s.slot_date DESC, s.start_time DESC`,
    [clientId]
  );
  return rows;
}

export async function cancelAppointment(appointmentId: string, clientId: string, reason: string): Promise<{ refundPct: number; refundAmount: number }> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[appt]] = await conn.execute<any[]>(
      `SELECT a.appointment_id, a.appointment_status, a.slot_id, a.consultation_fee,
              s.slot_date, s.start_time
       FROM appointment a
       JOIN appointment_slot s ON s.slot_id = a.slot_id
       WHERE a.appointment_id = ? AND a.client_id = ?`,
      [appointmentId, clientId]
    );
    if (!appt) throw new Error('Không tìm thấy lịch hẹn');
    if (appt.appointment_status === 'CANCELLED') throw new Error('Lịch hẹn đã được hủy trước đó');
    if (!['PENDING', 'CONFIRMED'].includes(appt.appointment_status)) {
      throw new Error('Không thể hủy lịch hẹn ở trạng thái này');
    }

    // BR-36: tính chính sách hoàn tiền
    const [h, m] = String(appt.start_time).split(':').map(Number);
    const slotDate = new Date(appt.slot_date);
    slotDate.setHours(h, m, 0, 0);
    const hoursUntilSlot = (slotDate.getTime() - Date.now()) / (1000 * 60 * 60);
    const refundPct = hoursUntilSlot >= 24 ? 100 : (hoursUntilSlot > 0 ? 50 : 0);
    const refundAmount = Math.round(Number(appt.consultation_fee) * refundPct / 100);

    await conn.execute(
      `UPDATE appointment SET appointment_status = 'CANCELLED', cancel_reason = ?, updated_at = NOW()
       WHERE appointment_id = ?`,
      [reason, appointmentId]
    );
    await conn.execute(
      `UPDATE appointment_slot SET is_available = 1 WHERE slot_id = ?`,
      [appt.slot_id]
    );

    await conn.commit();
    return { refundPct, refundAmount };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
