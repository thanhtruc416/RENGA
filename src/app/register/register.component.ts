import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);

  readonly fullName = signal('');
  readonly email = signal('');
  readonly phone = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');
  readonly isSubmitting = signal(false);

  setFullName(value: string): void { this.fullName.set(value); }
  setEmail(value: string): void { this.email.set(value); }
  setPhone(value: string): void { this.phone.set(value); }
  setPassword(value: string): void { this.password.set(value); }
  setConfirmPassword(value: string): void { this.confirmPassword.set(value); }

  register(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.authService.register(this.fullName(), this.phone(), this.password());
  }
}
