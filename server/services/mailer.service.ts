import nodemailer from 'nodemailer';

// Transporter dùng chung cho toàn bộ backend (OTP, thông báo tự động...) — tránh
// mỗi service tự tạo 1 transporter/kết nối SMTP riêng.
export const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: false,
  // Ép IPv4 — một số nền tảng hosting (vd Railway) không route được IPv6 ra ngoài,
  // trong khi Gmail SMTP trả về địa chỉ IPv6 trước tiên, gây ENETUNREACH.
  family: 4,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error('❌ SMTP lỗi:', error);
  else       console.log('✅ SMTP kết nối thành công');
});

export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  const info = await transporter.sendMail({
    from: `"RENGA" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  console.log('SMTP response:', {
    messageId: info.messageId,
    accepted:  info.accepted,
    rejected:  info.rejected,
    response:  info.response,
  });
}
