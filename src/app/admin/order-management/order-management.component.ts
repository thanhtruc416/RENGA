import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';
import { formatPrice } from '../../shared/utils/currency.util';
import { AdminService, AdminOrder } from '../admin.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

type OrderStatus = AdminOrder['order_status'];
type OrderType = AdminOrder['order_type'];

// Trạng thái kế tiếp hợp lệ cho mỗi trạng thái hiện tại — phải khớp với
// ALLOWED_TRANSITIONS ở server/services/admin-order.service.ts.
const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING:           'PAYMENT_CONFIRMED',
  PAYMENT_CONFIRMED: 'PACKED',
  PACKED:            'SHIPPED',
  SHIPPED:           'COMPLETED',
};

@Component({
  selector: 'app-order-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AdminHeaderComponent],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css',
})
export class OrderManagementComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly adminService = inject(AdminService);

  filterType   = signal('');
  filterStatus = signal('');
  filterApplied = signal(false);
  searchTerm   = signal('');
  currentPage  = signal(1);
  totalItems   = signal(0);
  readonly itemsPerPage = 5;

  private activeType   = '';
  private activeStatus = '';

  orders = signal<AdminOrder[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.adminService.getOrders({
      page: this.currentPage(),
      limit: this.itemsPerPage,
      type: this.activeType || undefined,
      status: this.activeStatus || undefined,
      search: this.searchTerm() || undefined,
    }).subscribe({
      next: (res) => {
        this.orders.set(res.orders);
        this.totalItems.set(res.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.triggerToast('Không tải được danh sách đơn hàng.', 'error');
      },
    });
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.loadOrders();
  }

  goToDetail(orderId: string): void {
    this.router.navigate(['/admin/don-hang', orderId]);
  }

  statusLabel(s: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      PENDING:            'CHỜ THANH TOÁN',
      PAYMENT_CONFIRMED:  'ĐÃ THANH TOÁN',
      PACKED:             'ĐANG ĐÓNG GÓI',
      SHIPPED:            'ĐANG GIAO',
      CANCELLED:          'ĐÃ HỦY',
      COMPLETED:          'HOÀN TẤT',
    };
    return map[s];
  }

  typeLabel(t: OrderType): string {
    const map: Record<OrderType, string> = {
      STANDARD: 'CÓ SẴN',
      STUDIO:   'TUỲ BIẾN',
      DESIGN:   'THIẾT KẾ',
    };
    return map[t];
  }

  applyFilters() {
    this.activeType = this.filterType();
    this.activeStatus = this.filterStatus();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadOrders();
  }

  clearFilters() {
    this.filterType.set('');
    this.filterStatus.set('');
    this.searchTerm.set('');
    this.activeType = '';
    this.activeStatus = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadOrders();
  }

  // ==========================================
  // TOAST MESSAGE
  // ==========================================
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  private triggerToast(message: string, type: 'success' | 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  // Hàm xử lý nút Thao Tác trên bảng — cập nhật trạng thái thật qua API
  handleAction(order: AdminOrder, event: Event) {
    event.stopPropagation();

    const next = NEXT_STATUS[order.order_status];
    if (!next) {
      this.router.navigate(['/admin/don-hang', order.order_id]);
      return;
    }

    this.adminService.updateOrderStatus(order.order_id, next).subscribe({
      next: () => {
        this.triggerToast(`Cập nhật đơn hàng sang "${this.statusLabel(next)}" thành công!`, 'success');
        this.loadOrders();
      },
      error: (err) => this.triggerToast(err?.error?.message ?? 'Không thể cập nhật đơn hàng.', 'error'),
    });
  }

  readonly formatPrice = formatPrice;

  get totalPages() { return Math.max(1, Math.ceil(this.totalItems() / this.itemsPerPage)); }
  get pageNumbers(): number[] { return getPageWindow(this.currentPage(), this.totalPages); }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
      this.loadOrders();
    }
  }

  actionLabel(s: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      PENDING:            'XÁC NHẬN',
      PAYMENT_CONFIRMED:  'ĐÓNG GÓI',
      PACKED:             'GIAO HÀNG',
      SHIPPED:            'HOÀN TẤT',
      CANCELLED:          'CHI TIẾT',
      COMPLETED:          'CHI TIẾT',
    };
    return map[s];
  }

  isPrimaryAction(s: OrderStatus): boolean { return !!NEXT_STATUS[s]; }
}
