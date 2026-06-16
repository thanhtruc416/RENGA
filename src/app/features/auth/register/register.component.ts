import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { OldOrdersModalComponent } from '../../../shared/components/modal/old-orders-modal/old-orders-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, OldOrdersModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly showOldOrders = signal(false);

  readonly form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  register(): void {
    if (this.isSubmitting() || this.form.invalid) return;
    this.isSubmitting.set(true);
    const { fullName, email, phone, password } = this.form.getRawValue();
    this.authService.register({ fullName, email, phone, password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        if (err.status === 409 && err.error?.code === 'EXISTING_ORDERS') {
          this.showOldOrders.set(true);
        }
      },
    });
  }

  closeOldOrders(): void { this.showOldOrders.set(false); }

  confirmOldOrders(): void {
    this.showOldOrders.set(false);
    if (!environment.production) this.authService.mockLogin();
  }

  skipOldOrders(): void {
    this.showOldOrders.set(false);
    if (!environment.production) this.authService.mockLogin();
  }
}
