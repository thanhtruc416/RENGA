import pool from '../db';

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

export interface AdminVoucherInput {
  voucherCode: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderValue?: number;
  maxDiscountAmount?: number | null;
  applicableOrderType?: 'ALL' | 'STANDARD' | 'STUDIO' | 'DESIGN';
  usageLimit: number;
  validFrom: string;
  validTo: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

// EXPIRED được tính động theo valid_to thay vì bắt admin tự cập nhật tay.
const EFFECTIVE_STATUS_EXPR = `CASE WHEN v.status = 'ACTIVE' AND NOW() > v.valid_to THEN 'EXPIRED' ELSE v.status END`;

export async function getAdminVouchers(page = 1, limit = 20, status?: string, search?: string) {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let where = 'WHERE 1=1';
  if (status) { where += ` AND ${EFFECTIVE_STATUS_EXPR} = ?`; params.push(status); }
  if (search) { where += ' AND v.voucher_code LIKE ?'; params.push(`%${search}%`); }

  const [rows] = await pool.execute<any[]>(
    `SELECT v.voucher_id, v.voucher_code, v.discount_type, v.discount_value, v.min_order_value,
            v.max_discount_amount, v.applicable_order_type, v.usage_limit, v.used_count,
            v.valid_from, v.valid_to, v.created_at,
            ${EFFECTIVE_STATUS_EXPR} AS effective_status
     FROM voucher v
     ${where}
     ORDER BY v.created_at DESC
     LIMIT ${limit} OFFSET ${offset}`,
    params,
  );

  const [[{ total }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS total FROM voucher v ${where}`,
    params,
  );

  return { vouchers: rows, total, page, limit };
}

export async function getAdminVoucherDetail(voucherId: string) {
  const [[row]] = await pool.execute<any[]>(
    `SELECT v.*, ${EFFECTIVE_STATUS_EXPR} AS effective_status
     FROM voucher v WHERE v.voucher_id = ?`,
    [voucherId],
  );
  return row ?? null;
}

export async function createAdminVoucher(input: AdminVoucherInput, adminEmployeeId: string) {
  const code = input.voucherCode.trim().toUpperCase();
  if (!code) throw { status: 400, message: 'Vui lòng nhập mã voucher.' };
  if (!(input.discountValue > 0)) throw { status: 400, message: 'Giá trị giảm giá phải lớn hơn 0.' };
  if (!(input.usageLimit > 0)) throw { status: 400, message: 'Giới hạn lượt dùng phải lớn hơn 0.' };

  const [[dup]] = await pool.execute<any[]>(`SELECT voucher_id FROM voucher WHERE voucher_code = ?`, [code]);
  if (dup) throw { status: 409, message: 'Mã voucher này đã tồn tại.' };

  const voucherId = await nextId('VCH', 'voucher', 'voucher_id');
  await pool.execute(
    `INSERT INTO voucher
       (voucher_id, voucher_code, discount_type, discount_value, min_order_value, max_discount_amount,
        applicable_order_type, usage_limit, used_count, valid_from, valid_to, status, created_by_admin_id, created_at)
     VALUES (?,?,?,?,?,?,?,?,0,?,?,?,?,NOW())`,
    [
      voucherId, code, input.discountType, input.discountValue,
      input.minOrderValue ?? 0, input.maxDiscountAmount ?? null,
      input.applicableOrderType ?? 'ALL', input.usageLimit,
      input.validFrom, input.validTo, input.status ?? 'ACTIVE', adminEmployeeId,
    ],
  );
  return voucherId;
}

export async function updateAdminVoucher(voucherId: string, input: Partial<AdminVoucherInput>) {
  const [[existing]] = await pool.execute<any[]>(`SELECT voucher_id FROM voucher WHERE voucher_id = ?`, [voucherId]);
  if (!existing) throw { status: 404, message: 'Không tìm thấy voucher.' };

  const fieldMap: Record<string, string> = {
    discountType: 'discount_type', discountValue: 'discount_value', minOrderValue: 'min_order_value',
    maxDiscountAmount: 'max_discount_amount', applicableOrderType: 'applicable_order_type',
    usageLimit: 'usage_limit', validFrom: 'valid_from', validTo: 'valid_to', status: 'status',
  };

  const sets: string[] = [];
  const params: any[] = [];
  for (const [key, col] of Object.entries(fieldMap)) {
    const value = (input as any)[key];
    if (value !== undefined) { sets.push(`${col} = ?`); params.push(value); }
  }
  if (!sets.length) return;

  params.push(voucherId);
  await pool.execute(`UPDATE voucher SET ${sets.join(', ')} WHERE voucher_id = ?`, params);
}
