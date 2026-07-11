import { ChangeDetectionStrategy, Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './payment-success-modal.component.html',
  styleUrl: './payment-success-modal.component.css',
})
export class PaymentSuccessModalComponent {
  readonly isOpen        = input<boolean>(false);
  readonly isGuest       = input<boolean>(false);
  readonly mode          = input<'order' | 'appointment'>('order');
  readonly orderId       = input<string>('');
  readonly isCustomOrder = input<boolean>(false);
  readonly amount        = input<number>(0);
  // Chuyển khoản/thẻ/ví còn PENDING chờ xác nhận (BR-11) — mặc định true vì các
  // luồng khác (Studio/lịch tư vấn) đều xác nhận thanh toán ngay khi submit.
  readonly paymentConfirmed = input<boolean>(true);
  readonly closed        = output<void>();
  readonly scheduleAgain = output<void>();

  private readonly router = inject(Router);

  close(): void { this.closed.emit(); }

  closeX(): void {
    this.closed.emit();
    if (this.isGuest()) {
      this.router.navigateByUrl('/');
      return;
    }
    if (this.mode() === 'appointment') {
      this.router.navigateByUrl('/appointment-history');
      return;
    }
    // '/orders' (không kèm id) không phải route hợp lệ — chỉ có '/orders/:id' và
    // '/orders/custom/:id', nên trước đây bấm X luôn văng ra trang 404.
    if (this.orderId()) {
      const base = this.isCustomOrder() ? '/orders/custom' : '/orders';
      this.router.navigateByUrl(`${base}/${this.orderId()}`);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  onScheduleAgain(): void { this.closed.emit(); this.scheduleAgain.emit(); }
}