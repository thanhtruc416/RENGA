import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  LOCALE_ID,
  OnInit,
  signal,
} from '@angular/core';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import localeVi from '@angular/common/locales/vi';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

registerLocaleData(localeVi);

type OrderStatus = 'shipping' | 'completed' | 'cancelled' | 'in-progress';
type OrderType   = 'standard' | 'bespoke';

interface Order {
  id: string;
  type: OrderType;
  date: string;
  rawDate: Date;
  product: string;
  itemCount: number;
  amount: number;
  status: OrderStatus;
}

const DB_STATUS_MAP: Record<string, OrderStatus> = {
  PENDING:    'in-progress',
  CONFIRMED:  'in-progress',
  PROCESSING: 'in-progress',
  SHIPPED:    'shipping',
  SHIPPING:   'shipping',
  DISPATCHED: 'shipping',
  DELIVERED:  'completed',
  COMPLETED:  'completed',
  CANCELLED:  'cancelled',
  CANCELED:   'cancelled',
};

const PAGE_SIZE = 8;

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DecimalPipe],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css',
})
export class OrderTrackingComponent implements OnInit {
  private readonly http        = inject(HttpClient);
  private readonly destroyRef  = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  readonly isGuest    = computed(() => !this.authService.isLoggedIn());
  readonly isLoading  = signal(true);
  readonly loadError  = signal(false);
  readonly allOrders  = signal<Order[]>([]);

  readonly memberTier = signal('');

  ngOnInit(): void {
    if (this.isGuest()) { this.isLoading.set(false); return; }
    this.http
      .get<{ success: boolean; data: any[] }>(`${environment.apiUrl}/orders`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.allOrders.set(res.data.map(o => this.mapOrder(o)));
          } else {
            this.loadError.set(true);
          }
          this.isLoading.set(false);
        },
        error: () => { this.loadError.set(true); this.isLoading.set(false); },
      });
  }

  private mapOrder(raw: any): Order {
    const d = new Date(raw.created_at);
    const dd   = String(d.getDate()).padStart(2, '0');
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return {
      id:        raw.order_id,
      type:      raw.order_type === 'CUSTOMIZATION' ? 'bespoke' : 'standard',
      date:      `${dd}/${mm}/${yyyy}`,
      rawDate:   d,
      product:   raw.first_product_name ?? 'Sản phẩm',
      itemCount: Number(raw.item_count ?? 1),
      amount:    Number(raw.total_amount),
      status:    DB_STATUS_MAP[raw.order_status] ?? 'in-progress',
    };
  }

  // ─── Filter state ────────────────────────────────────────────────────────
  readonly pendingStatus = signal('');
  readonly pendingTime   = signal('all');
  readonly filterStatus  = signal('');
  readonly filterTime    = signal('all');

  // ─── Pagination ──────────────────────────────────────────────────────────
  readonly currentPage = signal(1);

  // ─── Derived ─────────────────────────────────────────────────────────────
  readonly filteredOrders = computed(() => {
    const status  = this.filterStatus();
    const timePeriod = this.filterTime();
    const cutoff  = this.getCutoff(timePeriod);

    return this.allOrders().filter(o =>
      (!status || o.status === status) &&
      (!cutoff || o.rawDate >= cutoff)
    );
  });

  private getCutoff(period: string): Date | null {
    if (period === 'all') return null;
    const now = new Date();
    if (period === '3m')  { now.setMonth(now.getMonth() - 3);   return now; }
    if (period === '6m')  { now.setMonth(now.getMonth() - 6);   return now; }
    if (period === '1y')  { now.setFullYear(now.getFullYear() - 1); return now; }
    return null;
  }

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredOrders().length / PAGE_SIZE))
  );

  readonly displayedOrders = computed(() => {
    const page  = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredOrders().slice(start, start + PAGE_SIZE);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  readonly paginationInfo = computed(() => {
    const total = this.filteredOrders().length;
    if (!total) return 'Không có đơn hàng nào';
    const page = this.currentPage();
    const from = (page - 1) * PAGE_SIZE + 1;
    const to   = Math.min(page * PAGE_SIZE, total);
    return `Hiển thị ${from}–${to} trên tổng số ${total} đơn hàng`;
  });

  // ─── Labels & CSS ─────────────────────────────────────────────────────────
  readonly statusLabel: Record<OrderStatus, string> = {
    'shipping':    'Đang giao hàng',
    'completed':   'Đã hoàn thành',
    'cancelled':   'Đã hủy',
    'in-progress': 'Đang xử lý',
  };

  badgeClass(status: OrderStatus): string {
    return `order-tracking-badge order-tracking-badge--${status}`;
  }

  rowClass(status: OrderStatus): string {
    return status === 'cancelled'
      ? 'order-tracking-table__row order-tracking-table__row--cancelled'
      : 'order-tracking-table__row';
  }

  // ─── Actions ──────────────────────────────────────────────────────────────
  readonly hasActiveFilters = computed(() =>
    this.filterStatus() !== '' || this.filterTime() !== 'all'
  );

  readonly hasDraftChanges = computed(() =>
    this.pendingStatus() !== this.filterStatus() ||
    this.pendingTime()   !== this.filterTime()
  );

  applyFilters(): void {
    this.filterStatus.set(this.pendingStatus());
    this.filterTime.set(this.pendingTime());
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.pendingStatus.set('');
    this.pendingTime.set('all');
    this.filterStatus.set('');
    this.filterTime.set('all');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  onFilterStatusChange(event: Event): void {
    this.pendingStatus.set((event.target as HTMLSelectElement).value);
  }

  onFilterTimeChange(event: Event): void {
    this.pendingTime.set((event.target as HTMLSelectElement).value);
  }
}