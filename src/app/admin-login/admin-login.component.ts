import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  private readonly authService = inject(AuthService);
  private readonly notify = inject(NotificationService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly error = signal('');

  onSubmit(form: { nativeElement: HTMLFormElement } | HTMLFormElement): void {
    const el = (form as any).nativeElement ?? form as HTMLFormElement;
    const data = new FormData(el);
    const email = (data.get('email') as string).trim();
    const password = (data.get('password') as string).trim();

    if (!email || !password) {
      this.error.set('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set('');

    this.authService.adminLogin({ email, password }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const msg = err?.error?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.';
        this.error.set(msg);
        this.notify.error(msg);
      },
    });
  }
}
