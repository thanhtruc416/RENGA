import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { OldOrdersModalComponent } from '../../../shared/components/modal/old-orders-modal/old-orders-modal.component';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const cf = group.get('confirmPassword')?.value;
  return pw && cf && pw !== cf ? { mismatch: true } : null;
}

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
  private readonly destroyRef = inject(DestroyRef);

  readonly isSubmitting = signal(false);
  readonly showOldOrders = signal(false);
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);
  readonly showSuccess = signal(false);

  togglePassword(): void { this.showPassword.update(v => !v); }
  toggleConfirmPassword(): void { this.showConfirmPassword.update(v => !v); }

  readonly form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  }, { validators: passwordsMatch });

  register(): void {
    this.form.markAllAsTouched();
    if (this.isSubmitting() || this.form.invalid) return;
    this.isSubmitting.set(true);
    const { fullName, email, phone, password } = this.form.getRawValue();
    this.authService.register({ fullName, email, phone, password }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.showSuccess.set(true);
        const timer = setTimeout(() => this.router.navigate(['/dang-nhap']), 2000);
        this.destroyRef.onDestroy(() => clearTimeout(timer));
      },
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
