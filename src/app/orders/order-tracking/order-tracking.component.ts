import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type OrderStatus = 'shipping' | 'completed' | 'cancelled' | 'in-progress';
type OrderType = 'standard' | 'bespoke';

interface Order {
  id: string;
  type: OrderType;
  sub: string;
  date: string;
  product: string;
  amount: string;
  status: OrderStatus;
}

const ALL_ORDERS: Order[] = [
  { id: '#AH-29384', type: 'standard', sub: 'Luxury Packaging',  date: '14/05/2024', product: 'Bespoke Diamond Tiara',      amount: '850.000.000₫', status: 'shipping'    },
  { id: '#AH-28110', type: 'standard', sub: 'Certified GIA',      date: '22/03/2024', product: 'Aurelian Gold Cufflinks',   amount: '42.500.000₫',  status: 'completed'   },
  { id: '#AH-27552', type: 'standard', sub: 'Vintage Replica',    date: '02/01/2024', product: 'Heritage Emerald Necklace', amount: '320.000.000₫', status: 'completed'   },
  { id: '#AH-26991', type: 'standard', sub: 'Boutique Pickup',    date: '15/11/2023', product: 'Starlight Pearl Earrings',  amount: '18.200.000₫',  status: 'cancelled'   },
  { id: '#AH-26543', type: 'standard', sub: 'Standard',           date: '02/09/2023', product: 'Aurelian Signet Ring',      amount: '35.000.000₫',  status: 'completed'   },
  { id: '#AH-26100', type: 'bespoke',  sub: 'Certified GIA',      date: '11/07/2023', product: 'Celestial Diamond Brooch',  amount: '120.000.000₫', status: 'completed'   },
  { id: '#AH-25800', type: 'bespoke',  sub: 'Bespoke',            date: '30/05/2023', product: 'Heritage Ruby Pendant',     amount: '75.000.000₫',  status: 'in-progress' },
  { id: '#AH-25400', type: 'standard', sub: 'Boutique Pickup',    date: '14/03/2023', product: 'Lunar Pearl Bracelet',      amount: '28.000.000₫',  status: 'completed'   },
  { id: '#AH-24900', type: 'bespoke',  sub: 'Standard',           date: '01/02/2023', product: 'Midnight Sapphire Ring',    amount: '55.000.000₫',  status: 'cancelled'   },
  { id: '#AH-24300', type: 'standard', sub: 'Luxury Packaging',   date: '20/12/2022', product: 'Soleil Gold Choker',        amount: '48.000.000₫',  status: 'completed'   },
  { id: '#AH-23900', type: 'bespoke',  sub: 'Certified GIA',      date: '05/10/2022', product: 'Eternity Diamond Band',     amount: '180.000.000₫', status: 'completed'   },
  { id: '#AH-23400', type: 'standard', sub: 'Standard',           date: '18/08/2022', product: 'Aurora Emerald Earrings',   amount: '62.000.000₫',  status: 'completed'   },
];

const PAGE_SIZE = 4;

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css',
})
export class OrderTrackingComponent {
  // ─── Filter state ─────────────────────────────────────────────────────
  readonly filterType   = signal('');
  readonly filterStatus = signal('');
  readonly filterTime   = signal('3m');

  // ─── Pagination ───────────────────────────────────────────────────────
  readonly currentPage = signal(1);

  // ─── Derived ──────────────────────────────────────────────────────────
  readonly filteredOrders = computed(() => {
    const status = this.filterStatus();
    const type   = this.filterType();
    return ALL_ORDERS.filter(o =>
      (!status || o.status === status) &&
      (!type   || o.type   === type),
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredOrders().length / PAGE_SIZE)),
  );

  readonly displayedOrders = computed(() => {
    const page = this.currentPage();
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
    shipping:    'Đang giao hàng',
    completed:   'Đã hoàn thành',
    cancelled:   'Đã hủy',
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

  // ─── Actions ─────────────────────────────────────────────────────────
  applyFilters(): void {
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onFilterStatusChange(event: Event): void {
    this.filterStatus.set((event.target as HTMLSelectElement).value);
  }

  onFilterTypeChange(event: Event): void {
    this.filterType.set((event.target as HTMLSelectElement).value);
  }

  onFilterTimeChange(event: Event): void {
    this.filterTime.set((event.target as HTMLSelectElement).value);
  }
}
