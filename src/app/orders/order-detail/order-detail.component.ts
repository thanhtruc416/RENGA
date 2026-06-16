import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import localeVi from '@angular/common/locales/vi';
import {
  CancelOrderModalComponent,
  OrderStatus,
} from '../../shared/components/modal/cancel-order-modal/cancel-order-modal.component';
import { WarrantyModalComponent } from '../../shared/components/modal/warranty-modal/warranty-modal.component';

registerLocaleData(localeVi);

// ── Models ────────────────────────────────────────────────────────────────────

export type StepState = 'done' | 'active' | 'pending';
export type TimelineState = 'done' | 'active' | 'pending';

export interface StatusStep {
  code: OrderStatus;
  label: string;
  dotLabel: string;
  state: StepState;
}

export interface TimelineEvent {
  id: string;
  state: TimelineState;
  statusLabel: string;
  name: string;
  date: string;
  note?: string;
}

export interface OrderItem {
  id: string;
  collection: string;
  name: string;
  qty: number;
  price: number;
  imageUrl: string;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
}

export interface OrderDetail {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  shipping: ShippingInfo;
  timeline: TimelineEvent[];
}

// ── Step config ───────────────────────────────────────────────────────────────

const STEP_ORDER: OrderStatus[] = ['P', 'PC', 'PF', 'S', 'CM'];

const STEP_LABELS: Record<OrderStatus, string> = {
  P: 'Đơn hàng được đặt',
  PC: 'Xác nhận',
  PF: 'Hoàn tất',
  S: 'Đang giao hàng',
  CM: 'Hoàn thành',
  C: 'Đã hủy',
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_ORDER: OrderDetail = {
  id: 'AH-8829104',
  // Đổi thành 'PC' để test cancel thành công; 'S' để test cancel fail
  status: 'S',
  items: [
    {
      id: 'item-1',
      collection: 'BST',
      name: 'Celestial Gold Choker',
      qty: 1,
      price: 12_500_000,
      imageUrl: 'assets/images/product-choker.webp',
    },
    {
      id: 'item-2',
      collection: 'Bespoke',
      name: 'Midnight Sapphire Band',
      qty: 1,
      price: 8_200_000,
      imageUrl: 'assets/images/product-sapphire.webp',
    },
  ],
  total: 20_700_000,
  shipping: {
    name: 'Nguyễn Minh Anh',
    phone: '090 • 456 • 7890',
    address: '88 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
  },
  timeline: [
    {
      id: 'tl-1',
      state: 'done',
      statusLabel: 'Hoàn tất',
      name: 'Đã chuẩn bị',
      date: '24/10/2026   7:40',
    },
    {
      id: 'tl-2',
      state: 'active',
      statusLabel: 'Hiện tại',
      name: 'Đang giao hàng',
      date: '25/10/2026   8:40',
      note: 'Sản phẩm đang được kiểm tra chất lượng & đóng gói thủ công.',
    },
    {
      id: 'tl-3',
      state: 'pending',
      statusLabel: 'Sắp tới',
      name: 'Đã giao',
      date: 'Dự kiến: 26/10/2026',
    },
  ],
};

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-order-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink, CancelOrderModalComponent, WarrantyModalComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent {
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly orderId = this.route.snapshot.paramMap.get('id') ?? '';

  // TODO: thay bằng httpResource() khi có API
  readonly order = signal<OrderDetail>(MOCK_ORDER);

  readonly showWarrantyModal = signal(false);
  readonly showCancelModal   = signal(false);

  // ── Status bar steps ────────────────────────────────────────────────────────
  readonly statusSteps = computed<StatusStep[]>(() => {
    const currentStatus = this.order().status;
    const currentIdx    = STEP_ORDER.indexOf(currentStatus);

    return STEP_ORDER.map((code, idx) => {
      const state: StepState =
        idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending';
      return {
        code,
        label: STEP_LABELS[code],
        dotLabel:
          state === 'done'
            ? 'Đã hoàn tất'
            : state === 'active'
              ? 'Đang xử lý'
              : 'Chưa xử lý',
        state,
      };
    });
  });

  readonly progressPct = computed<number>(() => {
    const currentIdx = STEP_ORDER.indexOf(this.order().status);
    const total      = STEP_ORDER.length - 1;
    return total > 0 ? currentIdx / total : 0;
  });

  readonly timelineActiveHeight = computed<string>(() => {
    const doneCount = this.order().timeline.filter((e) => e.state === 'done').length;
    return `${doneCount * 110}px`;
  });

  // ── Computed: thông tin sản phẩm đầu tiên để truyền vào cancel modal ──────
  readonly firstItem = computed(() => this.order().items[0]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  openWarrantyModal(): void {
    this.showWarrantyModal.set(true);
  }

  openCancelModal(): void {
    this.showCancelModal.set(true);
  }

  /** Nút "Hỗ trợ" trong timeline → mở chatbot bằng cách dispatch custom event
   *  để ChatbotComponent (shared, nằm ngoài router-outlet) lắng nghe. */
  openSupport(): void {
    window.dispatchEvent(new CustomEvent('renga:open-chatbot'));
  }

  onOrderCancelled(): void {
    // Modal tự hiển thị success/fail step nên không đóng ngay
    // Đóng modal chỉ khi user click nút trong success/fail popup (closed output)
  }

  onModalClosed(): void {
    this.showCancelModal.set(false);
    this.showWarrantyModal.set(false);
  }
}