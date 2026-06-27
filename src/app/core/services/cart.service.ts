import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

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
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  constructor() {
    // Khi login: load từ BE. Khi logout: clear hết.
    toObservable(this.auth.isLoggedIn).pipe(
      switchMap(loggedIn => {
        if (!loggedIn) {
          this._items.set([]);
          return EMPTY;
        }
        return this.http.get<any>(`${environment.apiUrl}/cart`);
      }),
      takeUntilDestroyed(),
    ).subscribe(res => {
      if (res?.success) {
        this._items.set(this._mapItems(res.data?.items ?? []));
      }
    });
  }

  private _mapItems(raw: any[]): CartItem[] {
    return raw.map(i => ({
      id: i.cart_item_id,
      type: 'available' as const,
      name: i.product_name ?? '',
      spec: i.size_value ? `Size ${i.size_value}` : '',
      price: Number(i.unit_price),
      image: i.image_url ?? '',
      quantity: i.quantity,
      variantId: i.variant_id,
    }));
  }

  private _reload(): void {
    this.http.get<any>(`${environment.apiUrl}/cart`).subscribe({
      next: res => {
        if (res?.success) this._items.set(this._mapItems(res.data?.items ?? []));
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
    if (this.auth.isLoggedIn() && item.variantId) {
      this.http.post<any>(`${environment.apiUrl}/cart/items`, {
        variant_id: item.variantId,
        quantity: item.quantity ?? 1,
        unit_price: item.price,
      }).subscribe({ next: () => this._reload() });
      return;
    }
    // Guest hoặc studio: lưu local
    const existing = this._items().find(
      i => i.name === item.name && i.spec === item.spec && i.type === item.type
    );
    if (existing) {
      this.updateQty(existing.id, 1);
      return;
    }
    this._items.update(items => [...items, { ...item, id: `local-${Date.now()}` }]);
  }

  removeItem(id: string): void {
    if (this.auth.isLoggedIn() && !id.startsWith('local-')) {
      this.http.delete<any>(`${environment.apiUrl}/cart/items/${id}`)
        .subscribe({ next: () => this._reload() });
      return;
    }
    this._items.update(items => items.filter(i => i.id !== id));
  }

  removeItems(ids: Set<string>): void {
    if (this.auth.isLoggedIn()) {
      // Server đã clearCart sau khi tạo đơn hàng — reload là đủ
      this._reload();
    } else {
      this._items.update(items => items.filter(i => !ids.has(i.id)));
    }
  }

  updateQty(id: string, delta: number): void {
    const item = this._items().find(i => i.id === id);
    if (!item || item.type !== 'available') return;

    const newQty = (item.quantity ?? 1) + delta;
    if (newQty < 1) return;

    if (this.auth.isLoggedIn() && !id.startsWith('local-')) {
      this.http.patch<any>(`${environment.apiUrl}/cart/items/${id}`, { quantity: newQty })
        .subscribe({ next: () => this._reload() });
      return;
    }
    this._items.update(items =>
      items.map(i => i.id === id ? { ...i, quantity: newQty } : i)
    );
  }
}
