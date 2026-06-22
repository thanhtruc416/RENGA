import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface KpiCard {
  readonly label: string;
  readonly value: string;
  readonly subVariant: 'positive' | 'neutral' | 'tags';
  readonly sub?: string;
  readonly tags?: ReadonlyArray<{ text: string; variant: 'platinum' | 'gold' }>;
}

interface OrderStatus {
  readonly count: number;
  readonly label: string;
  readonly barColor: string;
  readonly barWidthPct: number;
}

interface TopProduct {
  readonly name: string;
  readonly line2: string;
  readonly heightPx: number;
  readonly color: string;
}

interface PendingPayment {
  readonly id: string;
  readonly time: string;
  readonly description: string;
}

interface PendingAppointment {
  readonly customer: string;
  readonly time: string;
  readonly description: string;
}

interface PendingWarranty {
  readonly id: string;
  readonly time: string;
  readonly description: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  activeTab = signal<'day' | 'week' | 'month'>('day');

  readonly kpiCards: ReadonlyArray<KpiCard> = [
    { label: 'TỔNG DOANH THU', value: '124.850.000 VNĐ', subVariant: 'positive', sub: '+12.5%' },
    {
      label: 'KHÁCH HÀNG MỚI',
      value: '48',
      subVariant: 'neutral',
      sub: '12 Khách hàng tiềm năng',
    },
    {
      label: 'THĂNG HẠNG MỚI',
      value: '15',
      subVariant: 'tags',
      tags: [
        { text: '8 Bạch Kim', variant: 'platinum' },
        { text: '7 Vàng', variant: 'gold' },
      ],
    },
    {
      label: 'GIÁ TRỊ ĐƠN HÀNG TB',
      value: '2.600.000 VNĐ',
      subVariant: 'neutral',
      sub: 'Hiệu suất ổn định',
    },
  ];

  readonly orderStatuses: ReadonlyArray<OrderStatus> = [
    { count: 12, label: 'PENDING', barColor: '#c4607e', barWidthPct: 8 },
    { count: 24, label: 'PROCESSING', barColor: '#1a1a1a', barWidthPct: 15 },
    { count: 156, label: 'COMPLETED', barColor: '#1a1a1a', barWidthPct: 100 },
    { count: 3, label: 'CANCELLED', barColor: '#e05070', barWidthPct: 2 },
  ];

  readonly topProducts: ReadonlyArray<TopProduct> = [
    { name: 'DIAMOND', line2: 'TIARA', heightPx: 110, color: '#c4607e' },
    { name: 'GOLD', line2: 'BANGLE', heightPx: 98, color: '#c4607e' },
    { name: 'ROSE', line2: 'EARRING', heightPx: 78, color: '#d98098' },
    { name: 'PEARL', line2: 'CHOKER', heightPx: 62, color: '#e8a8b8' },
    { name: 'OPAL', line2: 'BROOCH', heightPx: 50, color: '#f2cdd6' },
  ];

  readonly pendingPayments: ReadonlyArray<PendingPayment> = [
    {
      id: 'Order #8842',
      time: '2h trước',
      description: 'Cần xác minh thanh toán cho đơn hàng có sẵn.',
    },
    {
      id: 'Order #8839',
      time: '5h trước',
      description: 'Xác minh thanh toán tiền đặt cọc cho chiếc nhẫn ngọc lục bảo thiết kế riêng.',
    },
  ];

  readonly pendingAppointments: ReadonlyArray<PendingAppointment> = [
    { customer: 'Sarah Jenkins', time: '1 ngày trước', description: 'Tư vấn thiết kế dây chuyền' },
    { customer: 'Mark Thompson', time: '2 ngày trước', description: 'Tư vấn thiết kế nhẫn' },
  ];

  readonly pendingWarranties: ReadonlyArray<PendingWarranty> = [
    { id: '#REP-402', time: 'Bây giờ', description: 'Rớt đã quý nhẫn.' },
    { id: '#W-99', time: 'Hôm qua', description: 'Đánh bóng dây chuyền' },
  ];
}
