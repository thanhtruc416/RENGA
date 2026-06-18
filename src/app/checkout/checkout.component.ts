import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';

interface OrderItem {
  readonly id: number;
  readonly name: string;
  readonly spec: string;
  readonly qty: number;
  readonly price: number;
  readonly image: string;
}

type PaymentMethod = 'cod' | 'bank' | 'ewallet' | 'card';

interface CheckoutForm {
  fullName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  province: FormControl<string>;
  district: FormControl<string>;
  address: FormControl<string>;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, ReactiveFormsModule, RouterLink, PaymentSuccessModalComponent, PaymentFailModalComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {

  readonly showSuccessModal = signal(false);
  readonly showFailModal = signal(false);
  readonly showSuccessGuestModal = signal(false);
  readonly showFailGuestModal = signal(false);

  readonly orderItems = signal<OrderItem[]>([
    {
      id: 1,
      name: 'Aurelia Infinity Collar',
      spec: 'Kích cỡ: M | Vàng 18K',
      qty: 1,
      price: 45_000_000,
      image: 'assets/images/sp-aurelia-collar.webp',
    },
    {
      id: 2,
      name: 'Heritage Emerald Signet',
      spec: 'Kích cỡ: 52 | Ngọc Lục Bảo',
      qty: 1,
      price: 72_500_000,
      image: 'assets/images/sp-heritage-signet.webp',
    },
  ]);

  readonly orderCount = computed(() => this.orderItems().length);

  readonly subtotal = computed(() =>
    this.orderItems().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  readonly voucherCode = signal('');
  readonly voucherDiscount = signal(0);

  readonly total = computed(() => Math.max(this.subtotal() - this.voucherDiscount(), 0));

  applyVoucher(): void {
    const code = this.voucherCode().trim().toUpperCase();
    // TODO: gọi API kiểm tra voucher
    if (code === 'RENGA10') {
      this.voucherDiscount.set(Math.round(this.subtotal() * 0.1));
    } else {
      this.voucherDiscount.set(0);
    }
  }

  onVoucherInput(event: Event): void {
    this.voucherCode.set((event.target as HTMLInputElement).value);
  }

  readonly selectedPayment = signal<PaymentMethod>('cod');

  selectPayment(method: PaymentMethod): void {
    this.selectedPayment.set(method);
  }

  readonly remainingSeconds = signal(60 * 60 - 4);

  readonly countdownDisplay = computed(() => {
    const total = this.remainingSeconds();
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  });

  readonly shippingForm = new FormGroup<CheckoutForm>({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^0\d{9}$/)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
    province: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    district: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly isSubmitting = signal(false);

  onSubmit(): void {
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    // TODO: thay bằng API thật
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showSuccessModal.set(true);
    }, 800);
  }
}
