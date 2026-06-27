import pool from '../db';

export async function validateVoucher(code: string, orderTotal: number, clientId?: string) {
  const [[v]] = await pool.execute<any[]>(
    clientId
      ? `SELECT v.voucher_id, v.discount_type, v.discount_value,
                v.min_order_value, v.max_discount_amount,
                cv.customer_voucher_id, cv.status as cv_status
         FROM voucher v
         LEFT JOIN customer_voucher cv ON cv.voucher_id = v.voucher_id AND cv.client_id = ?
         WHERE v.voucher_code = ? AND v.status = 'ACTIVE' AND NOW() BETWEEN v.valid_from AND v.valid_to`
      : `SELECT voucher_id, discount_type, discount_value,
                min_order_value, max_discount_amount,
                NULL as customer_voucher_id, NULL as cv_status
         FROM voucher
         WHERE voucher_code = ? AND status = 'ACTIVE' AND NOW() BETWEEN valid_from AND valid_to`,
    clientId ? [clientId, code.toUpperCase()] : [code.toUpperCase()]
  );

  if (!v) return { valid: false, message: 'Mã voucher không tồn tại hoặc đã hết hạn' };

  if (v.cv_status === 'USED') return { valid: false, message: 'Voucher đã được sử dụng' };

  if (orderTotal < Number(v.min_order_value)) {
    return {
      valid: false,
      message: `Đơn hàng tối thiểu ${Number(v.min_order_value).toLocaleString('vi-VN')}đ`,
    };
  }

  let discount = 0;
  if (v.discount_type === 'PERCENTAGE') {
    discount = Math.round(orderTotal * Number(v.discount_value) / 100);
    if (v.max_discount_amount) discount = Math.min(discount, Number(v.max_discount_amount));
  } else {
    discount = Number(v.discount_value);
  }

  return {
    valid: true,
    voucher_id: v.voucher_id,
    customer_voucher_id: v.customer_voucher_id ?? null,
    discount,
    message: `Giảm ${discount.toLocaleString('vi-VN')}đ`,
  };
}

export async function getUserVouchers(clientId: string) {
  const [rows] = await pool.execute<any[]>(
    `SELECT v.voucher_id, v.voucher_code, v.discount_type, v.discount_value,
            v.min_order_value, v.max_discount_amount, v.valid_to,
            cv.customer_voucher_id, cv.status
     FROM customer_voucher cv
     JOIN voucher v ON v.voucher_id = cv.voucher_id
     WHERE cv.client_id = ? AND cv.status = 'AVAILABLE'
       AND v.status = 'ACTIVE' AND NOW() < v.valid_to
     ORDER BY v.valid_to ASC`,
    [clientId]
  );
  return rows;
}
