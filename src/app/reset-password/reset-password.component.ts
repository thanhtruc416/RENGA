import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  readonly newPassword = signal('');
  readonly confirmPassword = signal('');
  readonly isSubmitting = signal(false);

  setNewPassword(value: string): void { this.newPassword.set(value); }
  setConfirmPassword(value: string): void { this.confirmPassword.set(value); }

  updatePassword(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    // TODO: call auth service
  }
}
