import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly auth = inject(AuthService);
  readonly cart = inject(CartService);
  readonly userMenuOpen = signal(false);
  readonly openNav = signal<string | null>(null);
  readonly mobileNavOpen = signal(false);

  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(
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
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
    this.mobileNavOpen.set(false);
  }
}