import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginFailModalComponent } from '../shared/components/modal/login-fail-modal/login-fail-modal.component';
import { PhoneNotFoundModalComponent } from '../shared/components/modal/phone-not-found-modal/phone-not-found-modal.component';

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
  private readonly router = inject(Router);

  readonly phone = signal('');
  readonly password = signal('');
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);

  readonly showLoginFail = signal(false);
  readonly showPhoneNotFound = signal(false);
  readonly remainingAttempts = signal(3);

  setPhone(value: string): void { this.phone.set(value); }
  setPassword(value: string): void { this.password.set(value); }
  togglePassword(): void { this.showPassword.update((v) => !v); }

  login(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.authService.login({ phone: this.phone(), password: this.password() }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.isSubmitting.set(false);
        // Bypass mock login cho FE dev
        const MOCK_PHONES = ['0000000000', '0373265707'];
        if (MOCK_PHONES.includes(this.phone())) {
          this.authService.mockLogin();
          return;
        }
        // Giả lập: phone < 10 số → chưa đăng ký, ngược lại → sai mật khẩu
        const digits = this.phone().replace(/\D/g, '');
        if (digits.length < 10) {
          this.showPhoneNotFound.set(true);
        } else {
          this.remainingAttempts.update(v => Math.max(0, v - 1));
          this.showLoginFail.set(true);
        }
      },
    });
  }

  closeLoginFail(): void { this.showLoginFail.set(false); }
  closePhoneNotFound(): void { this.showPhoneNotFound.set(false); }
}
