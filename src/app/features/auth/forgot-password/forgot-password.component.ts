import {
  ChangeDetectionStrategy, Component, computed,
  DestroyRef, ElementRef, inject, QueryList,
  signal, ViewChildren,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';

type Step = 'phone' | 'otp' | 'password' | 'success';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly destroyRef  = inject(DestroyRef);
  private readonly router      = inject(Router);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  // ── State ───────────────────────────────────────────────────────────────────
  readonly step         = signal<Step>('phone');
  readonly isSubmitting = signal(false);

  // Phone step
  readonly phone          = signal('');
  readonly phoneAttempted = signal(false);
  readonly phoneError     = computed(() => {
    if (!this.phoneAttempted()) return '';
    const v = this.phone().trim();
    if (!v) return 'Vui lòng nhập số điện thoại.';
    if (!/^[0-9]{10}$/.test(v)) return 'Số điện thoại phải có đúng 10 chữ số.';
    return '';
  });
  readonly phoneServerError = signal('');

  // OTP step
  readonly otpDigits  = signal(['', '', '', '', '', '']);
  readonly otpError   = signal('');
  readonly countdown  = signal(0);
  private  countdownTimer: ReturnType<typeof setInterval> | null = null;
  readonly otpIndices = [0, 1, 2, 3, 4, 5];
  private  resetToken = '';

  // Password step
  readonly newPassword     = signal('');
  readonly confirmPassword = signal('');
  readonly showPassword    = signal(false);
  readonly passwordError   = signal('');

  // Success step
  readonly redirectIn        = signal(3);
  private  redirectTimer: ReturnType<typeof setInterval> | null = null;

  readonly confirmMismatch = computed(() =>
    !!this.confirmPassword() && this.confirmPassword() !== this.newPassword()
  );

  // ── Bước 1: gửi OTP ─────────────────────────────────────────────────────────
  setPhone(value: string): void { this.phone.set(value.replace(/\D/g, '')); }

  sendCode(): void {
    this.phoneAttempted.set(true);
    if (this.phoneError() || this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.phoneServerError.set('');

    this.authService.forgotPasswordSendOtp(this.phone())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.step.set('otp');
          this.startCountdown();
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.phoneServerError.set(err.error?.message ?? 'Không thể gửi mã. Vui lòng thử lại.');
        },
      });
  }

  resendCode(): void {
    if (this.countdown() > 0 || this.isSubmitting()) return;
    this.isSubmitting.set(true);

    this.authService.forgotPasswordSendOtp(this.phone())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this._clearOtp();
          this.startCountdown();
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.otpError.set(err.error?.message ?? 'Không thể gửi lại mã.');
        },
      });
  }

  // ── Bước 2: xác nhận OTP với server ─────────────────────────────────────────
  confirmOtp(): void {
    const otp = this.otpDigits().join('');
    if (otp.length < 6 || this.isSubmitting()) return;
    this.otpError.set('');
    this.isSubmitting.set(true);

    this.authService.forgotPasswordVerifyOtp(this.phone(), otp)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.resetToken = res.resetToken;
          this.isSubmitting.set(false);
          this.stopCountdown();
          this.step.set('password');
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this._clearOtp();
          this.otpError.set(err.error?.message ?? 'Mã OTP không hợp lệ.');
        },
      });
  }

  // ── OTP input handlers ───────────────────────────────────────────────────────
  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);
    input.value = digit;
    const digits = [...this.otpDigits()];
    digits[index] = digit;
    this.otpDigits.set(digits);
    this.otpError.set('');
    if (digit && index < 5) this._focusOtp(index + 1);
    if (digits.every(d => d !== '')) this.confirmOtp();
  }

  onOtpKeydown(index: number, event: KeyboardEvent): void {
    const inputs = this.otpInputs?.toArray();
    if (!inputs) return;
    if (event.key === 'Backspace') {
      event.preventDefault();
      const cur = inputs[index].nativeElement;
      if (cur.value) {
        cur.value = '';
        const digits = [...this.otpDigits()]; digits[index] = '';
        this.otpDigits.set(digits);
      } else if (index > 0) {
        inputs[index - 1].nativeElement.value = '';
        const digits = [...this.otpDigits()]; digits[index - 1] = '';
        this.otpDigits.set(digits);
        this._focusOtp(index - 1);
      }
    } else if (event.key === 'ArrowLeft'  && index > 0) this._focusOtp(index - 1);
    else if   (event.key === 'ArrowRight' && index < 5) this._focusOtp(index + 1);
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    const inputs = this.otpInputs?.toArray();
    const digits = ['', '', '', '', '', ''];
    [...text].forEach((d, i) => { digits[i] = d; if (inputs?.[i]) inputs[i].nativeElement.value = d; });
    this.otpDigits.set(digits);
    this._focusOtp(Math.min(text.length, 5));
    if (digits.every(d => d !== '')) setTimeout(() => this.confirmOtp(), 0);
  }

  private _focusOtp(index: number): void {
    const el = this.otpInputs?.toArray()?.[index]?.nativeElement;
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }

  private _clearOtp(): void {
    this.otpDigits.set(['', '', '', '', '', '']);
    this.otpInputs?.toArray()?.forEach(i => { i.nativeElement.value = ''; });
    setTimeout(() => this._focusOtp(0), 50);
  }

  // ── Bước 3: đặt lại mật khẩu ────────────────────────────────────────────────
  togglePassword(): void { this.showPassword.update(v => !v); }

  resetPassword(): void {
    if (this.confirmMismatch() || this.isSubmitting()) return;
    const pw = this.newPassword();
    if (!pw) { this.passwordError.set('Vui lòng nhập mật khẩu mới.'); return; }
    this.isSubmitting.set(true);
    this.passwordError.set('');

    this.authService.resetPassword({
      resetToken:      this.resetToken,
      newPassword:     pw,
      confirmPassword: this.confirmPassword(),
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.stopCountdown();
        this.step.set('success');
        this.startRedirect();
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.passwordError.set(err.error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại.');
      },
    });
  }

  // ── Countdown ────────────────────────────────────────────────────────────────
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

  private startRedirect(seconds = 3): void {
    this.redirectIn.set(seconds);
    this.redirectTimer = setInterval(() => {
      this.redirectIn.update(v => {
        if (v <= 1) {
          clearInterval(this.redirectTimer!);
          this.redirectTimer = null;
          this.router.navigate(['/dang-nhap']);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }
}
