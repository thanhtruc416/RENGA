import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  readonly userMenuOpen = signal(false);
  readonly openNav = signal<string | null>(null);

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

  @HostListener('document:click')
  closeAll(): void {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
  }
}