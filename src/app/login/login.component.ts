import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  readonly phone = signal('');
  readonly password = signal('');
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);

  setPhone(value: string): void { this.phone.set(value); }
  setPassword(value: string): void { this.password.set(value); }

  togglePassword(): void { this.showPassword.update((v) => !v); }

  login(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.authService.login(this.phone(), this.password());
  }
}
