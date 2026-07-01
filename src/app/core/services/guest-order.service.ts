import { Injectable } from '@angular/core';

const PREFIX = 'renga_guest_order_token:';

/**
 * Lưu tạm token guest theo từng order_id ngay sau khi checkout thành công, để trang
 * /orders/:id có thể tự xác thực lại và load đúng đơn đó cho khách vãng lai — mà không
 * biến họ thành "đã đăng nhập" ở toàn bộ app (AuthService không hề đụng tới).
 */
@Injectable({ providedIn: 'root' })
export class GuestOrderService {
  save(orderId: string, accessToken: string): void {
    if (!orderId) return;
    sessionStorage.setItem(PREFIX + orderId, accessToken);
  }

  getToken(orderId: string): string | null {
    return sessionStorage.getItem(PREFIX + orderId);
  }
}
