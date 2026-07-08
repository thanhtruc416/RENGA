import pool from '../db';
import { shortenName } from './product.service';

export async function getDashboardStats() {
  const [[{ totalRevenue }]] = await pool.execute<any[]>(
    `SELECT COALESCE(SUM(total_amount), 0) AS totalRevenue FROM \`order\` WHERE order_status = 'COMPLETED'`,
  );

  const [statusCounts] = await pool.execute<any[]>(
    `SELECT order_status, COUNT(*) AS count FROM \`order\` GROUP BY order_status`,
  );

  const [topProducts] = await pool.execute<any[]>(
    `SELECT p.product_id, p.product_name, SUM(oi.quantity) AS totalSold
     FROM order_item oi
     JOIN product_variant pv ON pv.variant_id = oi.variant_id
     JOIN product p ON p.product_id = pv.product_id
     JOIN \`order\` o ON o.order_id = oi.order_id
     WHERE o.order_status != 'CANCELLED'
     GROUP BY p.product_id, p.product_name
     ORDER BY totalSold DESC
     LIMIT 5`,
  );

  const [[{ pendingPayments }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS pendingPayments FROM \`order\` WHERE order_status = 'PENDING'`,
  );
  const [[{ pendingAppointments }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS pendingAppointments FROM appointment WHERE appointment_status = 'PENDING'`,
  );
  const [[{ pendingWarranties }]] = await pool.execute<any[]>(
    `SELECT COUNT(*) AS pendingWarranties FROM warranty_request WHERE warranty_status = 'PENDING'`,
  );

  return {
    totalRevenue: Number(totalRevenue),
    orderStatusCounts: (statusCounts as any[]).map(r => ({ status: r.order_status, count: Number(r.count) })),
    topProducts: (topProducts as any[]).map(p => ({
      productId: p.product_id,
      name: shortenName(p.product_name),
      totalSold: Number(p.totalSold),
    })),
    pendingPayments: Number(pendingPayments),
    pendingAppointments: Number(pendingAppointments),
    pendingWarranties: Number(pendingWarranties),
  };
}
