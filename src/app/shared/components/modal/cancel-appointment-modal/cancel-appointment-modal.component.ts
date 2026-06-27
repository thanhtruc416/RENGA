import {
  ChangeDetectionStrategy, Component, computed,
  DestroyRef, EventEmitter, inject, Input, Output, signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';

const CANCEL_REASONS = [
  { value: 'personal',  label: 'Thay đổi kế hoạch cá nhân' },
  { value: 'designer',  label: 'Muốn đổi sang designer khác' },
  { value: 'budget',    label: 'Chưa sẵn sàng về ngân sách' },
  { value: 'other',     label: 'Lý do khác' },
];

@Component({
  selector: 'app-cancel-appointment-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './cancel-appointment-modal.component.html',
  styleUrl: './cancel-appointment-modal.component.css',
})
export class CancelAppointmentModalComponent {
  private readonly http       = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  @Input() appointmentId = '';
  @Output() closed    = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<string[]>();

  readonly reasons         = CANCEL_REASONS;
  readonly selectedReason  = signal('');
  readonly otherReason     = signal('');
  readonly result          = signal<'success' | 'fail' | null>(null);
  readonly isSubmitting    = signal(false);
  readonly MAX_OTHER       = 150;
  readonly otherReasonLength  = computed(() => this.otherReason().length);
  readonly isOtherSelected    = computed(() => this.selectedReason() === 'other');

  private readonly refundInfo = signal<{ refundPct: number; refundAmount: number } | null>(null);
  readonly refundMessage = computed(() => {
    const info = this.refundInfo();
    if (!info) return 'Đặt cọc sẽ được hoàn trả theo chính sách.';
    if (info.refundPct === 100) return `Bạn sẽ được hoàn 100% phí tư vấn (${info.refundAmount.toLocaleString('vi-VN')}đ).`;
    if (info.refundPct === 50)  return `Bạn sẽ được hoàn 50% phí tư vấn (${info.refundAmount.toLocaleString('vi-VN')}đ) do hủy trong vòng 24 giờ.`;
    return 'Không được hoàn phí do hủy sau thời điểm tư vấn.';
  });

  selectReason(value: string): void { this.selectedReason.set(value); }
  isSelected(value: string): boolean { return this.selectedReason() === value; }

  onConfirm(): void {
    if (!this.selectedReason()) return;
    if (this.isOtherSelected() && !this.otherReason().trim()) return;

    const reason = this.isOtherSelected()
      ? this.otherReason().trim()
      : CANCEL_REASONS.find(r => r.value === this.selectedReason())?.label ?? this.selectedReason();

    this.isSubmitting.set(true);
    this.http.patch<{ success: boolean; message?: string; data?: { refundPct: number; refundAmount: number } }>(
      `${environment.apiUrl}/design/appointments/${this.appointmentId}/cancel`,
      { reason }
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.refundInfo.set(res.data ?? null);
          this.result.set('success');
          this.confirmed.emit([this.selectedReason()]);
        } else {
          this.result.set('fail');
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.result.set('fail');
      },
    });
  }

  onClose(): void {
    this.selectedReason.set('');
    this.otherReason.set('');
    this.result.set(null);
    this.refundInfo.set(null);
    this.closed.emit();
  }
}