import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CancelDesignModalComponent } from '../../shared/components/modal/cancel-design-modal/cancel-design-modal.component';
import { WarrantyModalComponent } from '../../shared/components/modal/warranty-modal/warranty-modal.component';
import { formatPrice } from '../../shared/utils/currency.util';
import { environment } from '../../../environments/environment';

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

export type TimelineState = 'done' | 'active' | 'pending';

export interface TimelineEvent {
  id: string;
  state: TimelineState;
  statusLabel: string;
  name: string;
  date: string;
}

export interface CustomOrderDetail {
  id: string;
  status: CustomOrderStatus;
  specs: SpecRow[];
  shipping: ShippingInfo;
  craftSteps: CraftStep[];
  timeline: TimelineEvent[];
  createdAtRaw: string;
}

// BR-12: đơn tùy biến/thiết kế đứng theo 2 field riêng trong DB —
// order_status (chung, giống đơn thường) + craft_status (tiến độ chế tác riêng).
// Gộp lại thành 1 chuỗi hiển thị P→PC→CR→FN→PF→S→CM→C cho khớp business rule.
const CUSTOM_STEP_ORDER: CustomOrderStatus[] = ['P', 'PC', 'CR', 'FN', 'PF', 'S', 'CM'];

const CUSTOM_STEP_LABELS: Record<CustomOrderStatus, string> = {
  P: 'ĐẶT HÀNG',
  PC: 'XÁC NHẬN',
  CR: 'CHẾ TÁC',
  FN: 'HOÀN THIỆN',
  PF: 'ĐÓNG GÓI',
  S: 'VẬN CHUYỂN',
  CM: 'HOÀN TẤT',
  C: 'ĐÃ HỦY',
};

const CRAFT_STEP_DEFS: { code: string; num: string; title: string; detail: string }[] = [
  { code: 'CONCEPT_RECEIVED',  num: '01', title: 'Đã nhận ý tưởng',              detail: 'Yêu cầu thiết kế đã được ghi nhận và lên kế hoạch' },
  { code: 'SKETCHING',         num: '02', title: 'Đang phác thảo',               detail: 'Nghệ nhân đang phác thảo bản vẽ theo yêu cầu của bạn' },
  { code: 'WAITING_APPROVAL',  num: '03', title: 'Chờ duyệt bản vẽ',             detail: 'Bản phác thảo đang chờ bạn xác nhận' },
  { code: 'CRAFTING',          num: '04', title: 'Đang chế tác',                 detail: 'Nghệ nhân đang tiến hành chế tác sản phẩm' },
  { code: 'FINISHED',          num: '05', title: 'Hoàn thiện & đóng gói',        detail: 'Kiểm tra chất lượng và đóng gói trước khi giao' },
];

function mapCustomStatus(orderStatus: string, craftStatus: string | null): CustomOrderStatus {
  switch (orderStatus) {
    case 'CANCELLED': return 'C';
    case 'PACKED':    return 'PF';
    case 'SHIPPED':   return 'S';
    case 'COMPLETED': return 'CM';
    case 'PENDING':   return 'P';
    case 'PAYMENT_CONFIRMED':
      if (craftStatus === 'CRAFTING') return 'CR';
      if (craftStatus === 'FINISHED') return 'FN';
      return 'PC';
    default:
      return 'P';
  }
}

const TIMELINE_FLOW: { code: CustomOrderStatus; name: string }[] = [
  { code: 'P',  name: 'Đơn hàng được đặt' },
  { code: 'PC', name: 'Xác nhận đơn hàng' },
  { code: 'CR', name: 'Bắt đầu chế tác' },
  { code: 'FN', name: 'Hoàn thiện sản phẩm' },
  { code: 'PF', name: 'Đóng gói & kiểm tra' },
  { code: 'S',  name: 'Đang vận chuyển' },
  { code: 'CM', name: 'Giao hàng thành công' },
];

const EMPTY_ORDER: CustomOrderDetail = {
  id: '',
  status: 'P',
  specs: [],
  shipping: { name: '', phone: '', address: '' },
  craftSteps: [],
  timeline: [],
  createdAtRaw: '',
};

@Component({
  selector: 'app-order-detail-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CancelDesignModalComponent, WarrantyModalComponent],
  templateUrl: './order-detail-custom.component.html',
  styleUrl: './order-detail-custom.component.css',
})
export class OrderDetailCustomComponent implements OnInit {
  private readonly route      = inject(ActivatedRoute);
  private readonly http       = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly orderId    = this.route.snapshot.paramMap.get('id') ?? '';
  readonly order      = signal<CustomOrderDetail>(EMPTY_ORDER);
  readonly isLoading   = signal(true);
  readonly loadError   = signal(false);

  readonly showWarrantyModal = signal(false);
  readonly showCancelModal   = signal(false);

  ngOnInit(): void {
    if (!this.orderId) {
      this.isLoading.set(false);
      this.loadError.set(true);
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

  // Không có bảng order_status_history nên chỉ mốc đầu (đặt hàng) và mốc hiện tại
  // có ngày thật (created_at/updated_at) — các mốc đã qua ở giữa không rõ ngày chính xác.
  private buildTimeline(status: CustomOrderStatus, createdAt: string, updatedAt: string): TimelineEvent[] {
    if (status === 'C') {
      return [
        { id: 'tl-0', state: 'done',   statusLabel: 'Hoàn tất', name: 'Đơn hàng được đặt', date: this.fmtDate(createdAt) },
        { id: 'tl-1', state: 'active', statusLabel: 'Hiện tại', name: 'Đơn hàng đã hủy',   date: this.fmtDate(updatedAt) },
      ];
    }

    const currentIdx = CUSTOM_STEP_ORDER.indexOf(status);
    if (currentIdx < 0) return [];

    return TIMELINE_FLOW.slice(0, currentIdx + 1).map((step, idx): TimelineEvent => {
      const isFirst   = idx === 0;
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

  private mapOrder(raw: any): CustomOrderDetail {
    const status = mapCustomStatus(raw.order_status, raw.craft_status);
    const item = (raw.items ?? [])[0];

    const specs: SpecRow[] = [];
    if (item) {
      if (item.item_type === 'CUSTOMIZATION') {
        if (item.blank_name)      specs.push({ label: 'Kiểu dáng',  value: item.blank_name });
        if (item.material_name)   specs.push({ label: 'Chất liệu',  value: item.material_name });
        if (item.stone_name)      specs.push({
          label: 'Đá chính',
          value: `${item.stone_name}${item.carat_weight ? ` (${item.carat_weight}ct)` : ''}`,
        });
        specs.push({ label: 'Khắc chữ', value: item.engraving_text || 'Không khắc' });
      } else {
        specs.push({ label: 'Sản phẩm', value: item.product_name ?? 'Sản phẩm' });
        if (item.variant_name) specs.push({ label: 'Phân loại', value: item.variant_name });
      }
    }
    specs.push({ label: 'Tổng giá trị', value: formatPrice(Number(raw.total_amount)) + '₫' });

    return {
      id: raw.order_id,
      status,
      specs,
      shipping: {
        name: raw.recipient_name,
        phone: raw.recipient_phone,
        address: [raw.address_line, raw.province].filter(Boolean).join(', '),
      },
      craftSteps: this.buildCraftSteps(status, raw.craft_status),
      timeline: this.buildTimeline(status, raw.created_at, raw.updated_at),
      createdAtRaw: raw.created_at,
    };
  }

  private buildCraftSteps(status: CustomOrderStatus, craftStatus: string | null): CraftStep[] {
    // Đơn đã qua giai đoạn chế tác (đóng gói/vận chuyển/hoàn tất) → toàn bộ mốc coi như đã xong
    const craftDone = status === 'PF' || status === 'S' || status === 'CM';
    const currentIdx = craftDone
      ? CRAFT_STEP_DEFS.length
      : CRAFT_STEP_DEFS.findIndex(s => s.code === craftStatus);

    return CRAFT_STEP_DEFS.map((s, idx): CraftStep => {
      const state: StepState = craftDone || idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending';
      return {
        id: `cs-${s.code}`,
        num: s.num,
        title: s.title,
        detail: state === 'active' ? s.detail : undefined,
        time: state === 'done' ? 'Hoàn tất' : state === 'active' ? 'Đang thực hiện' : 'Chưa bắt đầu',
        state,
      };
    });
  }

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
    return total > 0 ? Math.max(0, currentIdx) / total : 0;
  });

  readonly isCancellable = computed(() => {
    const s = this.order().status;
    return s === 'P' || s === 'PC';
  });

  openWarrantyModal(): void { this.showWarrantyModal.set(true); }
  openCancelModal(): void { this.showCancelModal.set(true); }

  readonly timelineActiveHeight = computed<string>(() => {
    const doneCount = this.order().timeline.filter((e) => e.state === 'done').length;
    return `${doneCount * 110}px`;
  });

  onOrderCancelled(): void {
    this.showCancelModal.set(false);
    const nowIso = new Date().toISOString();
    this.order.update(o => ({
      ...o,
      status: 'C',
      craftSteps: this.buildCraftSteps('C', null),
      timeline: this.buildTimeline('C', o.createdAtRaw || nowIso, nowIso),
    }));
  }
}
