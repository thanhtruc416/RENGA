import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

export type OrderStatus = 'P' | 'PC' | 'PF' | 'S' | 'CM' | 'C';
type ModalStep = 'form' | 'success' | 'fail';

interface CancelReason {
  id: string;
  label: string;
}

const REASONS: CancelReason[] = [
  { id: 'r1', label: 'Thay đổi ý định' },
  { id: 'r2', label: 'Tìm thấy sản phẩm giá rẻ hơn' },
  { id: 'r3', label: 'Nhập sai địa chỉ giao hàng' },
  { id: 'r4', label: 'Thời gian nhận hàng trễ' },
  { id: 'r5', label: 'Khác' },
];

/**
 * Modal hủy đơn sản phẩm có sẵn — BR-24, BR-27
 * 3 bước: form → success | fail
 */
@Component({
  selector: 'app-cancel-order-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './cancel-order-modal.component.html',
  styleUrl: './cancel-order-modal.component.css',
})
export class CancelOrderModalComponent {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly orderId           = input.required<string>();
  readonly orderStatus       = input.required<OrderStatus>();
  readonly productName       = input<string>('');
  readonly productSpec       = input<string>('');
  readonly productImage      = input<string>('assets/images/product-placeholder.webp');
  readonly refundAmount      = input<string>('');
  readonly mockShouldSucceed = input<boolean>(true);

  // ── Outputs ─────────────────────────────────────────────────────────────────
  readonly cancelled         = output<void>();
  readonly closed            = output<void>();
  readonly contactRequested  = output<void>();

  // ── State ───────────────────────────────────────────────────────────────────
  readonly step             = signal<ModalStep>('form');
  readonly selectedReasonId = signal<string>('');
  readonly otherNote        = signal('');
  readonly isSubmitting     = signal(false);

  // ── Computed ────────────────────────────────────────────────────────────────
  readonly reasons = REASONS;

  /** Chính sách hiển thị theo trạng thái — BR-27 */
  readonly policyText = computed<string>(() => {
    const s = this.orderStatus();
    if (s === 'P' || s === 'PC')
      return 'Bạn đã đủ điều kiện được hoàn tiền 100% nếu yêu cầu này được gửi trong vòng 1 giờ kể từ khi đặt hàng.';
    if (s === 'PF')
      return 'Sản phẩm đã được đóng gói. Khoản hoàn tiền sẽ trừ phí đóng gói và xử lý theo chính sách hiện hành.';
    return 'Đơn hàng đang trong trạng thái không thể hủy trực tiếp';
  });

  /** Có thể hủy tự động (không cần Admin) — BR-24 */
  readonly canCancelDirectly = computed<boolean>(() => {
    const s = this.orderStatus();
    return s === 'P' || s === 'PC' || s === 'PF';
  });

  readonly otherSelected = computed<boolean>(() => this.selectedReasonId() === 'r5');

  readonly canSubmit = computed<boolean>(() =>
    this.selectedReasonId() !== '' &&
    (!this.otherSelected() || this.otherNote().trim().length > 0)
  );

  // ── Actions ─────────────────────────────────────────────────────────────────
  updateOtherNote(event: Event): void {
    this.otherNote.set((event.target as HTMLTextAreaElement).value);
  }

  selectReason(id: string): void {
    this.selectedReasonId.set(id);
  }

  isReasonSelected(id: string): boolean {
    return this.selectedReasonId() === id;
  }

  onSubmit(): void {
    if (!this.canSubmit() || this.isSubmitting()) return;
    this.isSubmitting.set(true);

    // TODO: gọi OrdersService.cancelOrder(orderId, reasons)
    setTimeout(() => {
      this.isSubmitting.set(false);
      if (this.mockShouldSucceed()) {
        this.step.set('success');
        this.cancelled.emit();
      } else {
        this.step.set('fail');
      }
    }, 600);
  }

  onClose(): void {
    this.closed.emit();
  }

  onContactRequested(): void {
    this.closed.emit();
    this.contactRequested.emit();
  }
}