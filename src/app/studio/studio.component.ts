import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';
import { formatVnd } from '../shared/utils/currency.util';

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
  imports: [DecimalPipe, ReactiveFormsModule, PaymentSuccessModalComponent, PaymentFailModalComponent],
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
      image: '/images/category-nhan.png',
    },
    {
      id: 'day-chuyen',
      name: 'Dây chuyền',
      image: '/images/category-day-chuyen.png',
    },
    {
      id: 'hoa-tai',
      name: 'Hoa tai',
      image: '/images/category-hoa-tai.png',
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
      image: '/images/product-nhan-kim-cuong-solitaire.png',
      pricePerCarat: 10_000_000,
    },
    {
      id: 'ruby',
      label: 'Hồng ngọc',
      image: '/images/product-nhan-rose-gold-sapphire.png',
      pricePerCarat: 8_000_000,
    },
    {
      id: 'sapphire',
      label: 'Lam ngọc',
      image: '/images/product-nhan-eternal-love.png',
      pricePerCarat: 7_000_000,
    },
    {
      id: 'emerald',
      label: 'Ngọc lục bảo',
      image: '/images/product-nhan-emerald-modernity.png',
      pricePerCarat: 6_000_000,
    },
    {
      id: 'none',
      label: 'Không đá',
      image: '/images/studio-ring.png',
      pricePerCarat: 0,
      muted: true,
    },
  ];

  readonly engraveGallery: GalleryThumb[] = [
    {
      src: '/images/product-detail-nhan-aeterna-1.png',
      alt: 'Góc nhìn chính',
    },
    {
      src: '/images/product-detail-nhan-aeterna-2.png',
      alt: 'Góc nhìn 2',
    },
    {
      src: '/images/product-detail-nhan-aeterna-3.png',
      alt: 'Góc nhìn 3',
    },
    {
      src: '/images/product-detail-nhan-aeterna-4.png',
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

  readonly savedToast = signal(false);
  readonly sharePopupOpen = signal(false);
  private saveTimer: ReturnType<typeof setTimeout> | null = null;

  saveDesign(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.savedToast.set(true);
    this.saveTimer = setTimeout(() => this.savedToast.set(false), 2500);
  }

  openSharePopup(): void {
    this.sharePopupOpen.set(true);
  }
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
  private readonly cartService = inject(CartService);

  readonly depositAmount = computed(() => Math.round(this.totalPrice() / 2));

  readonly orderItems = computed((): OrderItem[] => {
    const items: OrderItem[] = [
      { name: this.selectedMaterial().label, price: this.selectedMaterial().priceVnd },
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
    if (this.currentStep() >= 3) return this.formatVnd(this.totalPrice());
    return this.formatVnd(this.selectedMaterial().priceVnd);
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

  flyToCart(event: MouseEvent): void {
    const btn = event.currentTarget as HTMLElement;
    const cartEl = document.getElementById('cart-icon-btn');
    if (!cartEl) { this.addToCartSilent(); return; }

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    const cat = this.categories.find(c => c.id === this.selectedCategoryId());
    const imgSrc = cat?.image ?? '/images/category-nhan.png';

    const fly = document.createElement('div');
    fly.style.cssText = `
      position: fixed;
      left: ${btnRect.left + btnRect.width / 2 - 24}px;
      top: ${btnRect.top + btnRect.height / 2 - 24}px;
      width: 48px; height: 48px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--color-primary, #c4607e);
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 9999;
      pointer-events: none;
      transition: left 0.65s cubic-bezier(0.25,0.46,0.45,0.94),
                  top  0.65s cubic-bezier(0.25,0.46,0.45,0.94),
                  transform 0.65s ease,
                  opacity 0.2s ease 0.45s;
    `;
    fly.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;" />`;
    document.body.appendChild(fly);

    fly.getBoundingClientRect();

    fly.style.left    = `${cartRect.left + cartRect.width / 2 - 12}px`;
    fly.style.top     = `${cartRect.top  + cartRect.height / 2 - 12}px`;
    fly.style.transform = 'scale(0.15)';
    fly.style.opacity   = '0';

    setTimeout(() => {
      document.body.removeChild(fly);
      this.addToCartSilent();
      this.cartService.triggerBump();
    }, 700);
  }

  private addToCartSilent(): void {
    const cat = this.categories.find(c => c.id === this.selectedCategoryId());
    this.cartService.addItem({
      type: 'studio',
      name: `${cat?.name ?? 'Trang sức'} Studio`,
      spec: `${this.selectedMaterial().label} • ${this.selectedStone().label}`,
      price: this.totalPrice(),
      image: cat?.image ?? '/images/category-nhan.png',
      quantity: 1,
    });
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

  readonly formatVnd = formatVnd;

  private mockSuccessNext = true;

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    // TODO: gọi API — mock xen kẽ để test cả 2 case
    if (this.mockSuccessNext) {
      this.showSuccessModal.set(true);
    } else {
      this.showFailModal.set(true);
    }
    this.mockSuccessNext = !this.mockSuccessNext;
  }

  applyVoucher(): void {
    // TODO: gọi API kiểm tra voucher
  }
}
