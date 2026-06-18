import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CartItem {
  readonly id: number;
  readonly type: 'available' | 'studio';
  readonly name: string;
  readonly spec: string;
  readonly price: number;
  readonly image: string;
  quantity?: number;
  readonly savedDate?: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {

  readonly initialItems: CartItem[] = [
    {
      id: 1,
      type: 'available',
      name: 'Vòng cổ kim cương Noir',
      spec: 'Vàng Trắng 18K • 1.5 Carat Diamond',
      price: 75_000_000,
      quantity: 1,
      image: 'assets/images/sp-vong-co-noir.webp',
    },
    {
      id: 2,
      type: 'available',
      name: 'Nhẫn đính hôn Royal',
      spec: 'Bạch Kim • 2 Carat Diamond',
      price: 120_000_000,
      quantity: 1,
      image: 'assets/images/sp-nhan-royal.webp',
    },
    {
      id: 3,
      type: 'available',
      name: 'Vòng cổ kim cương Noir',
      spec: 'Vàng Trắng 18K • 1.5 Carat Diamond',
      price: 75_000_000,
      quantity: 1,
      image: 'assets/images/sp-vong-co-noir.webp',
    },
    {
      id: 4,
      type: 'available',
      name: 'Nhẫn đính hôn Royal',
      spec: 'Bạch Kim • 2 Carat Diamond',
      price: 120_000_000,
      quantity: 1,
      image: 'assets/images/sp-nhan-royal.webp',
    },
    {
      id: 5,
      type: 'studio',
      name: 'Vòng tay Custom Tên',
      spec: 'Vàng Hồng 18K',
      price: 45_000_000,
      savedDate: '15/09/2026  12:22',
      image: 'assets/images/sp-vong-tay-custom.webp',
    },
    {
      id: 6,
      type: 'studio',
      name: 'Khuyên tai Tối Giản',
      spec: 'Vàng 18K',
      price: 18_500_000,
      savedDate: '20/09/2026  09:15',
      image: 'assets/images/sp-khuyen-tai.webp',
    },
    {
      id: 7,
      type: 'studio',
      name: 'Vòng tay Custom Tên',
      spec: 'Vàng Hồng 18K',
      price: 45_000_000,
      savedDate: '15/09/2026  12:22',
      image: 'assets/images/sp-vong-tay-custom.webp',
    },
    {
      id: 8,
      type: 'studio',
      name: 'Khuyên tai Tối Giản',
      spec: 'Vàng 18K',
      price: 18_500_000,
      savedDate: '20/09/2026  09:15',
      image: 'assets/images/sp-khuyen-tai.webp',
    },
  ];

  readonly activeTab = signal<'available' | 'studio'>('available');
  readonly cartItems = signal<CartItem[]>(this.initialItems);
  readonly isSelecting = signal(false);
  readonly selectedIds = signal<Set<number>>(new Set());

  readonly filteredItems = computed(() =>
    this.cartItems().filter((item) => item.type === this.activeTab())
  );

  readonly totalCount = computed(() =>
    this.filteredItems().reduce((count, item) => count + (item.quantity ?? 1), 0)
  );

  readonly totalPrice = computed(() =>
    this.filteredItems().reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0)
  );

  readonly selectedTotal = computed(() => {
    const ids = this.selectedIds();
    return this.filteredItems()
      .filter((item) => ids.has(item.id))
      .reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  });

  readonly selectedCount = computed(() => this.selectedIds().size);

  // ── Methods ──────────────────────────────────────────────

  switchTab(tab: 'available' | 'studio'): void {
    this.activeTab.set(tab);
    this.resetSelection();
  }

  resetSelection(): void {
    this.isSelecting.set(false);
    this.selectedIds.set(new Set());
  }

  toggleSelecting(): void {
    const next = !this.isSelecting();
    this.isSelecting.set(next);
    if (!next) this.selectedIds.set(new Set());
  }

  toggleSelectItem(id: number): void {
    if (!this.isSelecting()) return;
    this.selectedIds.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  deleteSelected(): void {
    const ids = this.selectedIds();
    this.cartItems.update((items) => items.filter((item) => !ids.has(item.id)));
    this.selectedIds.set(new Set());
    this.isSelecting.set(false);
  }

  updateQty(id: number, delta: number): void {
    this.cartItems.update((items) =>
      items.map((item) => {
        if (item.id === id && item.type === 'available') {
          const newQty = (item.quantity ?? 1) + delta;
          return newQty >= 1 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  }

  removeItem(id: number): void {
    this.cartItems.update((items) => items.filter((item) => item.id !== id));
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}