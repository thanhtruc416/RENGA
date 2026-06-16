import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OldOrdersModalComponent } from '../shared/components/modal/old-orders-modal/old-orders-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, OldOrdersModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly fullName = signal('');
  readonly email = signal('');
  readonly phone = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');
  readonly isSubmitting = signal(false);
  readonly showOldOrders = signal(false);

  setFullName(value: string): void { this.fullName.set(value); }
  setEmail(value: string): void { this.email.set(value); }
  setPhone(value: string): void { this.phone.set(value.replace(/\D/g, '')); }

  onPhoneKeyPress(e: KeyboardEvent): void {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  }

  onPhoneInvalid(e: Event): void {
    const el = e.target as HTMLInputElement;
    if (el.validity.valueMissing) {
      el.setCustomValidity('Vui lòng nhập số điện thoại');
    } else if (el.validity.patternMismatch) {
      el.setCustomValidity('Số điện thoại chỉ được chứa chữ số');
    } else {
      el.setCustomValidity('');
    }
  }

  onEmailInvalid(e: Event): void {
    const el = e.target as HTMLInputElement;
    if (el.validity.valueMissing) {
      el.setCustomValidity('Vui lòng nhập địa chỉ email');
    } else if (el.validity.typeMismatch) {
      el.setCustomValidity('Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: ten@email.com)');
    } else {
      el.setCustomValidity('');
    }
  }
  setPassword(value: string): void { this.password.set(value); }
  setConfirmPassword(value: string): void { this.confirmPassword.set(value); }

  register(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.authService.register({
      fullName: this.fullName(),
      email: this.email(),
      phone: this.phone(),
      password: this.password(),
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.isSubmitting.set(false);
        this.showOldOrders.set(true);
      },
    });
  }

  closeOldOrders(): void { this.showOldOrders.set(false); }

  confirmOldOrders(): void {
    this.showOldOrders.set(false);
    this.authService.mockLogin();
  }

  skipOldOrders(): void {
    this.showOldOrders.set(false);
    this.authService.mockLogin();
  }
}
