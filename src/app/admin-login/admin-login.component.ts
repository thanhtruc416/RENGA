import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';

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
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly error = signal('');

  onSubmit(form: { nativeElement: HTMLFormElement } | HTMLFormElement): void {
    const el = (form as any).nativeElement ?? form as HTMLFormElement;
    const data = new FormData(el);
    const username = (data.get('username') as string).trim();
    const password = (data.get('password') as string).trim();

    if (!username || !password) {
      this.error.set('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set('');

    setTimeout(() => {
      if (!environment.production &&
          username === environment.mockAdminUser &&
          password === environment.mockAdminPass) {
        this.authService.mockLogin();
        this.router.navigate(['/admin']);
      } else {
        this.isSubmitting.set(false);
        this.error.set('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    }, 600);
  }
}
