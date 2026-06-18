import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// --- INTERFACES ---
export interface Appointment {
  readonly id: string;
  readonly customer: {
    readonly initials: string;
    readonly name: string;
    readonly tier: string;
    readonly bgColor: string;
  };
  readonly designer: {
    readonly name: string;
    readonly avatarUrl: string;
  };
  readonly date: string;
  readonly time: string;
  readonly status: 'booked' | 'completed';
}

export interface DesignerInfo {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly avatarUrl: string;
  readonly isCurrent?: boolean;
}

// --- TYPED FORM CHO MODAL CẬP NHẬT ---
interface UpdateResultForm {
  notes: FormControl<string>;
  designStyle: FormControl<string>;
  estimatedBudget: FormControl<string>;
  nextAppointment: FormControl<string>;
}

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent {
  // --- STATE (SIGNALS) ---
  // Quản lý xem Modal nào đang mở: 'none', 'change-designer', 'update-result'
  readonly activeModal = signal<'none' | 'change-designer' | 'update-result'>('none');
  readonly selectedAppointment = signal<Appointment | null>(null);

  // Mock data danh sách lịch hẹn
  readonly appointments = signal<Appointment[]>([
    {
      id: 'a1',
      customer: { initials: 'EN', name: 'Eleanor Neale', tier: 'Hạng Vàng', bgColor: '#f6d6d6' },
      designer: { name: 'Sofia Laurent', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      date: '25/7/2026', time: '14:30 PM', status: 'booked'
    },
    {
      id: 'a2',
      customer: { initials: 'EN', name: 'Eleanor Neale', tier: 'Hạng Vàng', bgColor: '#f6d6d6' },
      designer: { name: 'Sofia Laurent', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      date: '25/7/2026', time: '14:30 PM', status: 'booked'
    },
    {
      id: 'a3',
      customer: { initials: 'CH', name: 'Clara Hughes', tier: 'Hạng Kim Cương', bgColor: '#e6c4c4' },
      designer: { name: 'Isabella Vance', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      date: '25/7/2026', time: '14:30 PM', status: 'completed'
    },
    {
      id: 'a4',
      customer: { initials: 'CH', name: 'Clara Hughes', tier: 'Hạng Kim Cương', bgColor: '#e6c4c4' },
      designer: { name: 'Isabella Vance', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      date: '25/7/2026', time: '14:30 PM', status: 'completed'
    },
    {
      id: 'a4',
      customer: { initials: 'CH', name: 'Clara Hughes', tier: 'Hạng Kim Cương', bgColor: '#e6c4c4' },
      designer: { name: 'Isabella Vance', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      date: '25/7/2026', time: '14:30 PM', status: 'booked'
    }
  ]);

  // Mock data danh sách Designer (Cho Modal Đổi Designer)
  readonly designersList = signal<DesignerInfo[]>([
    { id: 'd1', name: 'Minh Anh (Hiện tại)', role: 'GOLDSMITH MASTER', avatarUrl: 'https://i.pravatar.cc/150?img=5', isCurrent: true },
    { id: 'd2', name: 'Quốc Bảo', role: 'DIAMOND SPECIALIST', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
    { id: 'd3', name: 'Thanh Hằng', role: 'CUSTOM DESIGNER', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 'd4', name: 'Tuấn Kiệt', role: 'GEMOLOGIST', avatarUrl: 'https://i.pravatar.cc/150?img=12' }
  ]);

  // Khởi tạo Form cập nhật kết quả
  readonly updateForm = new FormGroup<UpdateResultForm>({
    notes: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    designStyle: new FormControl('', { nonNullable: true }),
    estimatedBudget: new FormControl('', { nonNullable: true }),
    nextAppointment: new FormControl('', { nonNullable: true })
  });

  // --- METHODS ---
  openChangeDesignerModal(appt: Appointment): void {
    this.selectedAppointment.set(appt);
    this.activeModal.set('change-designer');
  }

  openUpdateResultModal(appt: Appointment): void {
    this.selectedAppointment.set(appt);
    this.updateForm.reset();
    this.activeModal.set('update-result');
  }

  closeModal(): void {
    this.activeModal.set('none');
    this.selectedAppointment.set(null);
  }

  // Action trong Modal Đổi Designer
  selectNewDesigner(designerId: string): void {
    console.log(`Đã chọn designer mới: ${designerId}`);
  }

  submitChangeDesigner(): void {
    console.log('Xác nhận cập nhật phân công');
    this.closeModal();
  }

  // Action trong Modal Cập nhật kết quả
  submitUpdateResult(): void {
    if (this.updateForm.valid) {
      console.log('Lưu kết quả tư vấn:', this.updateForm.value);
      this.closeModal();
    }
  }
}