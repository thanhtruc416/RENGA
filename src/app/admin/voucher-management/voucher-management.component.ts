import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AdminVoucher, AdminVoucherInput, VoucherStatus } from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';

interface VoucherForm {
  voucherCode: FormControl<string>;
  discountType: FormControl<'PERCENTAGE' | 'FIXED_AMOUNT'>;
  discountValue: FormControl<number | null>;
  minOrderValue: FormControl<number | null>;
  maxDiscountAmount: FormControl<number | null>;
  usageLimit: FormControl<number | null>;
  validFrom: FormControl<string>;
  validTo: FormControl<string>;
  isActive: FormControl<boolean>;
}

const STATUS_LABEL: Record<VoucherStatus, string> = { ACTIVE: 'ACTIVE', INACTIVE: 'ẨN', EXPIRED: 'EXPIRED' };

@Component({
  selector: 'app-voucher-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './voucher-management.component.html',
  styleUrl: './voucher-management.component.css'
})
export class VoucherManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly statusLabel = STATUS_LABEL;

  filterStatus  = signal('');
  filterSearch  = signal('');
  filterApplied = signal(false);
  private activeStatus = '';
  private activeSearch = '';

  readonly isLoading = signal(true);
  readonly vouchers = signal<AdminVoucher[]>([]);
  readonly total = signal(0);
  currentPage = signal(1);
  readonly itemsPerPage = 5;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly isModalOpen = signal(false);
  readonly editingVoucherId = signal<string | null>(null);
  readonly isSubmitting = signal(false);

  readonly voucherForm = new FormGroup<VoucherForm>({
    voucherCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    discountType: new FormControl('PERCENTAGE', { nonNullable: true }),
    discountValue: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
    minOrderValue: new FormControl<number | null>(0),
    maxDiscountAmount: new FormControl<number | null>(null),
    usageLimit: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
    validFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    validTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    isActive: new FormControl(true, { nonNullable: true }),
  });

  readonly toastConfig = signal<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });

  ngOnInit(): void { this.loadVouchers(); }

  loadVouchers(): void {
    this.isLoading.set(true);
    this.adminService.getVouchers({
      page: this.currentPage(), limit: this.itemsPerPage,
      status: this.activeStatus || undefined, search: this.activeSearch || undefined,
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) { this.vouchers.set(res.vouchers); this.total.set(res.total); }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách voucher.');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadVouchers();
  }

  applyFilters(): void {
    this.activeStatus = this.filterStatus();
    this.activeSearch = this.filterSearch();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadVouchers();
  }

  clearFilters(): void {
    this.filterStatus.set('');
    this.filterSearch.set('');
    this.activeStatus = '';
    this.activeSearch = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadVouchers();
  }

  openModal(): void {
    this.editingVoucherId.set(null);
    this.voucherForm.reset({
      voucherCode: '', discountType: 'PERCENTAGE', discountValue: null, minOrderValue: 0,
      maxDiscountAmount: null, usageLimit: null, validFrom: '', validTo: '', isActive: true,
    });
    this.isModalOpen.set(true);
  }

  closeModal(): void { this.isModalOpen.set(false); }

  generateCode(): void {
    const code = 'RENGA_' + Math.random().toString(36).slice(2, 8).toUpperCase();
    this.voucherForm.controls.voucherCode.setValue(code);
  }

  editVoucher(voucher: AdminVoucher): void {
    this.adminService.getVoucher(voucher.voucher_id).subscribe({
      next: (res) => {
        if (!res.success) return;
        const v = res.data;
        this.editingVoucherId.set(v.voucher_id);
        this.voucherForm.reset({
          voucherCode: v.voucher_code,
          discountType: v.discount_type,
          discountValue: Number(v.discount_value),
          minOrderValue: Number(v.min_order_value),
          maxDiscountAmount: v.max_discount_amount !== null ? Number(v.max_discount_amount) : null,
          usageLimit: v.usage_limit,
          validFrom: v.valid_from.slice(0, 10),
          validTo: v.valid_to.slice(0, 10),
          isActive: v.effective_status !== 'INACTIVE',
        });
        this.isModalOpen.set(true);
      },
      error: () => this.notify.error('Không tải được chi tiết voucher.'),
    });
  }

  saveVoucher(): void {
    if (this.voucherForm.invalid) {
      this.displayToast('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
      return;
    }
    const f = this.voucherForm.getRawValue();
    const payload: AdminVoucherInput = {
      voucherCode: f.voucherCode,
      discountType: f.discountType,
      discountValue: f.discountValue!,
      minOrderValue: f.minOrderValue ?? 0,
      maxDiscountAmount: f.maxDiscountAmount,
      usageLimit: f.usageLimit!,
      validFrom: f.validFrom,
      validTo: f.validTo,
      status: f.isActive ? 'ACTIVE' : 'INACTIVE',
    };

    this.isSubmitting.set(true);
    const editingId = this.editingVoucherId();
    const req$ = editingId ? this.adminService.updateVoucher(editingId, payload) : this.adminService.createVoucher(payload);
    req$.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.displayToast(editingId ? 'Cập nhật voucher thành công!' : 'Tạo voucher mới thành công!', 'success');
        this.closeModal();
        this.loadVouchers();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.displayToast(err?.error?.message ?? 'Lưu voucher thất bại.', 'error');
      },
    });
  }

  toggleVisibility(voucher: AdminVoucher): void {
    const newStatus: VoucherStatus = voucher.effective_status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.adminService.updateVoucher(voucher.voucher_id, { status: newStatus }).subscribe({
      next: () => { this.displayToast(newStatus === 'ACTIVE' ? 'Hiện voucher thành công!' : 'Ẩn voucher thành công!', 'success'); this.loadVouchers(); },
      error: () => this.displayToast('Cập nhật trạng thái thất bại.', 'error'),
    });
  }

  private displayToast(message: string, type: 'success' | 'error'): void {
    this.toastConfig.set({ show: true, message, type });
    setTimeout(() => this.toastConfig.update(p => ({ ...p, show: false })), 3000);
  }

  discountLabel(v: AdminVoucher): string {
    return v.discount_type === 'PERCENTAGE' ? `${v.discount_value}%` : `${Number(v.discount_value).toLocaleString('vi-VN')}đ`;
  }
}
