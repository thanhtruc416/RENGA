import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GuestOrderService } from '../../../../core/services/guest-order.service';

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
  private readonly http              = inject(HttpClient);
  private readonly guestOrderService = inject(GuestOrderService);

  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly orderId     = input.required<string>();
  readonly orderStatus = input.required<CustomOrderStatus>();

  // ── Outputs ─────────────────────────────────────────────────────────────────
  readonly cancelled = output<void>();
  readonly closed    = output<void>();

  // ── State ───────────────────────────────────────────────────────────────────
  readonly reason         = signal<string>('');
  readonly acknowledged   = signal<boolean>(false);
  readonly isSubmitting   = signal<boolean>(false);
  readonly submitted      = signal<boolean>(false);
  readonly isSuccess      = signal<boolean>(false);
  readonly showValidation = signal<boolean>(false);

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
    this.showValidation.set(true);
    if (!this.canSubmit() || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    const guestToken = this.guestOrderService.getToken(this.orderId());
    const headers = guestToken ? new HttpHeaders({ Authorization: `Bearer ${guestToken}` }) : undefined;

    this.http.patch<{ success: boolean }>(
      `${environment.apiUrl}/orders/${this.orderId()}/cancel`,
      { reason: this.reason().trim() },
      headers ? { headers } : {},
    ).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.isSuccess.set(!!res.success);
        this.submitted.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.isSuccess.set(false);
        this.submitted.set(true);
      },
    });
  }

  onClose(): void {
    const wasSuccess = this.submitted() && this.isSuccess();

    this.submitted.set(false);
    this.isSuccess.set(false);
    this.reason.set('');
    this.acknowledged.set(false);
    this.isSubmitting.set(false);
    this.showValidation.set(false);

    if (wasSuccess) this.cancelled.emit();
    else this.closed.emit();
  }
}
