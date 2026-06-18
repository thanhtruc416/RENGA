import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

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

  readonly reasons = CANCEL_REASONS;
  readonly selectedReasons = signal<string[]>([]);
  readonly otherReason = signal('');
  readonly MAX_OTHER = 150;
  readonly otherReasonLength = computed(() => this.otherReason().length);
  readonly isOtherSelected = computed(() => this.selectedReasons().includes('other'));

  toggleReason(value: string): void {
    const current = this.selectedReasons();
    if (current.includes(value)) {
      this.selectedReasons.set(current.filter(r => r !== value));
    } else {
      this.selectedReasons.set([...current, value]);
    }
  }

  isSelected(value: string): boolean {
    return this.selectedReasons().includes(value);
  }

  onConfirm(): void {
    if (!this.selectedReasons().length) return;
    if (this.isOtherSelected() && !this.otherReason().trim()) return;
    this.confirmed.emit(this.selectedReasons());
    this.selectedReasons.set([]);
    this.otherReason.set('');
  }

  onClose(): void {
    this.selectedReasons.set([]);
    this.otherReason.set('');
    this.closed.emit();
  }
}
