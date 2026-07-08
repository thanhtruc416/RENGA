import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  AdminService, AdminAppointment, AdminDesigner, AdminSlot, AppointmentStatus,
} from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  PENDING: 'CHỜ XÁC NHẬN',
  CONFIRMED: 'ĐÃ XÁC NHẬN',
  CANCELLED: 'ĐÃ HỦY',
  COMPLETED: 'ĐÃ HOÀN TẤT',
  NO_SHOW: 'KHÔNG ĐẾN',
};

const NEXT_ACTIONS: Record<AppointmentStatus, Array<{ status: AppointmentStatus; label: string }>> = {
  PENDING:   [{ status: 'CONFIRMED', label: 'Xác nhận' }, { status: 'CANCELLED', label: 'Hủy' }],
  CONFIRMED: [{ status: 'COMPLETED', label: 'Hoàn tất' }, { status: 'NO_SHOW', label: 'Không đến' }, { status: 'CANCELLED', label: 'Hủy' }],
  CANCELLED: [],
  COMPLETED: [],
  NO_SHOW:   [],
};

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly statusLabel = STATUS_LABEL;
  readonly nextActions = NEXT_ACTIONS;
  readonly statusOptions: AppointmentStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'];

  readonly isLoading = signal(true);
  readonly appointments = signal<AdminAppointment[]>([]);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly itemsPerPage = 5;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly designersList = signal<AdminDesigner[]>([]);

  filterDesigner = signal('');
  filterStatus   = signal('');
  filterDateFrom = signal('');
  filterDateTo   = signal('');
  filterApplied  = signal(false);
  showDatePicker = signal(false);
  private activeDesigner = '';
  private activeStatus   = '';
  private activeDateFrom = '';
  private activeDateTo   = '';

  readonly filterDateDisplay = computed(() => {
    const from = this.filterDateFrom();
    const to   = this.filterDateTo();
    if (!from && !to) return '';
    const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (from && to)  return `${fmt(from)} - ${fmt(to)}`;
    return from ? fmt(from) : fmt(to);
  });

  // --- Modal đổi nhà thiết kế ---
  readonly activeModal = signal<'none' | 'reassign'>('none');
  readonly selectedAppointment = signal<AdminAppointment | null>(null);
  readonly reassignDesignerId = signal('');
  readonly reassignDate = signal('');
  readonly reassignSlots = signal<AdminSlot[]>([]);
  readonly reassignSlotId = signal('');
  readonly isSubmitting = signal(false);

  ngOnInit(): void {
    this.adminService.getDesigners().subscribe({
      next: (res) => { if (res.success) this.designersList.set(res.data); },
      error: () => this.notify.error('Không tải được danh sách nhà thiết kế.'),
    });
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.isLoading.set(true);
    this.adminService.getAppointments({
      page: this.currentPage(),
      limit: this.itemsPerPage,
      status: this.activeStatus || undefined,
      designerId: this.activeDesigner || undefined,
      dateFrom: this.activeDateFrom || undefined,
      dateTo: this.activeDateTo || undefined,
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) { this.appointments.set(res.appointments); this.total.set(res.total); }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách lịch hẹn.');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadAppointments();
  }

  onDateFromChange(val: string): void {
    this.filterDateFrom.set(val);
    if (val && this.filterDateTo()) this.showDatePicker.set(false);
  }

  onDateToChange(val: string): void {
    this.filterDateTo.set(val);
    if (this.filterDateFrom() && val) this.showDatePicker.set(false);
  }

  applyFilters(): void {
    this.activeDesigner = this.filterDesigner();
    this.activeStatus   = this.filterStatus();
    this.activeDateFrom = this.filterDateFrom();
    this.activeDateTo   = this.filterDateTo();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadAppointments();
  }

  clearFilters(): void {
    this.filterDesigner.set('');
    this.filterStatus.set('');
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.activeDesigner = '';
    this.activeStatus   = '';
    this.activeDateFrom = '';
    this.activeDateTo   = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadAppointments();
  }

  changeStatus(appt: AdminAppointment, status: AppointmentStatus): void {
    this.adminService.updateAppointmentStatus(appt.appointment_id, status).subscribe({
      next: () => { this.notify.success('Cập nhật trạng thái lịch hẹn thành công!'); this.loadAppointments(); },
      error: (err) => this.notify.error(err?.error?.message ?? 'Cập nhật trạng thái thất bại.'),
    });
  }

  openReassignModal(appt: AdminAppointment): void {
    this.selectedAppointment.set(appt);
    this.reassignDesignerId.set('');
    this.reassignDate.set(appt.slot_date?.slice(0, 10) ?? '');
    this.reassignSlots.set([]);
    this.reassignSlotId.set('');
    this.activeModal.set('reassign');
  }

  closeModal(): void {
    this.activeModal.set('none');
    this.selectedAppointment.set(null);
  }

  onReassignDesignerChange(designerId: string): void {
    this.reassignDesignerId.set(designerId);
    this.reassignSlotId.set('');
    this.loadReassignSlots();
  }

  onReassignDateChange(date: string): void {
    this.reassignDate.set(date);
    this.reassignSlotId.set('');
    this.loadReassignSlots();
  }

  private loadReassignSlots(): void {
    const designerId = this.reassignDesignerId();
    const date = this.reassignDate();
    if (!designerId || !date) { this.reassignSlots.set([]); return; }
    this.adminService.getDesignerSlots(designerId, date).subscribe({
      next: (res) => { if (res.success) this.reassignSlots.set(res.data.filter(s => s.is_available)); },
      error: () => this.notify.error('Không tải được khung giờ trống.'),
    });
  }

  submitReassign(): void {
    const appt = this.selectedAppointment();
    const slotId = this.reassignSlotId();
    if (!appt || !slotId) { this.notify.error('Vui lòng chọn khung giờ mới.'); return; }
    this.isSubmitting.set(true);
    this.adminService.reassignAppointment(appt.appointment_id, slotId).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.notify.success('Đổi lịch hẹn thành công!');
        this.closeModal();
        this.loadAppointments();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.notify.error(err?.error?.message ?? 'Đổi lịch hẹn thất bại.');
      },
    });
  }

  formatTime(t: string): string { return t ? t.slice(0, 5) : ''; }
  formatDate(d: string): string { return d ? new Date(d).toLocaleDateString('vi-VN') : ''; }
}
