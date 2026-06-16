import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Material {
  id: string;
  label: string;
  tag: string;
  color: string;
  price: string;
  priceVnd: number;
}

interface Stone {
  id: string;
  label: string;
  image: string;
  pricePerCarat: number;
  muted?: boolean;
}

interface GalleryThumb {
  src: string;
  alt: string;
}

interface OrderItem {
  name: string;
  subName?: string;
  price: number;
}

interface CheckoutForm {
  name: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  province: FormControl<string>;
  ward: FormControl<string>;
  address: FormControl<string>;
}

@Component({
  selector: 'app-studio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, PaymentSuccessModalComponent, PaymentFailModalComponent],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.css',
})
export class StudioComponent {
  // ─── Constants ───────────────────────────────────────────────────────
  readonly MOUNT_FEE = 4_000_000;
  readonly CRAFT_FEE = 5_000_000;
  readonly ENGRAVE_FEE_PER_CHAR = 50_000;
  readonly ENGRAVE_FREE_CHARS = 10;
  readonly MAX_ENGRAVE_CHARS = 25;
  readonly showSuccessModal = signal(false);
  readonly showFailModal = signal(false);

  // ─── Static data ──────────────────────────────────────────────────────
  readonly steps = [
    { n: 1, label: 'Chọn phôi' },
    { n: 2, label: 'Chất liệu' },
    { n: 3, label: 'Đá quý' },
    { n: 4, label: 'Khắc chữ' },
    { n: 5, label: 'Đặt hàng' },
  ];

  readonly categories: Category[] = [
    {
      id: 'nhan',
      name: 'Nhẫn',
      image: 'https://www.figma.com/api/mcp/asset/dc1a985c-947c-4266-97c9-8119fe0caf30',
    },
    {
      id: 'day-chuyen',
      name: 'Dây chuyền',
      image: 'https://www.figma.com/api/mcp/asset/4f425328-80a5-4f6f-a2b2-6bc553066238',
    },
    {
      id: 'hoa-tai',
      name: 'Hoa tai',
      image: 'https://www.figma.com/api/mcp/asset/83b1346c-fa67-4b9f-82d0-d8a6622c2474',
    },
  ];

  readonly materials: Material[] = [
    { id: 'vang-18k', label: 'Vàng 18K', tag: 'Lựa chọn đặc trưng', color: '#d4af37', price: '15 triệu VNĐ', priceVnd: 15_000_000 },
    { id: 'vang-14k', label: 'Vàng 14K', tag: 'Thanh lịch cân bằng', color: '#e5c07b', price: '12 triệu VNĐ', priceVnd: 12_000_000 },
    { id: 'bach-kim', label: 'Bạch kim', tag: 'Sức mạnh vĩnh cửu', color: '#e5e4e2', price: '20 triệu VNĐ', priceVnd: 20_000_000 },
    { id: 'bac-925', label: 'Bạc 925', tag: 'Cổ điển hiện đại', color: '#c0c0c0', price: '8 triệu VNĐ', priceVnd: 8_000_000 },
  ];

  readonly stones: Stone[] = [
    {
      id: 'diamond',
      label: 'Kim cương',
      image: 'https://www.figma.com/api/mcp/asset/67883825-e8c9-4cd2-b5f9-39299b8bf6c7',
      pricePerCarat: 10_000_000,
    },
    {
      id: 'ruby',
      label: 'Hồng ngọc',
      image: 'https://www.figma.com/api/mcp/asset/2294db08-47d6-4f95-9f9d-7e11bb50c2c3',
      pricePerCarat: 8_000_000,
    },
    {
      id: 'sapphire',
      label: 'Lam ngọc',
      image: 'https://www.figma.com/api/mcp/asset/92ade0aa-43fe-4afa-bfdc-66c1468aa92c',
      pricePerCarat: 7_000_000,
    },
    {
      id: 'emerald',
      label: 'Ngọc lục bảo',
      image: 'https://www.figma.com/api/mcp/asset/c7b70169-ea45-4d68-ade1-1db78066391d',
      pricePerCarat: 6_000_000,
    },
    {
      id: 'none',
      label: 'Không đá',
      image: 'https://www.figma.com/api/mcp/asset/429be43b-8e11-462f-8a03-2c9a7ba6f266',
      pricePerCarat: 0,
      muted: true,
    },
  ];

  readonly engraveGallery: GalleryThumb[] = [
    {
      src: 'https://www.figma.com/api/mcp/asset/1366bf7e-90dc-405c-b9db-286001fa1621',
      alt: 'Góc nhìn chính',
    },
    {
      src: 'https://www.figma.com/api/mcp/asset/a2c234ed-2b83-4413-8ff4-03942d6affec',
      alt: 'Góc nhìn 2',
    },
    {
      src: 'https://www.figma.com/api/mcp/asset/185a999c-76c2-45b8-8b21-cbdc11b42896',
      alt: 'Góc nhìn 3',
    },
    {
      src: 'https://www.figma.com/api/mcp/asset/7660327d-c0e3-424b-9688-3725d7b37077',
      alt: 'Góc nhìn 4',
    },
  ];

  readonly paymentMethods = [
    { id: 'bank-transfer', label: 'Chuyển khoản ngân hàng' },
    { id: 'e-wallet', label: 'Ví điện tử (MoMo/ZaloPay)' },
    { id: 'credit-card', label: 'Thẻ tín dụng/Ghi nợ' },
  ];

  // ─── Step state ───────────────────────────────────────────────────────
  readonly currentStep = signal(1);

  // Step 5 has two sub-views: 1 = price analysis, 2 = checkout form
  readonly checkoutSubStep = signal<1 | 2>(1);

  constructor() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const step = Number(params['step']);
        const sub = Number(params['sub']) as 1 | 2;
        if (step >= 1 && step <= 5) {
          this.currentStep.set(step);
        }
        if (sub === 1 || sub === 2) {
          this.checkoutSubStep.set(sub);
        }
      });
  }

  // Step 1
  readonly selectedCategoryId = signal<string | null>(null);

  // Step 2
  readonly selectedMaterial = signal<Material>(this.materials[0]);

  // Step 3
  readonly selectedStone = signal<Stone>(this.stones[0]);
  readonly carat = signal(1.0);

  // Step 4
  readonly engraveText = signal('');
  readonly engraveFont = signal<'serif-italic' | 'classic-sans'>('serif-italic');
  readonly selectedThumbIndex = signal(0);

  // Step 5
  readonly selectedPaymentMethod = signal('credit-card');
  readonly voucherCode = signal('');
  readonly shippingExpanded = signal(true);

  readonly checkoutForm = new FormGroup<CheckoutForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true }),
    province: new FormControl('', { nonNullable: true }),
    ward: new FormControl('', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  // ─── Computed ─────────────────────────────────────────────────────────
  readonly stonePrice = computed(() =>
    this.selectedStone().id === 'none'
      ? 0
      : Math.round(this.selectedStone().pricePerCarat * this.carat()),
  );

  readonly engraveFee = computed(() => {
    const extra = Math.max(0, this.engraveText().length - this.ENGRAVE_FREE_CHARS);
    return extra * this.ENGRAVE_FEE_PER_CHAR;
  });

  readonly totalPrice = computed(
    () =>
      this.MOUNT_FEE +
      this.selectedMaterial().priceVnd +
      this.stonePrice() +
      this.engraveFee() +
      this.CRAFT_FEE,
  );

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly depositAmount = computed(() => Math.round(this.totalPrice() / 2));

  readonly orderItems = computed((): OrderItem[] => {
    const items: OrderItem[] = [
      { name: this.selectedMaterial().label, subName: 'Dòng Di Sản', price: this.selectedMaterial().priceVnd },
    ];
    if (this.selectedStone().id !== 'none') {
      items.push({
        name: `${this.selectedStone().label} ${this.carat().toFixed(1)}ct`,
        price: this.stonePrice(),
      });
    }
    items.push({ name: 'Phôi Di Sản', price: this.MOUNT_FEE });
    items.push({ name: 'Công chế tác thủ công', price: this.CRAFT_FEE });
    if (this.engraveFee() > 0) {
      items.push({
        name: `Khắc chữ (${this.engraveText().length} ký tự)`,
        price: this.engraveFee(),
      });
    }
    return items;
  });

  readonly priceSummaryVisible = computed(() => this.currentStep() >= 2 && this.currentStep() < 5);

  readonly priceSummaryAmount = computed(() => {
    if (this.currentStep() >= 3) return `${Math.round(this.totalPrice() / 1_000_000)} triệu`;
    return this.selectedMaterial().price.replace(' VNĐ', '');
  });

  readonly priceSummaryDetail = computed(() =>
    this.currentStep() >= 3 ? this.selectedStone().label : this.selectedMaterial().label,
  );

  readonly currentGalleryImage = computed(
    () => this.engraveGallery[this.selectedThumbIndex()],
  );

  readonly engraveCharCount = computed(() => this.engraveText().length);

  // ─── Methods ──────────────────────────────────────────────────────────
  goToStep(n: number): void {
    this.currentStep.set(n);
    this.checkoutSubStep.set(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectCategory(id: string): void {
    this.selectedCategoryId.set(id);
    this.goToStep(2);
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial.set(material);
  }

  selectStone(stone: Stone): void {
    this.selectedStone.set(stone);
  }

  onCaratChange(event: Event): void {
    this.carat.set(parseFloat((event.target as HTMLInputElement).value));
  }

  onEngraveInput(event: Event): void {
    this.engraveText.set((event.target as HTMLInputElement).value);
  }

  selectFont(font: 'serif-italic' | 'classic-sans'): void {
    this.engraveFont.set(font);
  }

  selectThumb(index: number): void {
    this.selectedThumbIndex.set(index);
  }

  selectPaymentMethod(id: string): void {
    this.selectedPaymentMethod.set(id);
  }

  goToCheckout(): void {
    this.checkoutSubStep.set(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backFromCheckout(): void {
    this.checkoutSubStep.set(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatVnd(value: number): string {
    return value.toLocaleString('vi-VN') + '₫';
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    // TODO: gọi API — giả lập thành công
    this.showSuccessModal.set(true);
  }

  applyVoucher(): void {
    // TODO: gọi API kiểm tra voucher
  }
}
