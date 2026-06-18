import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

// --- TYPED FORM ---
interface DesignOrderForm {
  searchQuery: FormControl<string>;
  material: FormControl<string>;
  gemstone: FormControl<string>;
  size: FormControl<string>;
  consultationCode: FormControl<string>;
  estTime: FormControl<string>;
  address: FormControl<string>;
  notes: FormControl<string>;
  totalPrice: FormControl<number | null>;
  depositPercent: FormControl<number>;
}

@Component({
  selector: 'app-design-order-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './design-order-create.component.html',
  styleUrl: './design-order-create.component.css'
})
export class DesignOrderCreateComponent {
  // --- STATE (SIGNALS) ---
  readonly customerFound = signal<boolean>(false);

  // Giả lập danh sách ảnh được upload
  readonly uploadedImages = signal<string[]>(['https://picsum.photos/id/111/150/150']);

  // Khởi tạo Form Typed
  readonly orderForm = new FormGroup<DesignOrderForm>({
    searchQuery: new FormControl('', { nonNullable: true }),
    material: new FormControl('Vàng Trắng 18K (White Gold)', { nonNullable: true }),
    gemstone: new FormControl('', { nonNullable: true }),
    size: new FormControl('', { nonNullable: true }),
    consultationCode: new FormControl('', { nonNullable: true }),
    estTime: new FormControl('21 ngày', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    notes: new FormControl('', { nonNullable: true }),
    // Form cột phải (Báo giá)
    totalPrice: new FormControl(12500000), // Giá mặc định theo Figma
    depositPercent: new FormControl(50, { nonNullable: true, validators: [Validators.min(0), Validators.max(100)] })
  });

  // --- REACTIVE CALCULATION (Tính toán tự động tiền cọc) ---
  // Chuyển valueChanges của form thành Signal để tính toán mượt mà theo OnPush rule
  private readonly formValues = toSignal(this.orderForm.valueChanges, { initialValue: this.orderForm.getRawValue() });
  
  readonly minDepositAmount = computed(() => {
    const total = this.formValues().totalPrice || 0;
    const percent = this.formValues().depositPercent || 0;
    return (total * percent) / 100;
  });

  readonly priceDisplay = signal(
    (this.orderForm.controls.totalPrice.value ?? 12500000).toLocaleString('vi-VN')
  );

  readonly searchError = computed(() => {
    const val = (this.formValues().searchQuery ?? '').trim();
    if (!val) return '';
    const isPhone = /^\d{10}$/.test(val);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    return (isPhone || isEmail) ? '' : 'Vui lòng nhập số điện thoại 10 chữ số hoặc địa chỉ email hợp lệ.';
  });

  // --- METHODS ---
  onPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\./g, '').replace(/[^\d]/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    this.orderForm.controls.totalPrice.setValue(num || null);
    const formatted = num ? num.toLocaleString('vi-VN') : '';
    this.priceDisplay.set(formatted);
    input.value = formatted;
  }

  searchCustomer(): void {
    const query = this.orderForm.controls.searchQuery.value.trim();
    if (!query || this.searchError()) return;
    this.customerFound.set(true);
  }

  triggerUpload(): void {
    // Giả lập thêm ảnh khi click vào khung Drag & Drop
    const newImg = `https://picsum.photos/seed/${Math.random()}/150/150`;
    this.uploadedImages.update(imgs => [...imgs, newImg]);
  }

  removeImage(index: number): void {
    this.uploadedImages.update(imgs => imgs.filter((_, i) => i !== index));
  }

  submitOrder(): void {
    console.log('Dữ liệu Đơn thiết kế:', this.orderForm.value);
    console.log('Tiền cọc tối thiểu:', this.minDepositAmount());
    // Gọi API...
  }
}