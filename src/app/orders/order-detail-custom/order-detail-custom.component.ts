import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CancelDesignModalComponent } from '../../shared/components/modal/cancel-design-modal/cancel-design-modal.component';
import { WarrantyModalComponent } from '../../shared/components/modal/warranty-modal/warranty-modal.component';

export type CustomOrderStatus = 'P' | 'PC' | 'CR' | 'FN' | 'PF' | 'S' | 'CM' | 'C';
export type StepState = 'done' | 'active' | 'pending';

export interface StatusStep {
  code: CustomOrderStatus;
  label: string;
  state: StepState;
}

export interface CraftStep {
  id: string;
  num: string;
  title: string;
  detail?: string;
  time: string;
  state: StepState;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
}

export interface ArtisanInfo {
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
}

export interface CustomOrderDetail {
  id: string;
  status: CustomOrderStatus;
  specs: SpecRow[];
  shipping: ShippingInfo;
  artisan: ArtisanInfo;
  craftSteps: CraftStep[];
}

const CUSTOM_STEP_ORDER: CustomOrderStatus[] = ['P', 'PC', 'CR', 'FN', 'PF', 'S', 'CM'];

const CUSTOM_STEP_LABELS: Record<CustomOrderStatus, string> = {
  P: 'ĐẶT HÀNG',
  PC: 'XÁC NHẬN',
  CR: 'CHẾ TÁC',
  FN: 'HOÀN THIỆN',
  PF: 'HOÀN THÀNH',
  S: 'VẬN CHUYỂN',
  CM: 'HOÀN TẤT',
  C: 'ĐÃ HỦY',
};

const MOCK_CUSTOM_ORDER: CustomOrderDetail = {
  id: 'AH-8824019',
  status: 'CR',
  specs: [
    { label: 'Kim loại', value: 'Vàng trắng 18K' },
    { label: 'Đá chính', value: 'Kim cương 0.8ct — VVS1 D Color' },
    { label: 'Đá phụ', value: 'Kim cương nhỏ 0.02ct x 12' },
    { label: 'Size nhẫn', value: 'Size 14 (17.1mm)' },
    { label: 'Khắc chữ', value: 'Bản & Chi — 10.2023' },
    { label: 'Tổng giá trị', value: '45.000.000đ' },
  ],
  shipping: {
    name: 'Nguyễn Minh Trúc',
    phone: '090.456.7890',
    address: '88 Lê Lợi, Phường Bến Thành, TP. Hồ Chí Minh',
  },
  artisan: {
    name: 'Henri de Luca',
    role: 'Nghệ nhân chính · 22 năm kinh nghiệm',
    avatarUrl: 'assets/images/artisan-henri.webp',
    quote: 'Mỗi viên đá là một câu chuyện — tôi chỉ là người giúp nó được kể đúng cách',
  },
  craftSteps: [
    { id: 'cs-1', num: '01', title: 'Đã nhận ý tưởng', time: 'Hoàn tất: 15/09/2026', state: 'done' },
    { id: 'cs-2', num: '02', title: 'Phác thảo & Xác nhận bản vẽ', time: 'Hoàn tất: 22/09/2026', state: 'done' },
    { id: 'cs-3', num: '03', title: 'Đang chế tác', detail: 'Nghệ nhân đang tiến hành khắc chữ lên thiết kế của bạn', time: 'Dự kiến hoàn tất: 15/10/2026', state: 'active' },
    { id: 'cs-4', num: '04', title: 'Hoàn thiện', time: 'Dự kiến: 17/10/2026', state: 'pending' },
    { id: 'cs-5', num: '05', title: 'Giao hàng', time: 'Dự kiến: 20/10/2026', state: 'pending' },
  ],
};

@Component({
  selector: 'app-order-detail-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CancelDesignModalComponent, WarrantyModalComponent],
  templateUrl: './order-detail-custom.component.html',
  styleUrl: './order-detail-custom.component.css',
})
export class OrderDetailCustomComponent {
  private readonly route = inject(ActivatedRoute);

  readonly orderId = this.route.snapshot.paramMap.get('id') ?? '';
  readonly order = signal<CustomOrderDetail>(MOCK_CUSTOM_ORDER);

  readonly showWarrantyModal = signal(false);
  readonly showCancelModal = signal(false);

  readonly statusSteps = computed<StatusStep[]>(() => {
    const currentStatus = this.order().status;
    const currentIdx = CUSTOM_STEP_ORDER.indexOf(currentStatus);
    return CUSTOM_STEP_ORDER.map((code, idx) => ({
      code,
      label: CUSTOM_STEP_LABELS[code],
      state: (idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending') as StepState,
    }));
  });

  readonly progressPct = computed<number>(() => {
    const currentIdx = CUSTOM_STEP_ORDER.indexOf(this.order().status);
    const total = CUSTOM_STEP_ORDER.length - 1;
    return total > 0 ? currentIdx / total : 0;
  });

  openWarrantyModal(): void { this.showWarrantyModal.set(true); }
  openCancelModal(): void { this.showCancelModal.set(true); }
  onOrderCancelled(): void { this.showCancelModal.set(false); }
}
