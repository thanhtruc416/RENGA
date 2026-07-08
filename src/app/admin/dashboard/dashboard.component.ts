import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService, DashboardStats } from '../admin.service';
import { formatPrice } from '../../shared/utils/currency.util';
import { NotificationService } from '../../core/services/notification.service';

interface OrderStatusBar {
  readonly status: string;
  readonly label: string;
  readonly count: number;
  readonly barColor: string;
  readonly barWidthPct: number;
}

interface TopProductBar {
  readonly name: string;
  readonly totalSold: number;
  readonly heightPx: number;
  readonly color: string;
}

const STATUS_LABEL: Record<string, string> = {
  PENDING:            'CHỜ THANH TOÁN',
  PAYMENT_CONFIRMED:  'ĐÃ THANH TOÁN',
  PACKED:             'ĐANG ĐÓNG GÓI',
  SHIPPED:            'ĐANG GIAO',
  COMPLETED:          'HOÀN TẤT',
  CANCELLED:          'ĐÃ HỦY',
};

const STATUS_COLOR: Record<string, string> = {
  PENDING:            '#c4607e',
  CANCELLED:          '#e05070',
};

const BAR_COLORS = ['#c4607e', '#c4607e', '#d98098', '#e8a8b8', '#f2cdd6'];

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly isLoading = signal(true);

  readonly formatPrice = formatPrice;

  readonly completedCount = computed(() => {
    return this.stats()?.orderStatusCounts.find(s => s.status === 'COMPLETED')?.count ?? 0;
  });

  readonly avgOrderValue = computed(() => {
    const s = this.stats();
    if (!s || this.completedCount() === 0) return 0;
    return Math.round(s.totalRevenue / this.completedCount());
  });

  readonly orderStatusBars = computed<OrderStatusBar[]>(() => {
    const s = this.stats();
    if (!s) return [];
    const max = Math.max(...s.orderStatusCounts.map(o => o.count), 1);
    return s.orderStatusCounts.map(o => ({
      status: o.status,
      label: STATUS_LABEL[o.status] ?? o.status,
      count: o.count,
      barColor: STATUS_COLOR[o.status] ?? '#1a1a1a',
      barWidthPct: Math.max((o.count / max) * 100, o.count > 0 ? 4 : 0),
    }));
  });

  readonly topProductBars = computed<TopProductBar[]>(() => {
    const s = this.stats();
    if (!s || !s.topProducts.length) return [];
    const max = Math.max(...s.topProducts.map(p => p.totalSold), 1);
    return s.topProducts.map((p, i) => ({
      name: p.name,
      totalSold: p.totalSold,
      heightPx: Math.max((p.totalSold / max) * 110, 20),
      color: BAR_COLORS[i] ?? '#c4607e',
    }));
  });

  ngOnInit(): void {
    this.adminService.getDashboard().subscribe({
      next: (res) => {
        this.stats.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được số liệu dashboard. Vui lòng tải lại trang.');
      },
    });
  }
}
