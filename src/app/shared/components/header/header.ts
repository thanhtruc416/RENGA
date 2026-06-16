import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  userMenuOpen = signal(false);
  openNav = signal<string | null>(null);

  toggleUserMenu(e: Event): void {
    e.stopPropagation();
    this.openNav.set(null);
    this.userMenuOpen.update(v => !v);
  }

  openNavItem(key: string): void {
    this.userMenuOpen.set(false);
    this.openNav.set(key);
  }

  closeNavItem(): void {
    this.openNav.set(null);
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