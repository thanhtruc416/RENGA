import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router'; 
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
  private readonly router = inject(Router);
  // --- STATE (SIGNALS) ---

  readonly customerFound = signal<boolean>(false);

  // Giả lập danh sách ảnh được upload
  readonly uploadedImages = signal<string[]>(['https://picsum.photos/id/111/150/150']);

  readonly showToast = signal<boolean>(false);
  readonly toastMessage = signal<string>('');
  readonly toastType = signal<'success' | 'error'>('success');


  // Khởi tạo Form Typed
  readonly orderForm = new FormGroup<DesignOrderForm>({
    searchQuery: new FormControl('', { nonNullable: true }),
    material: new FormControl('Vàng Trắng 18K (White Gold)', { nonNullable: true }),
    gemstone: new FormControl('', { nonNullable: true }),
    size: new FormControl('', { nonNullable: true }),
    consultationCode: new FormControl('', { nonNullable: true }),
    estTime: new FormControl('21 ngày', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required]  }),
    notes: new FormControl('', { nonNullable: true }),
    // Form cột phải (Báo giá)
    totalPrice: new FormControl(0,  { validators: [Validators.required, Validators.min(1)] }), // Giá mặc định = 0
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Lấy file đầu tiên (có thể lặp để lấy nhiều file nếu input multiple)
      const file = input.files[0];
      
      // Dùng FileReader để tạo URL preview ảnh
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImgUrl = e.target?.result as string;
        this.uploadedImages.update(imgs => [...imgs, newImgUrl]);
      };
      reader.readAsDataURL(file);
      
      // Reset input để có thể chọn lại cùng 1 file
      input.value = ''; 
    }
  }

  removeImage(index: number): void {
    this.uploadedImages.update(imgs => imgs.filter((_, i) => i !== index));
  }

   submitOrder(): void {
    // Kiểm tra form hợp lệ và đã tìm thấy khách hàng chưa
    if (this.orderForm.invalid || !this.customerFound()) {
      this.displayToast('Vui lòng tìm khách hàng và điền đủ thông tin!', 'error');
      return;
    }

    console.log('Dữ liệu Đơn thiết kế:', this.orderForm.value);
    
    // Hiện Toast thành công
    this.displayToast('Tạo đơn thiết kế thành công!', 'success');

    // Chuyển hướng sang trang Quản lý đơn hàng sau 1.5 giây (để user kịp nhìn thấy Toast)
    setTimeout(() => {
      this.router.navigate(['/admin/don-hang']);
    }, 1500);
  }

  cancelOrder(): void {
    // Reset form về giá trị mặc định, set giá = 0
    this.orderForm.reset({
      material: 'Vàng Trắng 18K (White Gold)',
      estTime: '21 ngày',
      totalPrice: 0,
      depositPercent: 50
    });
    
    // Reset các state khác
    this.priceDisplay.set('0');
    this.customerFound.set(false);
    this.uploadedImages.set([]);
  }

  private displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}