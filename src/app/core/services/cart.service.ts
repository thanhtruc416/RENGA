import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { environment } from '../../../environments/environment';

export interface StudioConfig {
  blankId: string;
  materialId: string;
  stoneId: string;
  carat: number;
  engraveText?: string;
}

export interface CartItem {
  readonly id: string;
  readonly type: 'available' | 'studio';
  readonly name: string;
  readonly spec: string;
  readonly price: number;
  readonly image: string;
  quantity?: number;
  readonly savedDate?: string;
  readonly variantId?: string;
  readonly maxQuantity?: number;
  readonly studioConfig?: StudioConfig;
  readonly customId?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly notify = inject(NotificationService);
  private readonly _items = signal<CartItem[]>([]);
  // true khi đã có kết quả lần load đầu tiên (login xong fetch API xong, hoặc guest
  // clear ngay) — dùng để phân biệt "giỏ hàng rỗng thật" với "chưa tải xong dữ liệu",
  // tránh các trang như checkout redirect nhầm lúc dữ liệu còn đang tải dở.
  private readonly _loaded = signal(false);

  readonly items  = this._items.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  constructor() {
    // Khi login: load từ BE. Khi logout: clear hết.
    toObservable(this.auth.isLoggedIn).pipe(
      switchMap(loggedIn => {
        if (!loggedIn) {
          this._items.set([]);
          this._loaded.set(true);
          return EMPTY;
        }
        return this.http.get<any>(`${environment.apiUrl}/cart`);
      }),
      takeUntilDestroyed(),
    ).subscribe({
      next: res => {
        if (res?.success) {
          this._items.set(this._mapItems(res.data));
        }
        this._loaded.set(true);
      },
      error: () => this._loaded.set(true),
    });
  }

  private _mapItems(data: any): CartItem[] {
    const productItems: CartItem[] = (data?.items ?? []).map((i: any) => ({
      id: i.cart_item_id,
      type: 'available' as const,
      name: i.product_name ?? '',
      spec: i.size_value ? `Size ${i.size_value}` : '',
      price: Number(i.unit_price),
      image: i.image_url ?? '',
      quantity: i.quantity,
      variantId: i.variant_id,
      maxQuantity: i.stock_quantity != null ? Number(i.stock_quantity) : undefined,
    }));

    // CART-02: item Studio giờ lưu thật ở server (bảng customization), không còn
    // chỉ nằm trong bộ nhớ tạm — sống sót qua F5.
    const customItems: CartItem[] = (data?.customItems ?? []).map((i: any) => ({
      id: i.cart_item_id,
      type: 'studio' as const,
      name: `${i.blank_name ?? 'Trang sức'} Studio`,
      spec: [i.material_name, i.engraving_text ? `Khắc: "${i.engraving_text}"` : null].filter(Boolean).join(' • '),
      price: Number(i.unit_price),
      image: i.blank_image ?? 'assets/images/studio-ring.png',
      quantity: i.quantity,
      customId: i.custom_id,
    }));

    return [...productItems, ...customItems];
  }

  private _reload(): void {
    this.http.get<any>(`${environment.apiUrl}/cart`).subscribe({
      next: res => {
        if (res?.success) this._items.set(this._mapItems(res.data));
      },
    });
  }

  // ── Computed ─────────────────────────────────────────────

  readonly availableCount = computed(() =>
    this._items().filter(i => i.type === 'available')
      .reduce((n, i) => n + (i.quantity ?? 1), 0)
  );

  readonly totalCount = computed(() =>
    this._items().reduce((n, i) => n + (i.quantity ?? 1), 0)
  );

  // ── Buy-now (single product checkout, bypasses cart) ─────
  private readonly _buyNowItem = signal<CartItem | null>(null);
  readonly buyNowItem = this._buyNowItem.asReadonly();

  setBuyNowItem(item: Omit<CartItem, 'id'>): void {
    this._buyNowItem.set({ ...item, id: `buynow-${Date.now()}` });
  }

  clearBuyNowItem(): void { this._buyNowItem.set(null); }

  // ── Lựa chọn tick-chọn ở trang giỏ hàng — trước đây trang Checkout luôn tính
  // TOÀN BỘ giỏ (theo type), bỏ qua việc khách chỉ tick chọn 1 phần để mua, khiến
  // "Thanh toán" tính nhầm cả những món khách chưa muốn mua. null = không có lựa
  // chọn nào (checkout dùng toàn bộ giỏ như trước).
  private readonly _checkoutSelection = signal<Set<string> | null>(null);
  readonly checkoutSelection = this._checkoutSelection.asReadonly();

  setCheckoutSelection(ids: Set<string>): void { this._checkoutSelection.set(ids); }
  clearCheckoutSelection(): void { this._checkoutSelection.set(null); }

  readonly isBumping = signal(false);

  triggerBump(): void {
    this.isBumping.set(true);
    setTimeout(() => this.isBumping.set(false), 400);
  }

  readonly availableTotal = computed(() =>
    this._items().filter(i => i.type === 'available')
      .reduce((s, i) => s + i.price * (i.quantity ?? 1), 0)
  );

  // ── Mutations ─────────────────────────────────────────────

  addItem(item: Omit<CartItem, 'id'>): void {
    // BR-05: Guest vẫn được thêm sản phẩm có sẵn vào giỏ (lưu local, không cần đăng nhập).
    if (item.variantId) {
      if (this.auth.isLoggedIn()) {
        this.http.post<any>(`${environment.apiUrl}/cart/items`, {
          variant_id: item.variantId,
          quantity: item.quantity ?? 1,
          unit_price: item.price,
        }).subscribe({
          next: () => this._reload(),
          error: (err) => this.notify.error(err?.error?.message ?? 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.'),
        });
        return;
      }
      const existing = this._items().find(
        i => i.variantId === item.variantId && i.type === 'available'
      );
      if (existing) { this.updateQty(existing.id, 1); return; }
      this._items.update(items => [...items, { ...item, id: `local-${Date.now()}` }]);
      return;
    }

    // Studio (/studio) luôn yêu cầu đăng nhập từ trước (authGuard) nên tới đây
    // chắc chắn đã có tài khoản — lưu thật vào server thay vì bộ nhớ tạm.
    if (item.type === 'studio' && item.studioConfig) {
      const c = item.studioConfig;
      this.http.post<any>(`${environment.apiUrl}/cart/studio-items`, {
        blankId: c.blankId, materialId: c.materialId, stoneId: c.stoneId,
        carat: c.carat, engraveTextLength: c.engraveText?.length ?? 0, engraveText: c.engraveText,
      }).subscribe({
        next: () => this._reload(),
        error: (err) => this.notify.error(err?.error?.message ?? 'Không thể lưu thiết kế vào giỏ hàng. Vui lòng thử lại.'),
      });
      return;
    }

    this.notify.error('Thiếu thông tin sản phẩm, không thể thêm vào giỏ hàng.');
  }

  removeItem(id: string): void {
    if (id.startsWith('local-') || id.startsWith('buynow-')) {
      this._items.update(items => items.filter(i => i.id !== id));
      return;
    }
    this.http.delete<any>(`${environment.apiUrl}/cart/items/${id}`)
      .subscribe({
        next: () => this._reload(),
        error: (err) => this.notify.error(err?.error?.message ?? 'Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.'),
      });
  }

  // CART-05: xoá nhiều item đã chọn — trước đây khi đã đăng nhập chỉ reload mà
  // không thật sự xoá (giả định sai là server đã tự dọn giỏ), nên "xoá nhiều" không
  // có tác dụng gì. Giờ gọi đúng endpoint xoá hàng loạt (và vẫn xử lý local cho guest).
  removeItems(ids: Set<string>): void {
    if (!ids.size) return;
    const localIds = [...ids].filter(id => id.startsWith('local-') || id.startsWith('buynow-'));
    const serverIds = [...ids].filter(id => !localIds.includes(id));

    if (localIds.length) {
      this._items.update(items => items.filter(i => !localIds.includes(i.id)));
    }
    if (serverIds.length) {
      this.http.post<any>(`${environment.apiUrl}/cart/items/bulk-delete`, { ids: serverIds })
        .subscribe({
          next: () => this._reload(),
          error: (err) => this.notify.error(err?.error?.message ?? 'Không thể xóa các sản phẩm đã chọn. Vui lòng thử lại.'),
        });
    }
  }

  updateQty(id: string, delta: number): void {
    const item = this._items().find(i => i.id === id);
    if (!item || item.type !== 'available') return;

    const newQty = (item.quantity ?? 1) + delta;
    if (newQty < 1) return;

    if (id.startsWith('local-')) {
      if (item.maxQuantity != null && newQty > item.maxQuantity) {
        this.notify.error(`Vượt số lượng còn hàng — chỉ còn ${item.maxQuantity} sản phẩm.`);
        return;
      }
      this._items.update(items => items.map(i => i.id === id ? { ...i, quantity: newQty } : i));
      return;
    }

    this.http.patch<any>(`${environment.apiUrl}/cart/items/${id}`, { quantity: newQty })
      .subscribe({
        next: () => this._reload(),
        error: (err) => this.notify.error(err?.error?.message ?? 'Không thể cập nhật số lượng. Vui lòng thử lại.'),
      });
  }
}
