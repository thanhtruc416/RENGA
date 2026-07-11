import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AdminCancellationRequest, CancellationStatus } from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

const STATUS_LABEL: Record<CancellationStatus, string> = {
  PENDING: 'CHỜ DUYỆT',
  APPROVED: 'ĐÃ DUYỆT (ĐÃ HỦY ĐƠN)',
  REJECTED: 'ĐÃ TỪ CHỐI',
};

const STATUS_BADGE_CLASS: Record<CancellationStatus, string> = {
  PENDING: 'status-badge--pending',
  APPROVED: 'status-badge--completed',
  REJECTED: 'status-badge--rejected',
};

@Component({
  selector: 'app-cancellation-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cancellation-management.component.html',
  styleUrl: './cancellation-management.component.css',
})
export class CancellationManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly statusLabel = STATUS_LABEL;
  readonly statusBadgeClass = STATUS_BADGE_CLASS;
  readonly statusOptions: CancellationStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];

  filterStatus  = signal('');
  filterSearch  = signal('');
  filterApplied = signal(false);
  private activeStatus = '';
  private activeSearch = '';

  readonly isLoading = signal(true);
  readonly requests = signal<AdminCancellationRequest[]>([]);
  readonly total = signal(0);
  currentPage = signal(1);
  readonly itemsPerPage = 5;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => getPageWindow(this.currentPage(), this.totalPages()));

  readonly selectedRequest = signal<AdminCancellationRequest | null>(null);
  readonly modalTab = signal<'approve' | 'reject'>('approve');
  readonly isSubmitting = signal(false);
  readonly rejectReasonCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  ngOnInit(): void { this.loadRequests(); }

  loadRequests(): void {
    this.isLoading.set(true);
    this.adminService.getCancellationRequests({
      page: this.currentPage(), limit: this.itemsPerPage,
      status: this.activeStatus || undefined, search: this.activeSearch || undefined,
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) { this.requests.set(res.requests); this.total.set(res.total); }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách yêu cầu hủy đơn.');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadRequests();
  }

  applyFilters(): void {
    this.activeStatus = this.filterStatus();
    this.activeSearch = this.filterSearch();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadRequests();
  }

  clearFilters(): void {
    this.filterStatus.set('');
    this.filterSearch.set('');
    this.activeStatus = '';
    this.activeSearch = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadRequests();
  }

  openModal(request: AdminCancellationRequest): void {
    this.selectedRequest.set(request);
    this.modalTab.set('approve');
    this.rejectReasonCtrl.reset('');
  }

  closeModal(): void { this.selectedRequest.set(null); }

  switchTab(tab: 'approve' | 'reject'): void { this.modalTab.set(tab); }

  submitProcess(): void {
    const req = this.selectedRequest();
    if (!req) return;
    const tab = this.modalTab();

    if (tab === 'reject' && this.rejectReasonCtrl.invalid) {
      this.notify.error('Vui lòng nhập lý do từ chối.');
      return;
    }

    this.isSubmitting.set(true);
    const req$ = tab === 'approve'
      ? this.adminService.approveCancellation(req.cancel_id)
      : this.adminService.rejectCancellation(req.cancel_id, this.rejectReasonCtrl.value);

    req$.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.notify.success(tab === 'approve' ? 'Đã duyệt hủy đơn — email đã gửi cho khách.' : 'Đã từ chối yêu cầu — email đã gửi cho khách.');
        this.closeModal();
        this.loadRequests();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.notify.error(err?.error?.message ?? 'Xử lý thất bại.');
      },
    });
  }
}
