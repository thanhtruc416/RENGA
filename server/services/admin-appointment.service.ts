import pool from '../db';
import { assertNoScheduleConflict } from './design.service';

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'] as const;
type ApptStatus = typeof STATUSES[number];

const ALLOWED_TRANSITIONS: Record<ApptStatus, ApptStatus[]> = {
  PENDING:   ['CONFIRMED', 'CANCELLED', 'NO_SHOW'],
  CONFIRMED: ['COMPLETED', 'CANCELLED', 'NO_SHOW'],
  CANCELLED: [],
  COMPLETED: [],
  NO_SHOW:   [],
};

const LIST_SELECT = `
  SELECT a.appointment_id, a.appointment_status, a.payment_status, a.consultation_fee,
         a.idea_description, a.created_at,
         s.slot_id, s.slot_date, s.start_time, s.end_time,
         e.full_name AS designer_name, d.employee_id AS designer_id, d.avatar AS designer_avatar, d.specialty AS designer_specialty,
         cu.full_name AS customer_name, cl.phone AS customer_phone, cl.client_id,
         mt.tier_name AS customer_tier
  FROM appointment a
  JOIN appointment_slot s     ON s.slot_id = a.slot_id
  JOIN designer_schedule sch  ON sch.schedule_id = s.schedule_id
  JOIN designer d             ON d.employee_id = sch.employee_id
  JOIN employee e             ON e.employee_id = d.employee_id
  JOIN customer cu            ON cu.client_id = a.client_id
  JOIN client cl              ON cl.client_id = cu.client_id
  LEFT JOIN member_tier mt    ON mt.tier_id = cu.tier_id
`;

export async function getAdminAppointments(
  page = 1, limit = 20, status?: string, designerId?: string,
  dateFrom?: string, dateTo?: string, search?: string,
) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (status)     { where += ' AND a.appointment_status = ?'; params.push(status); }
  if (designerId) { where += ' AND d.employee_id = ?';        params.push(designerId); }
  if (dateFrom)   { where += ' AND s.slot_date >= ?';         params.push(dateFrom); }
  if (dateTo)     { where += ' AND s.slot_date <= ?';         params.push(dateTo); }
  if (search) {
    where += ' AND (cu.full_name LIKE ? OR cl.phone LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  const [rows] = await pool.execute<any[]>(
    `${LIST_SELECT} ${where} ORDER BY s.slot_date DESC, s.start_time DESC LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total
     FROM appointment a
     JOIN appointment_slot s     ON s.slot_id = a.slot_id
     JOIN designer_schedule sch  ON sch.schedule_id = s.schedule_id
     JOIN designer d             ON d.employee_id = sch.employee_id
     JOIN customer cu            ON cu.client_id = a.client_id
     JOIN client cl              ON cl.client_id = cu.client_id
     ${where}`,
    params,
  );

  return { appointments: rows, total, page, limit };
}

export async function getAdminAppointmentDetail(appointmentId: string) {
  const [[row]] = await pool.execute<any[]>(
    `${LIST_SELECT} WHERE a.appointment_id = ?`,
    [appointmentId],
  );
  return row ?? null;
}

export async function updateAppointmentStatus(appointmentId: string, newStatus: string) {
  if (!STATUSES.includes(newStatus as ApptStatus)) {
    throw { status: 400, message: 'Trạng thái không hợp lệ.' };
  }

  const [[appt]] = await pool.execute<any[]>(
    `SELECT appointment_status, slot_id FROM appointment WHERE appointment_id = ?`,
    [appointmentId],
  );
  if (!appt) throw { status: 404, message: 'Không tìm thấy lịch hẹn.' };

  const current = appt.appointment_status as ApptStatus;
  if (!ALLOWED_TRANSITIONS[current].includes(newStatus as ApptStatus)) {
    throw { status: 409, message: `Không thể chuyển từ ${current} sang ${newStatus}.` };
  }

  await pool.execute(
    `UPDATE appointment SET appointment_status = ?, updated_at = NOW() WHERE appointment_id = ?`,
    [newStatus, appointmentId],
  );

  // Hủy/không đến thì trả lại khung giờ cho hệ thống đặt lịch khác.
  if (newStatus === 'CANCELLED' || newStatus === 'NO_SHOW') {
    await pool.execute(`UPDATE appointment_slot SET is_available = 1 WHERE slot_id = ?`, [appt.slot_id]);
  }
}

export async function reassignAppointmentSlot(appointmentId: string, newSlotId: string) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[appt]] = await conn.execute<any[]>(
      `SELECT appointment_status, slot_id, reschedule_count FROM appointment WHERE appointment_id = ? FOR UPDATE`,
      [appointmentId],
    );
    if (!appt) throw { status: 404, message: 'Không tìm thấy lịch hẹn.' };
    if (!['PENDING', 'CONFIRMED'].includes(appt.appointment_status)) {
      throw { status: 409, message: 'Không thể đổi lịch cho lịch hẹn ở trạng thái này.' };
    }
    if (appt.slot_id === newSlotId) {
      throw { status: 400, message: 'Vui lòng chọn một khung giờ khác.' };
    }
    // APT-04: chỉ được dời lịch tối đa 1 lần (cột reschedule_count có sẵn CHECK
    // <=1 trong schema nhưng trước đây không có chỗ nào tăng cột này cả).
    if (appt.reschedule_count >= 1) {
      throw { status: 409, message: 'Lịch hẹn này đã được dời 1 lần — không thể dời thêm.' };
    }

    const [[newSlot]] = await conn.execute<any[]>(
      `SELECT s.is_available, s.slot_date, s.start_time, s.end_time, sch.employee_id
       FROM appointment_slot s
       JOIN designer_schedule sch ON sch.schedule_id = s.schedule_id
       WHERE s.slot_id = ? FOR UPDATE`,
      [newSlotId],
    );
    if (!newSlot) throw { status: 404, message: 'Không tìm thấy khung giờ mới.' };
    if (!newSlot.is_available) throw { status: 409, message: 'Khung giờ này đã được đặt.' };

    await assertNoScheduleConflict(conn, newSlot.employee_id, newSlot.slot_date, newSlot.start_time, newSlot.end_time, appointmentId);

    await conn.execute(`UPDATE appointment_slot SET is_available = 1 WHERE slot_id = ?`, [appt.slot_id]);
    await conn.execute(`UPDATE appointment_slot SET is_available = 0 WHERE slot_id = ?`, [newSlotId]);
    await conn.execute(
      `UPDATE appointment SET slot_id = ?, reschedule_count = reschedule_count + 1, updated_at = NOW() WHERE appointment_id = ?`,
      [newSlotId, appointmentId],
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
