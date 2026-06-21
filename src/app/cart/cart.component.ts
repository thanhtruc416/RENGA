import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  readonly isGuest = computed(() => !this.authService.isLoggedIn());

  readonly activeTab = signal<'available' | 'studio'>('available');
  readonly selectedIds = signal<Set<number>>(new Set());

  readonly filteredItems = computed(() =>
    this.cartService.items().filter((item) => item.type === this.activeTab())
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

  readonly allSelected = computed(() =>
    this.filteredItems().length > 0 &&
    this.filteredItems().every((item) => this.selectedIds().has(item.id))
  );

  // ── Methods ──────────────────────────────────────────────

  switchTab(tab: 'available' | 'studio'): void {
    this.activeTab.set(tab);
    this.selectedIds.set(new Set());
  }

  selectAll(): void {
    this.selectedIds.set(new Set(this.filteredItems().map((item) => item.id)));
  }

  deselectAll(): void {
    this.selectedIds.set(new Set());
  }

  toggleSelectItem(id: number): void {
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
    this.cartService.removeItems(this.selectedIds());
    this.selectedIds.set(new Set());
  }

  updateQty(id: number, delta: number): void {
    this.cartService.updateQty(id, delta);
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}