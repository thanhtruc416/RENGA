import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly userMenuOpen = signal(false);
  readonly orderMenuOpen = signal(false);
  readonly openNav = signal<string | null>(null);

  toggleUserMenu(e: Event): void {
    e.stopPropagation();
    this.orderMenuOpen.set(false);
    this.openNav.set(null);
    this.userMenuOpen.update((v) => !v);
  }

  toggleOrderMenu(e: Event): void {
    e.stopPropagation();
    this.userMenuOpen.set(false);
    this.openNav.set(null);
    this.orderMenuOpen.update((v) => !v);
  }

  toggleNav(e: Event, key: string): void {
    e.stopPropagation();
    this.userMenuOpen.set(false);
    this.orderMenuOpen.set(false);
    this.openNav.update((current) => (current === key ? null : key));
  }

  closeAll(): void {
    this.userMenuOpen.set(false);
    this.orderMenuOpen.set(false);
    this.openNav.set(null);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeAll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }
}