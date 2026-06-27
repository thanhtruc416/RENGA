import {
  ChangeDetectionStrategy, Component, DestroyRef,
  ElementRef, inject, QueryList, signal,
  ViewChildren, ViewEncapsulation,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl, FormControl, FormGroup,
  ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { OldOrdersModalComponent } from '../../../shared/components/modal/old-orders-modal/old-orders-modal.component';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const cf = group.get('confirmPassword')?.value;
  return pw && cf && pw !== cf ? { mismatch: true } : null;
}

type Step = 'form' | 'otp';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, ReactiveFormsModule, OldOrdersModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);
  private readonly destroyRef  = inject(DestroyRef);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  // ── State ──────────────────────────────────────────────────────────────────

  readonly step          = signal<Step>('form');
  readonly isSubmitting  = signal(false);
  readonly showPassword  = signal(false);
  readonly popupVisible  = signal(false);
  readonly popupSuccess  = signal(true);
  readonly showOldOrders = signal(false);
  readonly otpError      = signal('');
  readonly serverError   = signal('');

  // Countdown gửi lại OTP
  readonly countdown     = signal(0);
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  // OTP 6 ô
  readonly otpDigits = signal<string[]>(['', '', '', '', '', '']);

  // Guest merge
  private pendingGuestId: string | null = null;
  private mockSuccessNext = true;

  // ── Form ───────────────────────────────────────────────────────────────────

  readonly form = new FormGroup({
    fullName:        new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email:           new FormControl('', { nonNullable: true }),
    phone:           new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)] }),
    password:        new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  }, { validators: passwordsMatch });

  togglePassword(): void { this.showPassword.update(v => !v); }

  // ── Bước 1: Submit form → gửi OTP ─────────────────────────────────────────

  register(): void {
    this.form.markAllAsTouched();
    if (this.isSubmitting() || this.form.invalid) return;

    const { fullName, email, phone, password, confirmPassword } = this.form.getRawValue();

    this.isSubmitting.set(true);
    this.serverError.set('');

    this.authService.registerSendOtp({ fullName, phone, password, confirmPassword, email: email || undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.step.set('otp');
          this.startCountdown();

          // Kiểm tra guest song song
          this.authService.checkGuestByPhone(phone)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => {
              if (res.hasGuest && res.guestClientId) {
                this.pendingGuestId = res.guestClientId;
                this.showOldOrders.set(true);
              }
            });
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          if (!environment.production) {
            // Dev mock: vẫn chuyển sang bước OTP để test UI
            this.step.set('otp');
            this.startCountdown();
            return;
          }
          this.serverError.set(err.error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại.');
        },
      });
  }

  // ── OTP input handling ─────────────────────────────────────────────────────

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const val   = input.value.replace(/\D/g, '').slice(-1);

    const digits = [...this.otpDigits()];
    digits[index] = val;
    this.otpDigits.set(digits);
    this.otpError.set('');

    if (val && index < 5) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }

    // Auto-submit khi đủ 6 số
    if (digits.every(d => d !== '')) {
      this.submitOtpWithValue(digits.join(''));
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      const digits = [...this.otpDigits()];
      if (!digits[index] && index > 0) {
        digits[index - 1] = '';
        this.otpDigits.set(digits);
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      } else {
        digits[index] = '';
        this.otpDigits.set(digits);
      }
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
    if (event.key === 'ArrowRight' && index < 5) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text   = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    const filled = ['', '', '', '', '', ''];
    digits.forEach((d, i) => { filled[i] = d; });
    this.otpDigits.set(filled);

    const focusIdx = Math.min(digits.length - 1, 5);
    this.otpInputs.get(focusIdx)?.nativeElement.focus();

    if (filled.every(d => d !== '')) {
      const otpString = filled.join(''); // ← lấy thẳng từ filled, không từ signal
      setTimeout(() => this.submitOtpWithValue(otpString), 0);
    }
  }

  // ── Bước 2: xác thực OTP ──────────────────────────────────────────────────

  submitOtp(): void {
    this.submitOtpWithValue(this.otpDigits().join(''));
  }

  private submitOtpWithValue(otp: string): void {
    if (otp.length < 6 || this.isSubmitting()) return;

    const { fullName, email, phone, password } = this.form.getRawValue();
    this.isSubmitting.set(true);
    this.otpError.set('');

    this.authService.registerVerifyOtp(
      {
        fullName, phone, password,
        email:         email || undefined,
        mergeGuestId:  this.pendingGuestId ?? undefined,
      },
      otp
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.popupSuccess.set(true);
        this.popupVisible.set(true);
        this.stopCountdown();
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        if (!environment.production) {
          const ok = this.mockSuccessNext;
          this.mockSuccessNext = !this.mockSuccessNext;
          this.popupSuccess.set(ok);
          this.popupVisible.set(true);
          return;
        }
        this.otpError.set(err.error?.message ?? 'Mã OTP không hợp lệ.');
        this._clearOtp();
      },
    });
  }

  // ── Gửi lại OTP ───────────────────────────────────────────────────────────

  resendOtp(): void {
    if (this.countdown() > 0) return;
    const { fullName, email, phone, password, confirmPassword } = this.form.getRawValue();

    this.authService.registerSendOtp({ fullName, phone, password, confirmPassword, email: email || undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._clearOtp();
          this.startCountdown();
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            this._clearOtp();
            this.startCountdown();
            return;
          }
          this.otpError.set(err.error?.message ?? 'Không thể gửi lại mã.');
        },
      });
  }

  // ── Popup ──────────────────────────────────────────────────────────────────

  closePopup(): void {
    this.popupVisible.set(false);
    if (this.popupSuccess()) {
      this.router.navigate(['/dang-nhap']);
    }
  }

  // ── Guest merge ────────────────────────────────────────────────────────────

  closeOldOrders(): void   { this.showOldOrders.set(false); this.pendingGuestId = null; }
  confirmOldOrders(): void { this.showOldOrders.set(false); /* pendingGuestId giữ lại để submitOtp dùng */ }
  skipOldOrders(): void    { this.showOldOrders.set(false); this.pendingGuestId = null; }

  // ── Countdown ──────────────────────────────────────────────────────────────

  startCountdown(seconds = 30): void {
    this.countdown.set(seconds);
    this.stopCountdown();
    this.countdownTimer = setInterval(() => {
      this.countdown.update(v => {
        if (v <= 1) { this.stopCountdown(); return 0; }
        return v - 1;
      });
    }, 1000);
  }

  stopCountdown(): void {
    if (this.countdownTimer) { clearInterval(this.countdownTimer); this.countdownTimer = null; }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private _clearOtp(): void {
    this.otpDigits.set(['', '', '', '', '', '']);
    setTimeout(() => this.otpInputs.get(0)?.nativeElement.focus(), 50);
  }

  get otpFilled(): boolean { return this.otpDigits().every(d => d !== ''); }
}