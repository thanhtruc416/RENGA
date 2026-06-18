import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';
import { formatPrice } from '../../shared/utils/currency.util';

interface OrderItem {
  image: string;
  name: string;
  note: string;
  type: 'bespoke' | 'available';
  material?: string;
  stone?: string;
  size?: string;
  length?: string;
  price: number;
}

interface ProgressStep {
  label: string;
  desc: string;
  time: string;
  done: boolean;
}

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, AdminHeaderComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class AdminOrderDetailComponent {
  showProgressModal = signal(false);

  orderId   = '#JM-88291';
  orderDate = '24/10/2026 14h45';
  orderStatus = 'ĐANG CHẾ TÁC';

  items: OrderItem[] = [
    {
      image: 'assets/3a54d5d7e419ebfb5fd4173a0d27df2b40018ee6.png',
      name: 'Nhẫn Eternal Blossom',
      note: 'Khắc chữ theo yêu cầu: "A & M 2023"',
      type: 'bespoke',
      material: '18k Rose Gold',
      stone: 'Central Diamond (0.8ct, VVS1), Pink Sapphires',
      size: '6.5',
      price: 4250000,
    },
    {
      image: 'assets/3a54d5d7e419ebfb5fd4173a0d27df2b40018ee6.png',
      name: 'Vòng cổ Lunar Pearl',
      note: 'Hàng có sẵn',
      type: 'available',
      material: 'Akoya Sea Pearl',
      length: '16 inches',
      price: 1800000,
    },
  ];

  steps: ProgressStep[] = [
    { label: 'Duyệt bản thiết kế',  desc: 'Bản thiết kế đã được duyệt bởi khách hàng',                                              time: 'Hôm qua, 9h12p',  done: true },
    { label: 'Tạo đơn đặt hàng',    desc: 'Đơn đặt hàng đã được tạo trên hệ thống, chờ khách hàng thanh toán cọc',                 time: 'Hôm nay, 10h30p', done: true },
    { label: 'Đã nhận thanh toán cọc', desc: 'Đã xác nhận khách hàng hoàn tất thanh toán đặt cọc',                                time: '',                done: false },
    { label: 'Bắt đầu chế tác',     desc: 'Sản phẩm được chuyển đến xưởng bởi Trưởng ban phụ trách Alex Mercer',                  time: '',                done: false },
  ];

  invoice = {
    subtotal: 6050000,
    discount: -300000,
    shipping: 45000,
    total: 5795000,
    paid: 3000000,
    remaining: 2795000,
  };

  customer = {
    initials: 'SJ',
    name: 'Sarah Jenkins',
    tier: 'Hạng Bạch Kim',
    email: 's.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    address: '722 Fifth Avenue, 14th Floor\nNew York, NY 10019\nUnited States',
  };

  notes = [
    {
      text: '"Khách hàng yêu cầu màu đá sapphire hồng đậm hơn một chút so với ảnh tham khảo. Xưởng sản xuất đã nhận được thông báo."',
      author: 'Nhà thiết kế Marcus',
    },
  ];

  readonly formatPrice = formatPrice;
  openProgressModal()  { this.showProgressModal.set(true); }
  closeProgressModal() { this.showProgressModal.set(false); }

  progressStatus = signal('DA_CHE_TAC');
  notifyCustomer = signal(true);

  progressStatuses = [
    { value: 'CHO_XAC_NHAN',      label: 'Chờ xác nhận' },
    { value: 'DA_NHAN_COC',       label: 'Đã nhận cọc' },
    { value: 'BAT_DAU_CHE_TAC',   label: 'Bắt đầu chế tác' },
    { value: 'DA_CHE_TAC',        label: 'Đã chế tác' },
    { value: 'DANG_GIAO_HANG',    label: 'Đang giao hàng' },
    { value: 'HOAN_TAT',          label: 'Hoàn tất' },
  ];
}
