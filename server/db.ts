import mysql, { PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * Chạy nhiều query trong cùng 1 transaction trên 1 connection duy nhất.
 * Dùng khi cần INSERT/UPDATE nhiều bảng liên quan (VD: tạo client + customer + account).
 *
 * @example
 * await withTransaction(async (conn) => {
 *   await conn.query('INSERT INTO client (...) VALUES (...)', [...]);
 *   await conn.query('INSERT INTO customer (...) VALUES (...)', [...]);
 * });
 */
export async function withTransaction<T>(
  callback: (conn: PoolConnection) => Promise<T>
): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export default pool;