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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import localeVi from '@angular/common/locales/vi';
import {
  CancelOrderModalComponent,
  OrderStatus,
} from '../../shared/components/modal/cancel-order-modal/cancel-order-modal.component';
import { WarrantyModalComponent } from '../../shared/components/modal/warranty-modal/warranty-modal.component';
import { AuthService } from '../../core/services/auth.service';
import { GuestOrderService } from '../../core/services/guest-order.service';
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
  items: OrderItem[];
  total: number;
  note: string;
  shipping: ShippingInfo;
  timeline: TimelineEvent[];
  createdAtRaw: string;
}

// variant_name của nhẫn đã có sẵn nhãn ("Size 15"), nhưng vòng/lắc tay trong DB chỉ lưu số trần
// (chu vi, VD "52") — thêm tiền tố "Size" cho nhất quán, tránh hiện số vô nghĩa không rõ ngữ cảnh.
function formatVariantLabel(variantName: string | null | undefined): string {
  if (!variantName) return '';
  return /^\d+$/.test(variantName) ? `Size ${variantName}` : variantName;
}

const STEP_ORDER: OrderStatus[] = ['P', 'PC', 'PF', 'S', 'CM'];

const DB_STATUS_MAP: Record<string, OrderStatus> = {
  PENDING:           'P',
  PAYMENT_CONFIRMED: 'PC',
  CONFIRMED:         'PC',
  PACKED:            'PF',
  PROCESSING:        'PF',
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

// Giá trị mặc định trước khi API load xong — trang này (/orders/:id) chỉ dành
// cho đơn hàng có sẵn; đơn STUDIO/DESIGN đi qua /orders/custom/:id.
const MOCK_ORDER: OrderDetail = {
  id: '',
  status: 'P',
  note: '',
  items: [],
  total: 0,
  shipping: { name: '', phone: '', address: '' },
  timeline: [],
  createdAtRaw: '',
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
  private readonly route             = inject(ActivatedRoute);
  private readonly authService       = inject(AuthService);
  private readonly http              = inject(HttpClient);
  private readonly destroyRef        = inject(DestroyRef);
  private readonly guestOrderService = inject(GuestOrderService);

  readonly isGuest = computed(() => !this.authService.isLoggedIn());
  readonly isLoading = signal(true);
  readonly loadError = signal(false);

  readonly orderId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly order = signal<OrderDetail>(MOCK_ORDER);

  ngOnInit(): void {
    if (!this.orderId) {
      this.isLoading.set(false);
      return;
    }

    // Khách vãng lai: chỉ load được nếu vừa checkout xong đơn NÀY trong phiên này
    // (token guest tạm được lưu lúc đặt hàng — xem checkout.component.ts).
    let headers: HttpHeaders | undefined;
    if (this.isGuest()) {
      const guestToken = this.guestOrderService.getToken(this.orderId);
      if (!guestToken) {
        this.isLoading.set(false);
        return;
      }
      headers = new HttpHeaders({ Authorization: `Bearer ${guestToken}` });
    }

    this.http
      .get<{ success: boolean; data: any }>(`${environment.apiUrl}/orders/${this.orderId}`, headers ? { headers } : {})
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
    // 'C' (Đã hủy) không nằm trong luồng P→PC→PF→S→CM nên phải xử lý riêng,
    // nếu không buildTimeline trả mảng rỗng và khối "Thời gian cập nhật" trống trơn.
    if (status === 'C') {
      return [
        { id: 'tl-0', state: 'done',   statusLabel: 'Hoàn tất', name: 'Đơn hàng được đặt', date: this.fmtDate(createdAt) },
        { id: 'tl-1', state: 'active', statusLabel: 'Hiện tại', name: 'Đơn hàng đã hủy',   date: this.fmtDate(updatedAt) },
      ];
    }

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
      note: raw.note ?? '',
      total: raw.total_amount,
      shipping: {
        name: raw.recipient_name,
        phone: raw.recipient_phone,
        address: [raw.address_line, raw.province].filter(Boolean).join(', '),
      },
      items: (raw.items ?? []).map((item: any): OrderItem => ({
        id: item.order_item_id,
        collection: item.item_type === 'CUSTOMIZATION' ? 'Đơn thiết kế riêng' : formatVariantLabel(item.variant_name),
        name: item.product_name || (item.item_type === 'CUSTOMIZATION' ? 'Trang sức thiết kế theo yêu cầu' : 'Sản phẩm'),
        qty: item.quantity,
        price: item.unit_price,
        imageUrl: item.image_url || (item.item_type === 'CUSTOMIZATION' ? 'assets/images/studio-ring.png' : ''),
      })),
      timeline: this.buildTimeline(status, raw.created_at, raw.updated_at),
      createdAtRaw: raw.created_at,
    };
  }

  readonly showWarrantyModal  = signal(false);
  warrantyMockSuccessNext     = true;
  readonly showCancelModal    = signal(false);

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

  onOrderCancelled(): void {
    // Cập nhật ngay tại chỗ — đơn đã hủy thật trên server, không cần load lại trang mới thấy
    const nowIso = new Date().toISOString();
    this.order.update(o => ({
      ...o,
      status: 'C' as OrderStatus,
      timeline: this.buildTimeline('C' as OrderStatus, o.createdAtRaw || nowIso, nowIso),
    }));
  }

  onModalClosed(): void {
    this.showCancelModal.set(false);
    this.showWarrantyModal.set(false);
  }
}
