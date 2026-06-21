import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly newPassword     = signal('');
  readonly confirmPassword = signal('');
  readonly isSubmitting    = signal(false);
  readonly error           = signal('');
  readonly showPassword    = signal(false);
  readonly popupVisible    = signal(false);
  readonly popupSuccess    = signal(true);
  readonly submitted       = signal(false);

  private mockSuccessNext = true;

  readonly newPasswordError = computed(() => {
    if (!this.submitted()) return '';
    const v = this.newPassword();
    if (!v) return 'Vui lòng nhập mật khẩu mới.';
    if (v.length < 8) return 'Mật khẩu tối thiểu 8 ký tự.';
    return '';
  });

  readonly confirmPasswordError = computed(() => {
    if (!this.submitted()) return '';
    if (!this.confirmPassword()) return 'Vui lòng xác nhận mật khẩu.';
    if (this.newPassword() !== this.confirmPassword()) return 'Mật khẩu xác nhận không khớp.';
    return '';
  });

  togglePassword(): void { this.showPassword.update(v => !v); }
  closePopup(): void { this.popupVisible.set(false); }

  readonly passwordsMatch = computed(() =>
    this.newPassword() === this.confirmPassword()
  );

  setNewPassword(value: string): void { this.newPassword.set(value); }
  setConfirmPassword(value: string): void { this.confirmPassword.set(value); }

  updatePassword(): void {
    if (this.isSubmitting()) return;
    this.submitted.set(true);
    if (this.newPasswordError() || this.confirmPasswordError()) return;
    this.error.set('');
    this.isSubmitting.set(true);
    const willSucceed = this.mockSuccessNext;
    this.mockSuccessNext = !this.mockSuccessNext;
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.popupSuccess.set(willSucceed);
      this.popupVisible.set(true);
    }, 400);
  }
}
