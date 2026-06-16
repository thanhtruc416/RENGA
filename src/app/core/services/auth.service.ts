import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  name: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  readonly isLoggedIn = signal(false);
  readonly currentUser = signal<AuthUser | null>(null);

  // TODO: replace with HTTP call → this.http.post('/api/auth/login', { phone, password })
  login(phone: string, _password: string): void {
    this.isLoggedIn.set(true);
    this.currentUser.set({ name: phone, phone });
    this.router.navigate(['/']);
  }

  // TODO: replace with HTTP call → this.http.post('/api/auth/register', body)
  register(name: string, phone: string, _password: string): void {
    this.isLoggedIn.set(true);
    this.currentUser.set({ name, phone });
    this.router.navigate(['/']);
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }
}
