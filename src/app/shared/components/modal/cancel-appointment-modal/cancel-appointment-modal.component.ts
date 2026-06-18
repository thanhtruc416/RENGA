import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

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
    this.confirmed.emit(this.selectedReasons());
    this.selectedReasons.set([]);
  }

  onClose(): void {
    this.selectedReasons.set([]);
    this.closed.emit();
  }
}
