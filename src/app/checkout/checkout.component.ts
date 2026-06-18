import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { CartService } from '../core/services/cart.service';

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

function noWhitespace(control: AbstractControl) {
  return control.value && !control.value.trim() ? { whitespace: true } : null;
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly cartService = inject(CartService);

  readonly showSuccessModal = signal(false);
  readonly showFailModal = signal(false);
  readonly showSuccessGuestModal = signal(false);
  readonly showFailGuestModal = signal(false);

  readonly orderItems = computed<OrderItem[]>(() =>
    this.cartService.items()
      .filter(i => i.type === 'available')
      .map(i => ({ id: i.id, name: i.name, spec: i.spec, qty: i.quantity ?? 1, price: i.price, image: i.image }))
  );

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

  private readonly _countdownRef = (() => {
    const id = setInterval(() => {
      this.remainingSeconds.update(s => {
        if (s <= 0) { clearInterval(id); return 0; }
        return s - 1;
      });
    }, 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  })();

  readonly DISTRICTS: Record<string, { value: string; label: string }[]> = {
    hcm: [
      { value: 'q1', label: 'Quận 1' },
      { value: 'q3', label: 'Quận 3' },
      { value: 'q7', label: 'Quận 7' },
      { value: 'binhth', label: 'Bình Thạnh' },
      { value: 'pnhuan', label: 'Phú Nhuận' },
    ],
    hn: [
      { value: 'hkieu', label: 'Hoàn Kiếm' },
      { value: 'hntho', label: 'Hai Bà Trưng' },
      { value: 'dongda', label: 'Đống Đa' },
      { value: 'caugiay', label: 'Cầu Giấy' },
      { value: 'tbthu', label: 'Tây Hồ' },
    ],
    dn: [
      { value: 'hthanh', label: 'Hải Châu' },
      { value: 'sontray', label: 'Sơn Trà' },
      { value: 'nguhanhson', label: 'Ngũ Hành Sơn' },
      { value: 'thankhoi', label: 'Thanh Khê' },
      { value: 'lienchinh', label: 'Liên Chiểu' },
    ],
  };

  readonly selectedProvince = signal('hcm');

  readonly availableDistricts = computed(
    () => this.DISTRICTS[this.selectedProvince()] ?? []
  );

  onProvinceChange(): void {
    this.selectedProvince.set(this.shippingForm.get('province')!.value);
    this.shippingForm.get('district')!.setValue('');
  }

  readonly shippingForm = new FormGroup<CheckoutForm>({
    fullName: new FormControl('Nguyễn Minh Anh', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('0901234567', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^0\d{9}$/)] }),
    email: new FormControl('nguyenminhanh@gmail.com', { nonNullable: true, validators: [Validators.email, noWhitespace] }),
    province: new FormControl('hcm', { nonNullable: true, validators: [Validators.required] }),
    district: new FormControl('q1', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('88 Lê Lợi, Phường Bến Thành', { nonNullable: true, validators: [Validators.required] }),
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
