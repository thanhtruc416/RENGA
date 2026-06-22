import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// --- INTERFACES ---
export interface Voucher {
  readonly id: string;
  readonly code: string;
  readonly campaign: string;
  readonly type: 'percent' | 'fixed' | 'freeship';
  readonly typeLabel: string;
  readonly used: number;
  readonly limit: number;
  readonly expiryDate: string;
  readonly status: 'active' | 'expired';
  isHidden?: boolean; 
}

// --- TYPED FORM ---
interface VoucherForm {
  campaignName: FormControl<string>;
  voucherCode: FormControl<string>;
  discountType: FormControl<string>;
  discountValue: FormControl<number | null>;
  minOrder: FormControl<number | null>;
  maxDiscount: FormControl<number | null>;
  usageLimit: FormControl<number | null>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  isActive: FormControl<boolean>;
}

@Component({
  selector: 'app-voucher-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './voucher-management.component.html',
  styleUrl: './voucher-management.component.css'
})
export class VoucherManagementComponent {
  // --- STATE (SIGNALS) ---
  readonly isModalOpen = signal<boolean>(false);

  readonly showToast = signal<boolean>(false);
  readonly toastType = signal<'success' | 'error'>('success');
  readonly toastMessage = signal<string>('');

  readonly currentPage = signal<number>(1);
  readonly itemsPerPage = 5; 

   readonly totalItems = computed(() => this.filteredVouchers().length);
  
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.itemsPerPage)));
  
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly paginatedVouchers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredVouchers().slice(startIndex, startIndex + this.itemsPerPage);
  });

  private editingVoucherId: string | null = null;

  filterStatus    = signal('');
  filterType      = signal('');
  filterDateFrom  = signal('');
  filterDateTo    = signal('');
  filterApplied   = signal(false);
  activeStatus    = signal('');
  activeType      = signal('');
  activeDateFrom  = signal('');
  activeDateTo    = signal('');

  // Mock data theo đúng thiết kế Figma
  readonly vouchers = signal<Voucher[]>([
    {
      id: 'v1', code: 'SUMMER_VIBE_24', campaign: 'Seasonal Solstice Sale',
      type: 'percent', typeLabel: '15% OFF', used: 428, limit: 1000,
      expiryDate: '12/2/2027', status: 'active'
    },
    {
      id: 'v2', code: 'FIRST_JEWEL_50', campaign: 'New Customer',
      type: 'fixed', typeLabel: '50K FIXED', used: 410, limit: 500,
      expiryDate: '25/5/2026', status: 'active'
    },
    {
      id: 'v3', code: 'FIRST_JEWEL_50', campaign: 'New Customer',
      type: 'fixed', typeLabel: '50K FIXED', used: 410, limit: 500,
      expiryDate: '25/5/2026', status: 'active'
    },
    {
      id: 'v4', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    },
    {
      id: 'v5', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    },
    {
      id: 'v6', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    },
    {
      id: 'v7', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    },
    {
      id: 'v8', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    },
    {
      id: 'v9', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    },
    {
      id: 'v10', code: 'SHIP_FREE_LUXE', campaign: 'VIP Flash Weekend',
      type: 'freeship', typeLabel: 'FREESHIP', used: 150, limit: 150,
      expiryDate: '10/10/2024', status: 'expired'
    }
  ]);

  // Khởi tạo Form typed rõ ràng
  readonly voucherForm = new FormGroup<VoucherForm>({
    campaignName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    voucherCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    discountType: new FormControl('percent', { nonNullable: true }),
    discountValue: new FormControl(null),
    minOrder: new FormControl(null),
    maxDiscount: new FormControl(null),
    usageLimit: new FormControl(null),
    startDate: new FormControl('', { nonNullable: true }),
    endDate: new FormControl('', { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true })
  });

  readonly filteredVouchers = computed(() => {
    const status   = this.activeStatus();
    const type     = this.activeType();
    const dateFrom = this.activeDateFrom();
    const dateTo   = this.activeDateTo();
    if (!status && !type && !dateFrom && !dateTo) return this.vouchers();
    return this.vouchers().filter(v => {
      if (status && v.status !== status) return false;
      if (type   && v.type   !== type)   return false;
      if (dateFrom || dateTo) {
        const expiry = this._parseDate(v.expiryDate);
        if (!expiry) return false;
        if (dateFrom && expiry < new Date(dateFrom)) return false;
        if (dateTo   && expiry > new Date(dateTo))   return false;
      }
      return true;
    });
  });

  private _parseDate(s: string): Date | null {
    const parts = s.split('/').map(Number);
    if (parts.length !== 3) return null;
    const [d, m, y] = parts;
    return new Date(y, m - 1, d);
  }

  // --- METHODS ---
  applyFilters(): void {
    this.activeStatus.set(this.filterStatus());
    this.activeType.set(this.filterType());
    this.activeDateFrom.set(this.filterDateFrom());
    this.activeDateTo.set(this.filterDateTo());
    this.filterApplied.set(true);
    this.filterApplied.set(true);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.filterStatus.set('');
    this.filterType.set('');
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.activeStatus.set('');
    this.activeType.set('');
    this.activeDateFrom.set('');
    this.activeDateTo.set('');
    this.filterApplied.set(false);
    this.filterApplied.set(false);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
  openModal(): void {
    this.voucherForm.reset({ discountType: 'percent', isActive: true });
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  editVoucher(voucher: Voucher): void {
    if (voucher.isHidden) return;
    this.editingVoucherId = voucher.id;
    
    // Điền dữ liệu vào form. 
    // Lưu ý: Vì mock data của bạn chưa có đủ các trường như minOrder, maxDiscount... 
    // nên tôi sẽ map tạm các trường có sẵn. Trong thực tế, bạn sẽ gọi API lấy chi tiết voucher.
    this.voucherForm.patchValue({
      campaignName: voucher.campaign,
      voucherCode: voucher.code,
      discountType: voucher.type,
      // Giả lập tách số từ chuỗi '15% OFF' hoặc '50K FIXED'
      discountValue: parseInt(voucher.typeLabel.replace(/\D/g, '')) || 0, 
      usageLimit: voucher.limit,
      startDate: '01/01/2024', // Mock data
      endDate: voucher.expiryDate,
      isActive: voucher.status === 'active'
    });

    this.isModalOpen.set(true);
  }

  


  generateCode(): void {
    const randomCode = 'RENGA_' + Math.random().toString(36).substring(2, 8).toUpperCase();
    this.voucherForm.controls.voucherCode.setValue(randomCode);
  }

  saveVoucher(): void {
    if (this.voucherForm.invalid) {
      this.displayToast('Vui lòng điền đầy đủ các trường bắt buộc!','error');
      return; 
    }

    const formData = this.voucherForm.value;
    
    if (this.editingVoucherId) {
      console.log(`Cập nhật Voucher ID ${this.editingVoucherId}:`, formData);
      this.displayToast('Cập nhật voucher thành công!', 'success');
      // TODO: Gọi API PUT /vouchers/:id
    } else {
      console.log('Tạo Voucher mới:', formData);
      this.displayToast('Tạo voucher mới thành công!', 'success');
      // TODO: Gọi API POST /vouchers
    }

    this.closeModal();
  }

  // Thêm hàm xử lý Ẩn/Hiện Voucher
  toggleVisibility(voucher: Voucher): void {
    // 1. Cập nhật mảng vouchers trong Signal để Angular render lại giao diện
    this.vouchers.update(currentVouchers => 
      currentVouchers.map(v => 
        v.id === voucher.id ? { ...v, isHidden: !v.isHidden } : v
      )
    );

    // 2. Lấy trạng thái mới để hiện Toast
    const isNowHidden = !voucher.isHidden; 
    const actionName = isNowHidden ? 'Ẩn' : 'Hiện';
    
    // 3. Gọi hàm displayToast có sẵn của bạn
    this.displayToast(`${actionName} voucher thành công!`, 'success');
  }

  private displayToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage.set(message);
    this.toastType.set(type); // Set loại màu sắc
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}