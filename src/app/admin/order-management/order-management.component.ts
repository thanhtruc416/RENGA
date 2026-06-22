import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router  } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';
import { formatPrice } from '../../shared/utils/currency.util';

type OrderStatus = 'waiting-payment' | 'crafting' | 'paid' | 'cancelled' | 'completed';
type OrderType = 'available' | 'bespoke' | 'design';

interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  type: OrderType;
  total: number;
  status: OrderStatus;
}

@Component({
  selector: 'app-order-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, AdminHeaderComponent],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css',
})
export class OrderManagementComponent {
  private readonly router = inject(Router);
  filterType   = signal('');
  filterStatus = signal('');
  filterApplied = signal(false);
  currentPage  = signal(1);

  activeType   = signal('');
  activeStatus = signal('');

  orders = signal<Order[]>([
    { id: '#JM-88201', customer: 'Eleanor Sterling', product: 'Dây chuyền Sapphire L\'Amour', date: '24/10/2023', type: 'available', total: 4250000, status: 'waiting-payment' },
    { id: '#JM-88202', customer: 'Eleanor Sterling', product: 'Tiara Kim cương Marquise',    date: '24/10/2023', type: 'bespoke',   total: 4000000, status: 'crafting' },
    { id: '#JM-88204', customer: 'Minh Anh',         product: 'Dây chuyền Sapphire L\'Amour', date: '21/10/2023', type: 'available', total: 3500000, status: 'paid' },
    { id: '#JM-88207', customer: 'Julian Vane',      product: 'Nhẫn Sapphire L\'Amour',      date: '21/10/2023', type: 'available', total: 950000,  status: 'cancelled' },
    { id: '#JM-88209', customer: 'Julian Vane',      product: 'Tiara Kim cương Marquise',    date: '14/10/2023', type: 'design',    total: 32000000, status: 'completed' },
  ]);

  readonly filteredOrders = computed(() => {
    const type   = this.activeType();
    const status = this.activeStatus();
    if (!type && !status) return this.orders();
    return this.orders().filter(o => {
      if (type   && o.type   !== type)   return false;
      if (status && o.status !== status) return false;
      return true;
    });
  });

  goToDetail(orderId: string): void {
    // Bỏ dấu '#' ở đầu ID nếu có (vì URL thường không chứa '#')
    // Ví dụ: '#JM-88201' -> 'JM-88201'
    const cleanId = orderId.replace('#', ''); 
    
    this.router.navigate(['/admin/don-hang', cleanId]); 
  }

  statusLabel(s: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      'waiting-payment': 'CHỜ THANH TOÁN',
      crafting:          'ĐANG CHẾ TÁC',
      paid:              'ĐÃ THANH TOÁN',
      cancelled:         'ĐÃ HỦY',
      completed:         'HOÀN TẤT',
    };
    return map[s];
  }

  typeLabel(t: OrderType): string {
    const map: Record<OrderType, string> = {
      available: 'CÓ SẴN',
      bespoke:   'TUỲ BIẾN',
      design:    'THIẾT KẾ',
    };
    return map[t];
  }

  applyFilters() {
    this.activeType.set(this.filterType());
    this.activeStatus.set(this.filterStatus());
    this.filterApplied.set(true);
    this.currentPage.set(1);
  }

  clearFilters() {
    this.filterType.set('');
    this.filterStatus.set('');
    this.activeType.set('');
    this.activeStatus.set('');
    this.filterApplied.set(false);
    this.currentPage.set(1);
  }

  // ==========================================
  // STATE MODAL VÀ TOAST MESSAGE
  // ==========================================
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  showProgressModal = signal(false);
  progressStatus = signal('crafting');
  notifyCustomer = signal(true);
  
  progressStatuses = [
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'crafting', label: 'Đang chế tác' },
    { value: 'finishing', label: 'Đang hoàn thiện' },
    { value: 'ready', label: 'Sẵn sàng giao' }
  ];

  private triggerToast(message: string, type: 'success' | 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  openProgressModal() {
    this.showProgressModal.set(true);
  }

  closeProgressModal() {
    this.showProgressModal.set(false);
  }

  saveProgressUpdate() {
    this.closeProgressModal(); // Tắt modal
    this.triggerToast('Cập nhật tiến độ đơn hàng thành công!', 'success'); // Bật toast
  }

  // Hàm xử lý nút Thao Tác trên bảng
  handleAction(order: Order, event: Event) {
    event.stopPropagation(); // Ngăn sự kiện click lan ra hàng (table row)
    const cleanId = order.id.replace('#', '');

    if (order.status === 'waiting-payment') {
      // Nhấn XÁC NHẬN
      this.triggerToast('Xác nhận đơn hàng thành công!', 'success');
      setTimeout(() => this.router.navigate(['/admin/don-hang', cleanId]), 1000); // Đợi 1s để kịp nhìn thấy toast rồi mới chuyển trang
    } 
    else if (order.status === 'cancelled') {
      // Nhấn KHÔI PHỤC
      this.triggerToast('Khôi phục đơn hàng thành công!', 'success');
      setTimeout(() => this.router.navigate(['/admin/don-hang', cleanId]), 1000);
    } 
    else if (order.status === 'crafting' || order.status === 'paid') {
      // Nhấn CẬP NHẬT -> Mở modal
      this.openProgressModal();
    } 
    else {
      // Mặc định (CHI TIẾT)
      this.router.navigate(['/admin/don-hang', cleanId]);
    }
  }
  readonly formatPrice = formatPrice;

  get totalItems() { return this.filteredOrders().length; }
  get totalPages() { return Math.max(1, Math.ceil(this.totalItems / 5)); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  goToPage(page: number) { if (page >= 1 && page <= this.totalPages) this.currentPage.set(page); }

  actionLabel(s: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      'waiting-payment': 'XÁC NHẬN',
      crafting:          'CẬP NHẬT',
      paid:              'CẬP NHẬT',
      cancelled:         'KHÔI PHỤC',
      completed:         'CHI TIẾT',
    };
    return map[s];
  }

  isPrimaryAction(s: OrderStatus): boolean { return s === 'waiting-payment'; }
}
