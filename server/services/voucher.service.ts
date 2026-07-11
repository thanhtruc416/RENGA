import pool from '../db';

async function nextId(prefix: string, table: string, col: string): Promise<string> {
  const [[{ max }]] = await pool.execute<any[]>(
    `SELECT MAX(CAST(SUBSTRING(${col}, ${prefix.length + 1}) AS UNSIGNED)) as max FROM \`${table}\``
  );
  return `${prefix}${String((max || 0) + 1).padStart(6, '0')}`;
}

// Voucher chào mừng khách hàng mới — chỉ khách đã đăng nhập mới dùng được, tránh
// khách vãng lai (không có danh tính cố định) lạm dụng lặp lại nhiều lần.
const NEW_CUSTOMER_VOUCHER_CODE = 'NEWMEMBER';

export async function validateVoucher(code: string, orderTotal: number, clientId?: string) {
  const normalizedCode = code.toUpperCase();

  if (normalizedCode === NEW_CUSTOMER_VOUCHER_CODE && !clientId) {
    return { valid: false, message: 'Vui lòng đăng nhập để sử dụng voucher dành cho khách hàng mới.' };
  }

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
    clientId ? [clientId, normalizedCode] : [normalizedCode]
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

  // Mỗi tài khoản chỉ được dùng 1 voucher đúng 1 lần — trước đây voucher công khai
  // (không được cấp phát sẵn theo BIRTHDAY/TIER_UPGRADE...) không có customer_voucher
  // nào ràng buộc nên cùng 1 khách có thể áp mã này lặp lại vô hạn lần. Giờ tạo sẵn
  // 1 bản ghi AVAILABLE ngay lần đầu khách kiểm tra mã — createOrder() sẽ đánh dấu
  // USED khi đặt hàng thành công, và lần kiểm tra sau sẽ thấy cv_status='USED'.
  let customerVoucherId = v.customer_voucher_id ?? null;
  if (clientId && !customerVoucherId) {
    customerVoucherId = await nextId('CV', 'customer_voucher', 'customer_voucher_id');
    await pool.execute(
      `INSERT INTO customer_voucher (customer_voucher_id, client_id, voucher_id, status, grant_reason, issued_at)
       VALUES (?, ?, ?, 'AVAILABLE', 'MARKETING', NOW())`,
      [customerVoucherId, clientId, v.voucher_id]
    );
  }

  return {
    valid: true,
    voucher_id: v.voucher_id,
    customer_voucher_id: customerVoucherId,
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
