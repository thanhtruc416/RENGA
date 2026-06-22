import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../models/api-response.model';
import { environment } from '../../../environments/environment';

interface LoginPayload {
  phone: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthData {
  user: User;
  token: string;
}

const TOKEN_KEY = 'renga_token';
const USER_KEY = 'renga_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(this._loadUser());
  private readonly _token = signal<string | null>(this._loadToken());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._token() !== null);
  readonly isAdmin = computed(() => this._currentUser()?.role === 'admin');

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginPayload): Observable<ApiResponse<AuthData>> {
    return this.http.post<ApiResponse<AuthData>>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap(res => {
        if (res.success) {
          this._saveSession(res.data.token, res.data.user);
        }
      })
    );
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthData>> {
    return this.http.post<ApiResponse<AuthData>>(`${environment.apiUrl}/auth/register`, payload).pipe(
      tap(res => {
        if (res.success) {
          this._saveSession(res.data.token, res.data.user);
        }
      })
    );
  }

  /** Dùng cho FE dev khi chưa có backend — tạo session giả để test UI */
  mockLogin(): void {
    this._saveSession('mock-token-dev', {
      id: '1',
      fullName: 'Admin RENGA',
      email: 'admin@renga.vn',
      role: 'admin',
      avatarUrl: '',
    } as User);
    this.router.navigate(['/']);
  }

  mockAdminLogin(): void {
    this._saveSession('mock-admin-token', {
      id: '1',
      fullName: 'Admin RENGA',
      email: 'admin@renga.vn',
      role: 'admin',
      avatarUrl: '',
    } as User);
    this.router.navigate(['/admin']);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
    this._token.set(null);
    this.router.navigate(['/dang-nhap']);
  }

  getToken(): string | null {
    return this._token();
  }

  private _saveSession(token: string, user: User): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._token.set(token);
    this._currentUser.set(user);
  }

  private _loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private _loadUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as User; } catch { return null; }
  }
}
