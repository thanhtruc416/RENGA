import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User, UserRole } from '../../models/user.model';
import { environment } from '../../../environments/environment';

// ─── Payloads ─────────────────────────────────────────────────────────────────

export interface RegisterSendOtpPayload {
  fullName:        string;
  phone:           string;
  password:        string;
  confirmPassword: string;
  email?:          string;
}

export interface RegisterVerifyOtpPayload {
  fullName:      string;
  phone:         string;
  password:      string;
  email?:        string;
  mergeGuestId?: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordVerifyOtpResponse {
  resetToken: string;
}

export interface ResetPasswordPayload {
  resetToken:      string;
  newPassword:     string;
  confirmPassword: string;
}

// ─── Responses ────────────────────────────────────────────────────────────────

export interface AuthTokenResponse {
  accessToken:  string;
  refreshToken: string;
  clientId:     string;
  fullName:     string;
}

export interface AdminAuthTokenResponse {
  accessToken:  string;
  refreshToken: string;
  employeeId:   string;
  employeeType: string;
  fullName:     string;
}

export interface MessageResponse {
  message: string;
}

export interface CheckGuestResponse {
  hasGuest:       boolean;
  guestClientId?: string;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const ACCESS_TOKEN_KEY  = 'renga_access_token';
const REFRESH_TOKEN_KEY = 'renga_refresh_token';
const USER_KEY          = 'renga_user';

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(this._loadUser());
  private readonly _accessToken = signal<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn  = computed(() => this._accessToken() !== null);
  readonly isAdmin     = computed(() => this._currentUser()?.role === 'admin');

  constructor(
    private readonly http:   HttpClient,
    private readonly router: Router,
  ) {}

  // ── Đăng ký bước 1: gửi OTP ───────────────────────────────────────────────

  registerSendOtp(payload: RegisterSendOtpPayload): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}/auth/register/send-otp`, payload
    );
  }

  // ── Đăng ký bước 2: xác thực OTP → tạo tài khoản ─────────────────────────

  registerVerifyOtp(payload: RegisterVerifyOtpPayload, otp: string): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(
      `${environment.apiUrl}/auth/register/verify-otp`, { ...payload, otp }
    ).pipe(tap(res => this._saveSession(res)));
  }

  // ── Kiểm tra guest theo SĐT ───────────────────────────────────────────────

  checkGuestByPhone(phone: string): Observable<CheckGuestResponse> {
    return this.http.get<CheckGuestResponse>(
      `${environment.apiUrl}/auth/register/check-guest`, { params: { phone } }
    );
  }

  // ── Đăng nhập ─────────────────────────────────────────────────────────────

  login(payload: LoginPayload): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(
      `${environment.apiUrl}/auth/login`, payload
    ).pipe(tap(res => this._saveSession(res)));
  }

  // ── Đăng nhập Admin/Employee ──────────────────────────────────────────────

  adminLogin(payload: AdminLoginPayload): Observable<AdminAuthTokenResponse> {
    return this.http.post<AdminAuthTokenResponse>(
      `${environment.apiUrl}/auth/employee/login`, payload
    ).pipe(tap(res => this._saveAdminSession(res)));
  }

  // ── Quên mật khẩu bước 1: gửi OTP ────────────────────────────────────────

  forgotPasswordSendOtp(phone: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}/auth/forgot-password/send-otp`, { phone }
    );
  }

  // ── Quên mật khẩu bước 2: xác thực OTP → nhận reset token ────────────────

  forgotPasswordVerifyOtp(phone: string, otp: string): Observable<ForgotPasswordVerifyOtpResponse> {
    return this.http.post<ForgotPasswordVerifyOtpResponse>(
      `${environment.apiUrl}/auth/forgot-password/verify-otp`, { phone, otp }
    );
  }

  // ── Quên mật khẩu bước 3: đặt lại MK bằng reset token ───────────────────

  resetPassword(payload: ResetPasswordPayload): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}/auth/forgot-password/reset`, payload
    );
  }

  // ── Mở khoá sau 5 lần sai ─────────────────────────────────────────────────

  sendUnlockOtp(identifier: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}/auth/login/unlock/send-otp`, { identifier }
    );
  }

  verifyUnlockOtp(identifier: string, otp: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}/auth/login/unlock/verify-otp`, { identifier, otp }
    );
  }

  // ── Refresh access token ───────────────────────────────────────────────────

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    return this.http.post<{ accessToken: string }>(
      `${environment.apiUrl}/auth/token/refresh`, { refreshToken }
    ).pipe(tap(res => {
      localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
      this._accessToken.set(res.accessToken);
    }));
  }

  // ── Đăng xuất ─────────────────────────────────────────────────────────────

  logout(): void {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken) {
      this.http.post(`${environment.apiUrl}/auth/logout`, { refreshToken }).subscribe();
    }
    this._clearSession();
    this.router.navigate(['/dang-nhap']);
  }

  getToken(): string | null { return this._accessToken(); }

  // ── Private ────────────────────────────────────────────────────────────────

  private _saveSession(res: AuthTokenResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY,  res.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
    const user: User = { id: res.clientId, fullName: res.fullName, email: '', role: 'customer', avatarUrl: '' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._accessToken.set(res.accessToken);
    this._currentUser.set(user);
  }

  private _saveAdminSession(res: AdminAuthTokenResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY,  res.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
    const role: UserRole = res.employeeType === 'ADMIN' ? 'admin' : 'employee';
    const user: User = { id: res.employeeId, fullName: res.fullName, email: '', role, avatarUrl: '' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._accessToken.set(res.accessToken);
    this._currentUser.set(user);
  }

  private _clearSession(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._accessToken.set(null);
    this._currentUser.set(null);
  }

  private _loadUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as User; } catch { return null; }
  }
}