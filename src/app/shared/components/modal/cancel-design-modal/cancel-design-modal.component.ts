import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

export type CustomOrderStatus = 'P' | 'PC' | 'CR' | 'FN' | 'PF' | 'S' | 'CM' | 'C';

@Component({
  selector: 'app-cancel-design-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './cancel-design-modal.component.html',
  styleUrl: './cancel-design-modal.component.css',
})
export class CancelDesignModalComponent {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly orderId     = input.required<string>();
  readonly orderStatus = input.required<CustomOrderStatus>();

  // ── Outputs ─────────────────────────────────────────────────────────────────
  readonly cancelled = output<void>();
  readonly closed    = output<void>();

  // ── State ───────────────────────────────────────────────────────────────────
  readonly reason       = signal<string>('');
  readonly acknowledged = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly submitted    = signal<boolean>(false);

  // ── Computed ────────────────────────────────────────────────────────────────
  readonly policyText = computed<string>(() => {
    const s = this.orderStatus();
    if (s === 'P')
      return 'Đơn chưa được tiếp nhận chính thức. Bạn sẽ được hoàn 100% tiền cọc nếu đã đặt cọc.';
    if (s === 'PC')
      return 'Quá trình chế tác chưa bắt đầu. Bạn sẽ được hoàn 100% tiền cọc.';
    return 'Do sản phẩm của quý khách đã bước vào giai đoạn thiết kế và phân bổ nguyên vật liệu, yêu cầu hủy đơn sẽ cần được đội ngũ nghệ nhân xem xét. Xin lưu ý rằng khoản đặt cọc cho các sản phẩm đặt riêng từ giai đoạn "Đánh giá thiết kế" trở đi không được hoàn lại theo Chính sách Đặt riêng của RENGA.';
  });

  readonly canSubmit = computed<boolean>(
    () => this.reason().trim().length > 0 && this.acknowledged(),
  );

  // ── Actions ─────────────────────────────────────────────────────────────────
  onReasonInput(event: Event): void {
    this.reason.set((event.target as HTMLTextAreaElement).value);
  }

  toggleAck(): void {
    this.acknowledged.update((v) => !v);
  }

  onSubmit(): void {
    if (!this.canSubmit() || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    // TODO: gọi OrdersService.requestCancelDesign(orderId, reason)
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);
      this.cancelled.emit();
    }, 600);
  }

  onClose(): void {
    this.submitted.set(false);
    this.reason.set('');
    this.acknowledged.set(false);
    this.isSubmitting.set(false);

    this.closed.emit();
  }
}
