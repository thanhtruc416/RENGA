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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import localeVi from '@angular/common/locales/vi';
import {
  CancelOrderModalComponent,
  OrderStatus,
} from '../../shared/components/modal/cancel-order-modal/cancel-order-modal.component';
import { WarrantyModalComponent } from '../../shared/components/modal/warranty-modal/warranty-modal.component';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

registerLocaleData(localeVi);

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
  orderType: 'STANDARD' | 'STUDIO';
  items: OrderItem[];
  total: number;
  note: string;
  shipping: ShippingInfo;
  timeline: TimelineEvent[];
}

const STEP_ORDER: OrderStatus[] = ['P', 'PC', 'PF', 'S', 'CM'];

const DB_STATUS_MAP: Record<string, OrderStatus> = {
  PENDING:    'P',
  CONFIRMED:  'PC',
  PROCESSING: 'PF',
  SHIPPED:    'S',
  SHIPPING:   'S',
  DISPATCHED: 'S',
  DELIVERED:  'CM',
  COMPLETED:  'CM',
  CANCELLED:  'C',
  CANCELED:   'C',
};

const STEP_LABELS: Record<OrderStatus, string> = {
  P: 'Đơn hàng được đặt',
  PC: 'Xác nhận',
  PF: 'Hoàn tất',
  S: 'Đang giao hàng',
  CM: 'Hoàn thành',
  C: 'Đã hủy',
};

const STUDIO_STEP_LABELS: Record<string, string> = {
  P:  'PLACED (P)',
  PC: 'CONFIRMED (PC)',
  PF: 'FULFILLED (PF)',
  S:  'SHIPPING (S)',
  CM: 'COMPLETE (CM)',
  C:  'CANCELLED',
};

const MOCK_ORDER: OrderDetail = {
  id: 'AH-8829104',
  status: 'PF',
  orderType: 'STUDIO',
  note: 'STUDIO - Nhẫn tùy chỉnh - 950 Platinum & 18k Gold - Colombian Emerald (8.2ct) - 15/09/2026',
  items: [],
  total: 0,
  shipping: {
    name: 'Nguyễn Minh Anh',
    phone: '090 - 456 - 7890',
    address: '88 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
  },
  timeline: [
    { id: 'tl-1', state: 'done',   statusLabel: 'Hoàn tất', name: 'Đặt đơn',     date: '12/05/2026   14:30' },
    { id: 'tl-2', state: 'done',   statusLabel: 'Hoàn tất', name: 'Xác nhận',    date: '13/05/2026   09:00' },
    { id: 'tl-3', state: 'active', statusLabel: 'Hiện tại', name: 'Đang chế tác', date: '15/05/2026   10:00' },
  ],
};

@Component({
  selector: 'app-order-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink, ReactiveFormsModule, CancelOrderModalComponent, WarrantyModalComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
  private readonly route       = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly http        = inject(HttpClient);
  private readonly destroyRef  = inject(DestroyRef);

  readonly isGuest = computed(() => !this.authService.isLoggedIn());
  readonly isLoading = signal(true);
  readonly loadError = signal(false);

  readonly orderId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly order = signal<OrderDetail>(MOCK_ORDER);

  ngOnInit(): void {
    if (!this.orderId || this.isGuest()) {
      this.isLoading.set(false);
      return;
    }
    this.http
      .get<{ success: boolean; data: any }>(`${environment.apiUrl}/orders/${this.orderId}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.order.set(this.mapOrder(res.data));
          } else {
            this.loadError.set(true);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.loadError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  private fmtDate(raw: string | null | undefined): string {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return '';
    const dd   = String(d.getDate()).padStart(2, '0');
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh   = String(d.getHours()).padStart(2, '0');
    const min  = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy}   ${hh}:${min}`;
  }

  private buildTimeline(status: OrderStatus, createdAt: string, updatedAt: string): TimelineEvent[] {
    const FLOW: { code: OrderStatus; name: string }[] = [
      { code: 'P',  name: 'Đơn hàng được đặt' },
      { code: 'PC', name: 'Xác nhận đơn hàng' },
      { code: 'PF', name: 'Đóng gói & kiểm tra' },
      { code: 'S',  name: 'Đang vận chuyển' },
      { code: 'CM', name: 'Giao hàng thành công' },
    ];
    const currentIdx = STEP_ORDER.indexOf(status);
    if (currentIdx < 0) return [];

    return FLOW.slice(0, currentIdx + 1).map((step, idx): TimelineEvent => {
      const isFirst  = idx === 0;
      const isCurrent = idx === currentIdx;
      return {
        id: `tl-${idx}`,
        state: isCurrent ? 'active' : 'done',
        statusLabel: isCurrent ? 'Hiện tại' : 'Hoàn tất',
        name: step.name,
        date: isFirst ? this.fmtDate(createdAt) : isCurrent ? this.fmtDate(updatedAt) : '',
      };
    });
  }

  private mapOrder(raw: any): OrderDetail {
    const status = DB_STATUS_MAP[raw.order_status] ?? 'P';
    return {
      id: raw.order_id,
      status,
      orderType: raw.order_type === 'STUDIO' ? 'STUDIO' : 'STANDARD',
      note: raw.note ?? '',
      total: raw.total_amount,
      shipping: {
        name: raw.recipient_name,
        phone: raw.recipient_phone,
        address: [raw.address_line, raw.province].filter(Boolean).join(', '),
      },
      items: (raw.items ?? []).map((item: any): OrderItem => ({
        id: item.order_item_id,
        collection: item.item_type === 'CUSTOMIZATION' ? 'Đơn thiết kế riêng' : (item.variant_name ?? ''),
        name: item.product_name || (item.item_type === 'CUSTOMIZATION' ? 'Trang sức thiết kế theo yêu cầu' : 'Sản phẩm'),
        qty: item.quantity,
        price: item.unit_price,
        imageUrl: item.image_url || (item.item_type === 'CUSTOMIZATION' ? 'assets/images/studio-ring.png' : ''),
      })),
      timeline: this.buildTimeline(status, raw.created_at, raw.updated_at),
    };
  }

  readonly showWarrantyModal  = signal(false);
  warrantyMockSuccessNext     = true;
  readonly showCancelModal    = signal(false);
  cancelMockSuccessNext       = true;

  readonly isCancellable = computed(() => {
    const s = this.order().status;
    return s === 'P' || s === 'PC' || s === 'PF';
  });
  readonly showSupportModal   = signal(false);
  readonly supportSubmitted   = signal(false);
  readonly supportSuccess     = signal(false);
  readonly supportFailure     = signal(false);
  private supportMockSuccessNext = true;

  readonly supportForm = new FormGroup({
    name:    new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone:   new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{10}$/)] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

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

  readonly studioStatusSteps = computed<StatusStep[]>(() => {
    const currentStatus = this.order().status;
    const currentIdx    = STEP_ORDER.indexOf(currentStatus);
    return STEP_ORDER.map((code, idx) => {
      const state: StepState = idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending';
      return {
        code,
        label: STUDIO_STEP_LABELS[code] ?? code,
        dotLabel: state === 'done' ? 'Đã hoàn tất' : state === 'active' ? 'Đang xử lý' : 'Chưa xử lý',
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

  readonly firstItem = computed(() => this.order().items[0]);

  readonly studioDesc = computed(() => {
    const parts = (this.order().note ?? '').split(' - ');
    return { blank: parts[1] ?? '', material: parts[2] ?? '', stone: parts[3] ?? '', deliveryDate: parts[4] ?? '' };
  });

  private readonly STUDIO_STATUS_IDX: Record<string, number> = { P: 0, PC: 1, PF: 2, S: 3, CM: 4 };

  readonly studioTimelineSteps = computed(() => {
    const o = this.order();
    const currentIdx = this.STUDIO_STATUS_IDX[o.status] ?? 0;
    const tl = o.timeline;
    const STEPS = [
      { num: '01', name: 'Đã nhận ý tưởng',                     desc: 'Yêu cầu thiết kế đã được ghi nhận và lên kế hoạch' },
      { num: '02', name: 'Đang sắp xếp nghệ nhân chế tác',       desc: 'Alex Nguyễn sẽ là nghệ nhân chế tác đơn hàng của bạn.' },
      { num: '03', name: 'Đang chế tác',                         desc: 'Nghệ nhân đang tiến hành khắc chữ lên thiết kế của bạn' },
      { num: '04', name: 'Hoàn thiện',                           desc: 'Kiểm tra chất lượng và đánh bóng sản phẩm' },
      { num: '05', name: 'Giao hàng',                            desc: 'Đóng gói & vận chuyển đến bạn' },
    ];
    return STEPS.map((s, idx) => ({
      ...s,
      state: (idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending') as 'done' | 'active' | 'pending',
      date: idx === 0 ? (tl[0]?.date ?? '') : '',
    }));
  });

  openWarrantyModal(): void {
    this.showWarrantyModal.set(true);
    this.warrantyMockSuccessNext = !this.warrantyMockSuccessNext;
  }

  openCancelModal(): void {
    this.showCancelModal.set(true);
  }

  openSupport(): void {
    this.supportForm.reset();
    this.supportSubmitted.set(false);
    this.supportSuccess.set(false);
    this.supportFailure.set(false);
    this.showSupportModal.set(true);
  }

  closeSupport(): void {
    this.showSupportModal.set(false);
  }

  submitSupport(): void {
    this.supportSubmitted.set(true);
    if (this.supportForm.invalid) return;
    if (this.supportMockSuccessNext) {
      this.supportSuccess.set(true);
    } else {
      this.supportFailure.set(true);
    }
    this.supportMockSuccessNext = !this.supportMockSuccessNext;
  }

  onOrderCancelled(): void {}

  onModalClosed(): void {
    this.showCancelModal.set(false);
    this.showWarrantyModal.set(false);
  }
}
