import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, filter, map, of, startWith } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, ProductsService } from '../../../products/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './header.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly auth = inject(AuthService);
  readonly cart = inject(CartService);
  private readonly productsService = inject(ProductsService);
  readonly userMenuOpen = signal(false);
  readonly openNav = signal<string | null>(null);
  readonly mobileNavOpen = signal(false);

  readonly searchTerm = signal('');
  readonly showSearchResults = signal(false);
  private readonly searchInput$ = new Subject<string>();
  readonly searchResults = toSignal(
    this.searchInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) => (q.trim().length < 1 ? of<Product[]>([]) : this.productsService.getProducts(undefined, 1, 6, q))),
    ),
    { initialValue: [] as Product[] },
  );

  private readonly router = inject(Router);
  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );
  readonly isOnProducts = computed(() => this.currentUrl()?.startsWith('/products') ?? false);
  readonly isOnCollections = computed(() => this.currentUrl()?.startsWith('/bo-suu-tap') ?? false);
  readonly isOnDesigner = computed(() => {
    const url = this.currentUrl() ?? '';
    return url.startsWith('/the-designer') || url.startsWith('/consultation') || url.startsWith('/appointment-history');
  });

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.showSearchResults.set(value.trim().length > 0);
    this.searchInput$.next(value);
  }

  onSearchFocus(): void {
    if (this.searchTerm().trim().length > 0) this.showSearchResults.set(true);
  }

  selectSearchResult(product: Product, e: Event): void {
    e.stopPropagation();
    this.showSearchResults.set(false);
    this.searchTerm.set('');
    this.router.navigate(['/products', product.id]);
  }

  toggleUserMenu(e: Event): void {
    e.stopPropagation();
    this.openNav.set(null);
    this.userMenuOpen.update((v) => !v);
  }

  toggleNav(e: Event, key: string): void {
    e.stopPropagation();
    this.userMenuOpen.set(false);
    this.openNav.update((current) => (current === key ? null : key));
  }

  toggleMobileNav(e: Event): void {
    e.stopPropagation();
    this.userMenuOpen.set(false);
    this.openNav.set(null);
    this.mobileNavOpen.update((v) => !v);
  }

  @HostListener('document:click')
  closeAll(): void {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
    this.mobileNavOpen.set(false);
    this.showSearchResults.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
    this.mobileNavOpen.set(false);
    this.showSearchResults.set(false);
  }
}