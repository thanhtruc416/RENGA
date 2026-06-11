import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userMenuOpen = signal(false);
  openNav = signal<string | null>(null);

  toggleUserMenu(e: Event) {
    e.stopPropagation();
    this.openNav.set(null);
    this.userMenuOpen.update(v => !v);
  }

  toggleNav(e: Event, key: string) {
    e.stopPropagation();
    this.userMenuOpen.set(false);
    this.openNav.update(current => current === key ? null : key);
  }

  @HostListener('document:click')
  closeAll() {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
  }
}