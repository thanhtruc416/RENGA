import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, input, signal } from '@angular/core';

const CANCEL_REASONS = [
  { value: 'personal', label: 'Thay đổi kế hoạch cá nhân' },
  { value: 'designer', label: 'Muốn đổi sang designer khác' },
  { value: 'budget', label: 'Chưa sẵn sàng về ngân sách' },
  { value: 'other', label: 'Lý do khác' },
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
  @Input() appointmentId = '';
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<string[]>();

  readonly mockShouldSucceed = input<boolean>(true);

  readonly reasons = CANCEL_REASONS;
  readonly selectedReason = signal<string>('');
  readonly otherReason = signal('');
  readonly result = signal<'success' | 'fail' | null>(null);
  readonly MAX_OTHER = 150;
  readonly otherReasonLength = computed(() => this.otherReason().length);
  readonly isOtherSelected = computed(() => this.selectedReason() === 'other');

  selectReason(value: string): void { this.selectedReason.set(value); }

  isSelected(value: string): boolean { return this.selectedReason() === value; }

  onConfirm(): void {
    if (!this.selectedReason()) return;
    if (this.isOtherSelected() && !this.otherReason().trim()) return;
    const success = this.mockShouldSucceed();
    this.result.set(success ? 'success' : 'fail');
    if (success) this.confirmed.emit([this.selectedReason()]);
  }

  onClose(): void {
    this.selectedReason.set('');
    this.otherReason.set('');
    this.result.set(null);
    this.closed.emit();
  }
}
