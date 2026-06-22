import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  isHidden?: boolean; // <-- Thêm trường để làm mờ
}

export interface DesignerInfo {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly avatarUrl: string;
  isCurrent?: boolean;
}

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
  readonly activeModal = signal<'none' | 'change-info' | 'update-result'>('none');
  readonly selectedAppointment = signal<Appointment | null>(null);

  // --- STATE MODAL 1: THAY ĐỔI THÔNG TIN LỊCH HẸN ---
  readonly changeApptTab = signal<'designer' | 'datetime'>('designer');

  // --- STATE TOAST MESSAGE ---
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  // --- STATE PHÂN TRANG ---
  currentPage = signal(1);
  readonly itemsPerPage = 5;

  filterDesigner  = signal('');
  filterStatus    = signal('');
  filterDateFrom  = signal('');
  filterDateTo    = signal('');
  filterApplied   = signal(false);
  showDatePicker  = signal(false);
  activeDesigner  = signal('');
  activeStatus    = signal('');
  activeDateFrom  = signal('');
  activeDateTo    = signal('');

  readonly filterDateDisplay = computed(() => {
    const from = this.filterDateFrom();
    const to   = this.filterDateTo();
    if (!from && !to) return '';
    const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (from && to)  return `${fmt(from)} - ${fmt(to)}`;
    return from ? fmt(from) : fmt(to);
  });

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
      id: 'a5',
      customer: { initials: 'CH', name: 'Clara Hughes', tier: 'Hạng Kim Cương', bgColor: '#e6c4c4' },
      designer: { name: 'Isabella Vance', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      date: '25/7/2026', time: '14:30 PM', status: 'booked'
    },
    {
      id: 'a6',
      customer: { initials: 'AB', name: 'Alex Brown', tier: 'Hạng Bạc', bgColor: '#e2f0d9' },
      designer: { name: 'Quốc Bảo', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      date: '26/7/2026', time: '09:00 AM', status: 'booked'
    }
  ]);

  readonly filteredAppointments = computed(() => {
    const designer = this.activeDesigner();
    const status   = this.activeStatus();
    const dateFrom = this.activeDateFrom();
    const dateTo   = this.activeDateTo();
    if (!designer && !status && !dateFrom && !dateTo) return this.appointments();
    return this.appointments().filter(a => {
      if (designer && a.designer.name !== designer) return false;
      if (status   && a.status          !== status)   return false;
      if (dateFrom || dateTo) {
        const d = this._parseApptDate(a.date);
        if (!d) return false;
        if (dateFrom && d < new Date(dateFrom)) return false;
        if (dateTo   && d > new Date(dateTo))   return false;
      }
      return true;
    });
  });

  // --- LOGIC PHÂN TRANG ---
  readonly paginatedAppointments = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredAppointments().slice(start, start + this.itemsPerPage);
  });

  get totalItems() { return this.filteredAppointments().length; }
  get totalPages() { return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage)); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage.set(page);
  }

  private _parseApptDate(s: string): Date | null {
    const parts = s.split('/').map(Number);
    if (parts.length !== 3) return null;
    const [d, m, y] = parts;
    return new Date(y, m - 1, d);
  }

  readonly designersList = signal<DesignerInfo[]>([
    { id: 'd1', name: 'Minh Anh (Hiện tại)', role: 'GOLDSMITH MASTER', avatarUrl: 'https://i.pravatar.cc/150?img=5', isCurrent: true },
    { id: 'd2', name: 'Quốc Bảo', role: 'DIAMOND SPECIALIST', avatarUrl: 'https://i.pravatar.cc/150?img=11', isCurrent: false },
    { id: 'd3', name: 'Thanh Hằng', role: 'CUSTOM DESIGNER', avatarUrl: 'https://i.pravatar.cc/150?img=1', isCurrent: false },
    { id: 'd4', name: 'Tuấn Kiệt', role: 'GEMOLOGIST', avatarUrl: 'https://i.pravatar.cc/150?img=12', isCurrent: false }
  ]);

  readonly updateForm = new FormGroup<UpdateResultForm>({
    notes: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    designStyle: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estimatedBudget: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nextAppointment: new FormControl('', { nonNullable: true })
  });

  // --- METHODS ---
  onDateFromChange(val: string): void {
    this.filterDateFrom.set(val);
    if (val && this.filterDateTo()) this.showDatePicker.set(false);
  }

  onDateToChange(val: string): void {
    this.filterDateTo.set(val);
    if (this.filterDateFrom() && val) this.showDatePicker.set(false);
  }

  applyFilters(): void {
    this.activeDesigner.set(this.filterDesigner());
    this.activeStatus.set(this.filterStatus());
    this.activeDateFrom.set(this.filterDateFrom());
    this.activeDateTo.set(this.filterDateTo());
    this.filterApplied.set(true);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.filterDesigner.set('');
    this.filterStatus.set('');
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.activeDesigner.set('');
    this.activeStatus.set('');
    this.activeDateFrom.set('');
    this.activeDateTo.set('');
    this.filterApplied.set(false);
    this.currentPage.set(1);
  }

  // --- ẨN / HIỆN ---
  toggleVisibility(appt: Appointment) {
    this.appointments.update(list => list.map(a => 
      a.id === appt.id ? { ...a, isHidden: !a.isHidden } : a
    ));
    this.displayToast(`${appt.isHidden ? 'Hiện' : 'Ẩn'} lịch hẹn thành công!`, 'success');
  }

  private displayToast(message: string, type: 'success' | 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  openChangeInfoModal(appt: Appointment): void {
    if (appt.isHidden) return;
    this.selectedAppointment.set(appt);
    this.changeApptTab.set('designer');
    this.activeModal.set('change-info');
  }

  openUpdateResultModal(appt: Appointment): void {
    if (appt.isHidden) return;
    this.selectedAppointment.set(appt);
    this.updateForm.reset();
    this.activeModal.set('update-result');
  }

  closeModal(): void {
    this.activeModal.set('none');
    this.selectedAppointment.set(null);
  }

  // Modal 1: Thay đổi thông tin lịch hẹn
  selectNewDesigner(designerId: string): void {
    this.designersList.update(list => list.map(d => ({
      ...d,
      isCurrent: d.id === designerId
    })));
  }

  submitChangeAppointment(): void {
    this.displayToast('Cập nhật thông tin lịch hẹn thành công!', 'success');
    this.closeModal();
  }

  // Modal 2: Cập nhật kết quả tư vấn
  submitUpdateResult(): void {
    if (this.updateForm.invalid) {
      this.displayToast('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
      return; // Dừng lại, không đóng modal
    }
    this.displayToast('Lưu kết quả tư vấn thành công!', 'success');
    this.closeModal(); // Thành công mới đóng modal
  }
}