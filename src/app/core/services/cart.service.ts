import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  readonly id: number;
  readonly type: 'available' | 'studio';
  readonly name: string;
  readonly spec: string;
  readonly price: number;
  readonly image: string;
  quantity?: number;
  readonly savedDate?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([
    { id: 1, type: 'available', name: 'Vòng cổ kim cương Noir', spec: 'Vàng Trắng 18K • 1.5 Carat Diamond', price: 75_000_000, quantity: 1, image: 'assets/images/sp-vong-co-noir.webp' },
    { id: 2, type: 'available', name: 'Nhẫn đính hôn Royal', spec: 'Bạch Kim • 2 Carat Diamond', price: 120_000_000, quantity: 1, image: 'assets/images/sp-nhan-royal.webp' },
    { id: 3, type: 'available', name: 'Vòng cổ kim cương Noir', spec: 'Vàng Trắng 18K • 1.5 Carat Diamond', price: 75_000_000, quantity: 1, image: 'assets/images/sp-vong-co-noir.webp' },
    { id: 4, type: 'available', name: 'Nhẫn đính hôn Royal', spec: 'Bạch Kim • 2 Carat Diamond', price: 120_000_000, quantity: 1, image: 'assets/images/sp-nhan-royal.webp' },
    { id: 5, type: 'studio', name: 'Vòng tay Custom Tên', spec: 'Vàng Hồng 18K', price: 45_000_000, savedDate: '15/09/2026  12:22', image: 'assets/images/sp-vong-tay-custom.webp' },
    { id: 6, type: 'studio', name: 'Khuyên tai Tối Giản', spec: 'Vàng 18K', price: 18_500_000, savedDate: '20/09/2026  09:15', image: 'assets/images/sp-khuyen-tai.webp' },
    { id: 7, type: 'studio', name: 'Vòng tay Custom Tên', spec: 'Vàng Hồng 18K', price: 45_000_000, savedDate: '15/09/2026  12:22', image: 'assets/images/sp-vong-tay-custom.webp' },
    { id: 8, type: 'studio', name: 'Khuyên tai Tối Giản', spec: 'Vàng 18K', price: 18_500_000, savedDate: '20/09/2026  09:15', image: 'assets/images/sp-khuyen-tai.webp' },
  ]);

  readonly items = this._items.asReadonly();

  readonly availableCount = computed(() =>
    this._items()
      .filter(i => i.type === 'available')
      .reduce((n, i) => n + (i.quantity ?? 1), 0)
  );

  readonly isBumping = signal(false);

  triggerBump(): void {
    this.isBumping.set(true);
    setTimeout(() => this.isBumping.set(false), 400);
  }

  readonly availableTotal = computed(() =>
    this._items()
      .filter(i => i.type === 'available')
      .reduce((s, i) => s + i.price * (i.quantity ?? 1), 0)
  );

  addItem(item: Omit<CartItem, 'id'>): void {
    const existing = this._items().find(
      i => i.name === item.name && i.spec === item.spec && i.type === item.type
    );
    if (existing) {
      this.updateQty(existing.id, 1);
      return;
    }
    const newId = Math.max(0, ...this._items().map(i => i.id)) + 1;
    this._items.update(items => [...items, { ...item, id: newId }]);
  }

  removeItem(id: number): void {
    this._items.update(items => items.filter(i => i.id !== id));
  }

  removeItems(ids: Set<number>): void {
    this._items.update(items => items.filter(i => !ids.has(i.id)));
  }

  updateQty(id: number, delta: number): void {
    this._items.update(items =>
      items.map(item => {
        if (item.id === id && item.type === 'available') {
          const newQty = (item.quantity ?? 1) + delta;
          return newQty >= 1 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  }
}
