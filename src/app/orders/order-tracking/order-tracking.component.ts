import {
  ChangeDetectionStrategy,
  Component,
  computed,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { RouterLink } from '@angular/router';
import localeVi from '@angular/common/locales/vi';

registerLocaleData(localeVi);

type OrderStatus = 'shipping' | 'completed' | 'cancelled' | 'in-progress';
type OrderType = 'standard' | 'bespoke';

interface Order {
  id: string;
  type: OrderType;
  sub: string;
  date: string;
  product: string;
  amount: number;   // ← đổi string → number để dùng | number pipe
  status: OrderStatus;
}

const ALL_ORDERS: Order[] = [
  { id: '#AH-29384', type: 'standard', sub: 'Luxury Packaging', date: '14/05/2024', product: 'Bespoke Diamond Tiara',      amount: 850_000_000, status: 'shipping'    },
  { id: '#AH-28110', type: 'standard', sub: 'Certified GIA',    date: '22/03/2024', product: 'Aurelian Gold Cufflinks',   amount: 42_500_000,  status: 'completed'   },
  { id: '#AH-27552', type: 'standard', sub: 'Vintage Replica',  date: '02/01/2024', product: 'Heritage Emerald Necklace', amount: 320_000_000, status: 'completed'   },
  { id: '#AH-26991', type: 'standard', sub: 'Boutique Pickup',  date: '15/11/2023', product: 'Starlight Pearl Earrings',  amount: 18_200_000,  status: 'cancelled'   },
  { id: '#AH-26543', type: 'standard', sub: 'Standard',         date: '02/09/2023', product: 'Aurelian Signet Ring',      amount: 35_000_000,  status: 'completed'   },
  { id: '#C-26100',  type: 'bespoke',  sub: 'Certified GIA',    date: '11/07/2023', product: 'Celestial Diamond Brooch',  amount: 120_000_000, status: 'completed'   },
  { id: '#C-25800',  type: 'bespoke',  sub: 'Bespoke',          date: '30/05/2023', product: 'Heritage Ruby Pendant',     amount: 75_000_000,  status: 'in-progress' },
  { id: '#AH-25400', type: 'standard', sub: 'Boutique Pickup',  date: '14/03/2023', product: 'Lunar Pearl Bracelet',      amount: 28_000_000,  status: 'completed'   },
  { id: '#C-24900',  type: 'bespoke',  sub: 'Standard',         date: '01/02/2023', product: 'Midnight Sapphire Ring',    amount: 55_000_000,  status: 'cancelled'   },
  { id: '#AH-24300', type: 'standard', sub: 'Luxury Packaging', date: '20/12/2022', product: 'Soleil Gold Choker',        amount: 48_000_000,  status: 'completed'   },
  { id: '#C-23900',  type: 'bespoke',  sub: 'Certified GIA',    date: '05/10/2022', product: 'Eternity Diamond Band',     amount: 180_000_000, status: 'completed'   },
  { id: '#AH-23400', type: 'standard', sub: 'Standard',         date: '18/08/2022', product: 'Aurora Emerald Earrings',   amount: 62_000_000,  status: 'completed'   },
  { id: '#C-30201', type: 'bespoke',  sub: 'Bespoke',          date: '20/06/2024', product: 'Custom Engraved Solitaire', amount: 95_000_000,  status: 'in-progress' },
];

const PAGE_SIZE = 4;

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DecimalPipe],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css',
})
export class OrderTrackingComponent {

  // ─── Member tier (TODO: lấy từ AuthService / AccountService) ─────────
  readonly memberTier = signal('Gold Heritage Tier');

  // ─── Filter state: pending (UI) vs applied (table) ────────────────────
  readonly pendingType   = signal('');
  readonly pendingStatus = signal('');
  readonly pendingTime   = signal('3m');

  readonly filterType   = signal('');
  readonly filterStatus = signal('');
  readonly filterTime   = signal('3m');

  // ─── Pagination ───────────────────────────────────────────────────────
  readonly currentPage = signal(1);

  // ─── Derived ──────────────────────────────────────────────────────────
  readonly filteredOrders = computed(() => {
    const status = this.filterStatus();
    const type   = this.filterType();
    return ALL_ORDERS.filter((o) =>
      (!status || o.status === status) &&
      (!type   || o.type   === type),
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredOrders().length / PAGE_SIZE)),
  );

  readonly displayedOrders = computed(() => {
    const page  = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredOrders().slice(start, start + PAGE_SIZE);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  readonly paginationInfo = computed(() => {
    const total = this.filteredOrders().length;
    const page  = this.currentPage();
    const from  = (page - 1) * PAGE_SIZE + 1;
    const to    = Math.min(page * PAGE_SIZE, total);
    return `Hiển thị ${from}–${to} trên tổng số ${total} đơn hàng`;
  });

  // ─── Labels & CSS helpers ─────────────────────────────────────────────
  readonly statusLabel: Record<OrderStatus, string> = {
    'shipping':    'Đang giao hàng',
    'completed':   'Đã hoàn thành',
    'cancelled':   'Đã hủy',
    'in-progress': 'Đang chế tác',
  };

  badgeClass(status: OrderStatus): string {
    return `order-tracking-badge order-tracking-badge--${status}`;
  }

  rowClass(status: OrderStatus): string {
    return status === 'cancelled'
      ? 'order-tracking-table__row order-tracking-table__row--cancelled'
      : 'order-tracking-table__row';
  }

  /** Bỏ ký tự # khỏi id — dùng cho routerLink param */
  cleanId(id: string): string {
    return id.replace('#', '');
  }

  // ─── Actions ──────────────────────────────────────────────────────────
  readonly hasActiveFilters = computed(() =>
    this.filterType() !== '' || this.filterStatus() !== '' || this.filterTime() !== '3m'
  );

  applyFilters(): void {
    this.filterType.set(this.pendingType());
    this.filterStatus.set(this.pendingStatus());
    this.filterTime.set(this.pendingTime());
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.pendingType.set('');
    this.pendingStatus.set('');
    this.pendingTime.set('3m');
    this.filterType.set('');
    this.filterStatus.set('');
    this.filterTime.set('3m');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onFilterStatusChange(event: Event): void {
    this.pendingStatus.set((event.target as HTMLSelectElement).value);
  }

  onFilterTypeChange(event: Event): void {
    this.pendingType.set((event.target as HTMLSelectElement).value);
  }

  onFilterTimeChange(event: Event): void {
    this.pendingTime.set((event.target as HTMLSelectElement).value);
  }
}