import { Injectable, signal } from '@angular/core';

export type ToastType = 'error' | 'success' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

// Toast dùng chung toàn app — để các service (không render được template, vd
// CartService) và các component không muốn tự viết popup riêng đều có 1 chỗ
// báo lỗi/thành công nhất quán, thay vì im lặng nuốt lỗi.
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _toasts = signal<ToastMessage[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private nextId = 0;

  show(message: string, type: ToastType = 'error', durationMs = 4000): void {
    const id = this.nextId++;
    this._toasts.update((list) => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  error(message: string): void { this.show(message, 'error'); }
  success(message: string): void { this.show(message, 'success'); }

  dismiss(id: number): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
