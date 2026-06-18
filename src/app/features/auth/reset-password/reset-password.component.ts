import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly newPassword = signal('');
  readonly confirmPassword = signal('');
  readonly isSubmitting = signal(false);
  readonly error = signal('');

  readonly passwordsMatch = computed(() =>
    this.newPassword() === this.confirmPassword()
  );

  setNewPassword(value: string): void { this.newPassword.set(value); }
  setConfirmPassword(value: string): void { this.confirmPassword.set(value); }

  updatePassword(): void {
    if (this.isSubmitting()) return;
    if (!this.newPassword().trim()) {
      this.error.set('Vui lòng nhập mật khẩu mới.');
      return;
    }
    if (!this.passwordsMatch()) {
      this.error.set('Mật khẩu xác nhận không khớp.');
      return;
    }
    this.error.set('');
    this.isSubmitting.set(true);
    // TODO: call API to update password
    // this.authService.resetPassword(this.newPassword()).subscribe({
    //   next: () => this.router.navigate(['/dang-nhap']),
    //   error: () => { this.isSubmitting.set(false); this.error.set('Có lỗi xảy ra, vui lòng thử lại.'); }
    // });
    this.isSubmitting.set(false);
    this.router.navigate(['/dang-nhap']);
  }
}
