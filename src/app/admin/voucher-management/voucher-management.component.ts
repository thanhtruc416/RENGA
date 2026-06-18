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
  }

  openModal(): void {
    this.voucherForm.reset({ discountType: 'percent', isActive: true });
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  generateCode(): void {
    const randomCode = 'RENGA_' + Math.random().toString(36).substring(2, 8).toUpperCase();
    this.voucherForm.controls.voucherCode.setValue(randomCode);
  }

  saveVoucher(): void {
    console.log('Dữ liệu lưu Voucher:', this.voucherForm.value);
    // Gọi API lưu dữ liệu ở đây
    this.closeModal();
  }
}