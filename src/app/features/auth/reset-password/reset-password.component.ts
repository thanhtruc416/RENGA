import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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

  setNewPassword(value: string): void { this.newPassword.set(value); }
  setConfirmPassword(value: string): void { this.confirmPassword.set(value); }

  updatePassword(): void {
    if (this.isSubmitting()) return;
    if (!this.newPassword().trim()) return;
    this.isSubmitting.set(true);
    // TODO: call API để cập nhật password — hiện tại mock login cho FE dev
    this.authService.mockLogin();
  }
}
