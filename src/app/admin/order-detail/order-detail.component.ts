import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';
import { formatPrice } from '../../shared/utils/currency.util';
import { AdminService } from '../admin.service';

type OrderStatus = 'PENDING' | 'PAYMENT_CONFIRMED' | 'PACKED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING:           'PAYMENT_CONFIRMED',
  PAYMENT_CONFIRMED: 'PACKED',
  PACKED:            'SHIPPED',
  SHIPPED:           'COMPLETED',
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING:            'CHỜ THANH TOÁN',
  PAYMENT_CONFIRMED:  'ĐÃ THANH TOÁN',
  PACKED:             'ĐANG ĐÓNG GÓI',
  SHIPPED:            'ĐANG GIAO',
  CANCELLED:          'ĐÃ HỦY',
  COMPLETED:          'HOÀN TẤT',
};

const NEXT_ACTION_LABEL: Record<OrderStatus, string> = {
  PENDING:            'XÁC NHẬN THANH TOÁN',
  PAYMENT_CONFIRMED:  'ĐÓNG GÓI',
  PACKED:             'GIAO HÀNG',
  SHIPPED:            'HOÀN TẤT ĐƠN',
  CANCELLED:          '',
  COMPLETED:          '',
};

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, AdminHeaderComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class AdminOrderDetailComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route  = inject(ActivatedRoute);
  private readonly adminService = inject(AdminService);

  readonly showToast = signal<boolean>(false);
  readonly toastMessage = signal<string>('');
  readonly toastType    = signal<'success' | 'error'>('success');

  readonly order = signal<any | null>(null);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/admin/don-hang']); return; }
    this.adminService.getOrder(id).subscribe({
      next: (res) => {
        this.order.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.displayToast('Không tìm thấy đơn hàng.', 'error');
      },
    });
  }

  statusLabel(s: OrderStatus): string { return STATUS_LABEL[s]; }
  nextActionLabel(s: OrderStatus): string { return NEXT_ACTION_LABEL[s]; }
  canAdvance(s: OrderStatus): boolean { return !!NEXT_STATUS[s]; }
  canCancel(s: OrderStatus): boolean { return s === 'PENDING' || s === 'PAYMENT_CONFIRMED' || s === 'PACKED'; }

  readonly formatPrice = formatPrice;

  private displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  advanceStatus(): void {
    const order = this.order();
    if (!order) return;
    const next = NEXT_STATUS[order.order_status as OrderStatus];
    if (!next) return;

    this.adminService.updateOrderStatus(order.order_id, next).subscribe({
      next: () => {
        this.displayToast(`Cập nhật sang "${this.statusLabel(next)}" thành công!`, 'success');
        this.order.update(o => o ? { ...o, order_status: next } : o);
      },
      error: (err) => this.displayToast(err?.error?.message ?? 'Không thể cập nhật đơn hàng.', 'error'),
    });
  }

  cancelOrder(): void {
    const order = this.order();
    if (!order) return;

    this.adminService.updateOrderStatus(order.order_id, 'CANCELLED').subscribe({
      next: () => {
        this.displayToast('Huỷ đơn hàng thành công!', 'success');
        setTimeout(() => this.router.navigate(['/admin/don-hang']), 1200);
      },
      error: (err) => this.displayToast(err?.error?.message ?? 'Không thể hủy đơn hàng.', 'error'),
    });
  }
}
