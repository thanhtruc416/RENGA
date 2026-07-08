import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoginFailModalComponent } from '../../../shared/components/modal/login-fail-modal/login-fail-modal.component';
import { PhoneNotFoundModalComponent } from '../../../shared/components/modal/phone-not-found-modal/phone-not-found-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LoginFailModalComponent, PhoneNotFoundModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly notify = inject(NotificationService);
  private readonly router = inject(Router);

  readonly identifier = signal('');
  readonly password = signal('');
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);

  readonly showLoginFail     = signal(false);
  readonly showPhoneNotFound = signal(false);
  readonly showAccountLocked = signal(false);
  readonly showInactive      = signal(false);
  readonly remainingAttempts = signal(5);

  setIdentifier(value: string): void { this.identifier.set(value); }
  setPassword(value: string): void { this.password.set(value); }
  togglePassword(): void { this.showPassword.update((v) => !v); }

  // Một link đăng nhập duy nhất: email → tài khoản nhân viên/admin, còn lại → khách hàng (SĐT).
  private isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  login(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);

    if (this.isEmail(this.identifier())) {
      this.loginAsEmployee();
    } else {
      this.loginAsCustomer();
    }
  }

  private loginAsCustomer(): void {
    this.authService.login({ phone: this.identifier(), password: this.password() }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        if (err.status === 404) {
          this.showPhoneNotFound.set(true);
        } else if (err.status === 401) {
          const fromServer = err.error?.remainingAttempts;
          if (typeof fromServer === 'number') {
            this.remainingAttempts.set(fromServer);
          } else {
            this.remainingAttempts.update(v => Math.max(0, v - 1));
          }
          this.showLoginFail.set(true);
        } else if (err.status === 423) {
          this.showAccountLocked.set(true);
        } else if (err.status === 403) {
          this.showInactive.set(true);
        } else {
          this.notify.error(err.error?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.');
        }
      },
    });
  }

  private loginAsEmployee(): void {
    this.authService.adminLogin({ email: this.identifier(), password: this.password() }).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.notify.error(err.error?.message ?? 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
      },
    });
  }

  closeLoginFail(): void     { this.showLoginFail.set(false); }
  closePhoneNotFound(): void { this.showPhoneNotFound.set(false); }
  closeAccountLocked(): void { this.showAccountLocked.set(false); }
  closeInactive(): void      { this.showInactive.set(false); }
}
