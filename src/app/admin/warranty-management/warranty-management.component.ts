import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AdminWarrantyRequest, WarrantyStats, WarrantyStatus } from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

const STATUS_LABEL: Record<WarrantyStatus, string> = {
  PENDING: 'CHỜ XỬ LÝ',
  QUOTED: 'CHỜ KHÁCH PHẢN HỒI',
  ACCEPTED: 'ĐÃ CHẤP NHẬN',
  REJECTED: 'ĐÃ TỪ CHỐI',
  IN_PROGRESS: 'ĐANG SỬA CHỮA',
  COMPLETED: 'ĐÃ HOÀN TẤT',
};

const STATUS_BADGE_CLASS: Record<WarrantyStatus, string> = {
  PENDING: 'status-badge--pending',
  QUOTED: 'status-badge--quoted',
  ACCEPTED: 'status-badge--processing',
  REJECTED: 'status-badge--rejected',
  IN_PROGRESS: 'status-badge--processing',
  COMPLETED: 'status-badge--completed',
};

@Component({
  selector: 'app-warranty-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './warranty-management.component.html',
  styleUrl: './warranty-management.component.css'
})
export class WarrantyManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly statusLabel = STATUS_LABEL;
  readonly statusBadgeClass = STATUS_BADGE_CLASS;
  readonly statusOptions: WarrantyStatus[] = ['PENDING', 'QUOTED', 'ACCEPTED', 'IN_PROGRESS', 'REJECTED', 'COMPLETED'];

  filterStatus   = signal('');
  filterSearch   = signal('');
  filterApplied  = signal(false);
  private activeStatus = '';
  private activeSearch = '';

  readonly stats = signal<WarrantyStats | null>(null);

  readonly isLoading = signal(true);
  readonly requests  = signal<AdminWarrantyRequest[]>([]);
  readonly total = signal(0);
  currentPage = signal(1);
  readonly itemsPerPage = 5;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => getPageWindow(this.currentPage(), this.totalPages()));

  // --- Modal xử lý ---
  readonly selectedRequest = signal<AdminWarrantyRequest | null>(null);
  readonly modalTab = signal<'accept' | 'reject' | 'quote'>('accept');
  readonly isSubmitting = signal(false);
  readonly rejectReasonCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly quoteCostCtrl = new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] });
  readonly quoteTimeCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  // --- Modal xem chi tiết ---
  readonly viewingRequest = signal<AdminWarrantyRequest | null>(null);

  ngOnInit(): void {
    this.loadStats();
    this.loadRequests();
  }

  private loadStats(): void {
    this.adminService.getWarrantyStats().subscribe({
      next: (res) => { if (res.success) this.stats.set(res.data); },
      error: () => this.notify.error('Không tải được số liệu bảo hành.'),
    });
  }

  loadRequests(): void {
    this.isLoading.set(true);
    this.adminService.getWarrantyRequests({
      page: this.currentPage(), limit: this.itemsPerPage,
      status: this.activeStatus || undefined, search: this.activeSearch || undefined,
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) { this.requests.set(res.requests); this.total.set(res.total); }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách yêu cầu bảo hành.');
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

  openViewModal(request: AdminWarrantyRequest): void { this.viewingRequest.set(request); }
  closeViewModal(): void { this.viewingRequest.set(null); }

  openModal(request: AdminWarrantyRequest): void {
    this.selectedRequest.set(request);
    this.modalTab.set('accept');
    this.rejectReasonCtrl.reset('');
    this.quoteCostCtrl.reset(null);
    this.quoteTimeCtrl.reset('');
  }

  closeModal(): void { this.selectedRequest.set(null); }

  switchTab(tab: 'accept' | 'reject' | 'quote'): void { this.modalTab.set(tab); }

  submitProcess(): void {
    const req = this.selectedRequest();
    if (!req) return;
    const tab = this.modalTab();

    if (tab === 'reject' && this.rejectReasonCtrl.invalid) {
      this.notify.error('Vui lòng nhập lý do từ chối.');
      return;
    }
    if (tab === 'quote' && (this.quoteCostCtrl.invalid || this.quoteTimeCtrl.invalid)) {
      this.notify.error('Vui lòng nhập đầy đủ chi phí và thời gian dự kiến.');
      return;
    }

    this.isSubmitting.set(true);

    if (tab === 'quote') {
      this.adminService.sendWarrantyQuote(req.warranty_id, this.quoteCostCtrl.value!, this.quoteTimeCtrl.value).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.notify.success('Đã gửi báo giá cho khách hàng!');
          this.closeModal();
          this.loadRequests();
          this.loadStats();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.notify.error(err?.error?.message ?? 'Gửi báo giá thất bại.');
        },
      });
      return;
    }

    const status: WarrantyStatus = tab === 'accept' ? 'ACCEPTED' : 'REJECTED';
    this.adminService.updateWarrantyStatus(req.warranty_id, status, tab === 'reject' ? this.rejectReasonCtrl.value : undefined).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.notify.success('Cập nhật trạng thái thành công!');
        this.closeModal();
        this.loadRequests();
        this.loadStats();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.notify.error(err?.error?.message ?? 'Cập nhật trạng thái thất bại.');
      },
    });
  }

  advanceStatus(req: AdminWarrantyRequest, status: WarrantyStatus): void {
    this.adminService.updateWarrantyStatus(req.warranty_id, status).subscribe({
      next: () => { this.notify.success('Cập nhật trạng thái thành công!'); this.loadRequests(); this.loadStats(); },
      error: (err) => this.notify.error(err?.error?.message ?? 'Cập nhật trạng thái thất bại.'),
    });
  }
}
