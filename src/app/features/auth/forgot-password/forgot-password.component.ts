import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly phone           = signal('');
  readonly phoneAttempted  = signal(false);
  readonly codeSent        = signal(false);
  readonly countdown       = signal(0);
  readonly otpDigits       = signal(['', '', '', '', '', '']);
  readonly isSubmitting    = signal(false);

  readonly otpIndices = [0, 1, 2, 3, 4, 5];

  readonly phoneError = computed(() => {
    if (!this.phoneAttempted()) return '';
    const v = this.phone().trim();
    if (!v) return 'Vui lòng nhập số điện thoại.';
    if (!/^[0-9]{10}$/.test(v)) return 'Số điện thoại phải có đúng 10 chữ số.';
    return '';
  });

  setPhone(value: string): void {
    this.phone.set(value.replace(/\D/g, ''));
  }

  sendCode(): void {
    this.phoneAttempted.set(true);
    if (this.phoneError()) return;
    this.codeSent.set(true);
    this.startCountdown();
  }

  resendCode(): void {
    if (this.countdown() > 0) return;
    this.startCountdown();
  }

  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);
    input.value = digit;

    const digits = [...this.otpDigits()];
    digits[index] = digit;
    this.otpDigits.set(digits);

    if (digit && index < 5) {
      this.focusBox(index + 1);
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent): void {
    const inputs = this.otpInputs?.toArray();
    if (!inputs) return;

    if (event.key === 'Backspace') {
      event.preventDefault();
      const current = inputs[index].nativeElement;
      if (current.value) {
        current.value = '';
        const digits = [...this.otpDigits()];
        digits[index] = '';
        this.otpDigits.set(digits);
      } else if (index > 0) {
        inputs[index - 1].nativeElement.value = '';
        const digits = [...this.otpDigits()];
        digits[index - 1] = '';
        this.otpDigits.set(digits);
        this.focusBox(index - 1);
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusBox(index - 1);
    } else if (event.key === 'ArrowRight' && index < 5) {
      this.focusBox(index + 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;

    const inputs = this.otpInputs?.toArray();
    const digits = ['', '', '', '', '', ''];
    [...text].forEach((d, i) => {
      digits[i] = d;
      if (inputs?.[i]) inputs[i].nativeElement.value = d;
    });
    this.otpDigits.set(digits);
    this.focusBox(Math.min(text.length, 5));
  }

  private focusBox(index: number): void {
    const el = this.otpInputs?.toArray()?.[index]?.nativeElement;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }

  confirmOtp(): void {
    if (this.isSubmitting()) return;
    const otp = this.otpDigits().join('');
    if (otp.length < 6) return;
    this.isSubmitting.set(true);
    this.router.navigate(['/mat-khau-moi']);
  }

  private startCountdown(): void {
    this.countdown.set(30);
    const interval = setInterval(() => {
      this.countdown.update((v) => {
        if (v <= 1) { clearInterval(interval); return 0; }
        return v - 1;
      });
    }, 1000);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }
}
