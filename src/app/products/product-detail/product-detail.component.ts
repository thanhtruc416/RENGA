import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, map, filter } from 'rxjs';
import { ProductsService, ProductDetail } from '../products.service';
import { CartService, CartItem } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalService } from '../../core/services/modal.service';
import { ReviewService, ProductReview } from '../../core/services/review.service';
import { QuestionService } from '../../core/services/question.service';
import { NotificationService } from '../../core/services/notification.service';
import { formatPrice } from '../../shared/utils/currency.util';
import { RingSizeGuideModalComponent } from '../../shared/components/modal/ring-size-guide-modal/ring-size-guide-modal.component';
import { RingArTryonComponent } from '../../shared/components/ring-ar-tryon/ring-ar-tryon.component';

interface QaMessage {
  id: string;
  author: string;
  authorInitial: string;
  time: string;
  text: string;
  reply: string;
  replyTime: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RingSizeGuideModalComponent, RingArTryonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly modalService = inject(ModalService);
  private readonly reviewService = inject(ReviewService);
  private readonly questionService = inject(QuestionService);
  private readonly notify = inject(NotificationService);

  readonly isGuest = computed(() => !this.authService.isLoggedIn());

  private static readonly EMPTY: ProductDetail = {
    id: '', category: '', category_name: '', collection: '',
    name: '', price: 0, imageUrl: '', tryonUrl: null,
    description: '', material: '', sizes: [], images: [], variants: [], inStock: false,
    specs: [],
  };

  readonly product = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('id') ?? ''),
      switchMap((id) => this.productsService.getProductById(id)),
    ),
    { initialValue: ProductDetailComponent.EMPTY },
  );

  readonly specs = computed(() => this.product().specs);

  readonly reviews = toSignal(
    toObservable(this.product).pipe(
      filter(p => !!p.id),
      switchMap(p => this.reviewService.getProductReviews(p.id, 20)),
    ),
    { initialValue: [] as ProductReview[] },
  );

  readonly relatedProducts = toSignal(
    toObservable(this.product).pipe(
      filter(p => !!p.id),
      switchMap(p =>
        this.productsService.getProducts(p.category, 1, 5).pipe(
          map(all => all.filter(r => r.id !== p.id).slice(0, 4))
        )
      )
    ),
    { initialValue: [] },
  );

  readonly faqs = [
    {
      question: 'CHÍNH SÁCH LÀM SẠCH ĐỊNH KỲ LÀ GÌ?',
      answer: 'Chúng tôi cung cấp dịch vụ làm sạch và kiểm tra chất lượng nhẫn trọn đời cho mọi sản phẩm RENGA. Bạn chỉ cần mang sản phẩm đến cửa hàng bất kỳ thời điểm nào để được phục vụ miễn phí.',
    },
    {
      question: 'NHẪN CÓ ĐI KÈM CHỨNG CHỈ GIA KHÔNG?',
      answer: 'Tất cả sản phẩm kim cương từ 0.30 carat trở lên đều đi kèm chứng chỉ GIA (Gemological Institute of America) hoặc IGI, đảm bảo tính xác thực và chất lượng viên đá.',
    },
    {
      question: 'CÓ THỂ ĐIỀU CHỈNH SIZE NHẪN SAU KHI MUA KHÔNG?',
      answer: 'Có. RENGA hỗ trợ điều chỉnh size miễn phí trong vòng 30 ngày kể từ ngày nhận hàng. Sau thời gian đó, dịch vụ có tính phí tùy theo mức độ điều chỉnh.',
    },
    {
      question: 'THỜI GIAN SẢN XUẤT VÀ GIAO HÀNG MẤT BAO LÂU?',
      answer: 'Sản phẩm có sẵn giao trong 1–3 ngày làm việc. Sản phẩm đặt theo yêu cầu (bespoke) cần từ 10–20 ngày tùy mức độ tùy chỉnh. Vận chuyển toàn quốc miễn phí qua đối tác uy tín.',
    },
  ];

  readonly openFaqIndex = signal<number | null>(0);

  toggleFaq(index: number): void {
    this.openFaqIndex.update(v => v === index ? null : index);
  }

  // ── Q&A ──────────────────────────────────────────────────
  readonly qaMessages = signal<QaMessage[]>([]);
  readonly qaInput = signal('');
  readonly expandedReplies = signal(new Set<string>());
  readonly isSendingQa = signal(false);

  onQaInput(e: Event): void {
    this.qaInput.set((e.target as HTMLInputElement).value);
  }

  toggleReply(id: string): void {
    this.expandedReplies.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  private loadQuestions(productId: string): void {
    this.questionService.getProductQuestions(productId).subscribe({
      next: (res) => {
        if (!res.success) return;
        this.qaMessages.set(res.data.map(q => ({
          id: q.id,
          author: q.author,
          authorInitial: q.author.charAt(0).toUpperCase(),
          time: this.formatReviewDate(q.askedAt),
          text: q.question,
          reply: q.answer ?? '',
          replyTime: q.repliedAt ? this.formatReviewDate(q.repliedAt) : '',
        })));
      },
      error: () => this.notify.error('Không tải được câu hỏi cho sản phẩm này.'),
    });
  }

  sendQa(): void {
    if (this.isGuest()) { this.modalService.openLoginRequired(); return; }
    const text = this.qaInput().trim();
    const productId = this.product().id;
    if (!text || !productId || this.isSendingQa()) return;

    this.isSendingQa.set(true);
    this.questionService.submitQuestion(productId, text).subscribe({
      next: (res) => {
        this.isSendingQa.set(false);
        if (res.success) {
          this.qaInput.set('');
          this.loadQuestions(productId);
          this.notify.success('Gửi câu hỏi thành công! RENGA sẽ phản hồi sớm nhất.');
        } else {
          this.notify.error(res.message ?? 'Gửi câu hỏi thất bại.');
        }
      },
      error: (err) => {
        this.isSendingQa.set(false);
        this.notify.error(err?.error?.message ?? 'Gửi câu hỏi thất bại.');
      },
    });
  }

  constructor() {
    afterNextRender(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    effect(() => {
      const id = this.product().id;
      if (id) this.loadQuestions(id);
    });
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  formatReviewDate(iso: string): string {
    const d = new Date(iso);
    return `${d.getDate()} THÁNG ${d.getMonth() + 1}, ${d.getFullYear()}`;
  }
  readonly reviewCount = computed(() => this.reviews().length);
  readonly activeImageIndex = signal(0);

  @ViewChild('reviewsTrack') reviewsTrack!: ElementRef<HTMLDivElement>;

  scrollReviews(dir: 'prev' | 'next'): void {
    const el = this.reviewsTrack.nativeElement;
    const card = el.querySelector<HTMLElement>('.product-detail__review-card');
    const step = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  }
  readonly lightboxOpen = signal(false);
  readonly arPopupOpen = signal(false);

  // Nhãn image_type='TRYON' trong DB không đáng tin (crawl bị gán sai khá nhiều —
  // có sản phẩm TRYON lại trỏ vào ảnh chụp tay .jpg không hề cắt nền). Tín hiệu
  // đáng tin hơn: file dạng "sp-*.png" luôn là ảnh nhẫn nền trong suốt sạch (dù
  // gắn nhãn TRYON hay GALLERY) — gom hết ứng viên này, để RingArTryonComponent
  // tự tải và chọn đúng ảnh "băng ngang" phù hợp nhất trong số đó.
  readonly tryonCandidateUrls = computed(() =>
    this.product().images
      .map(i => i.image_url)
      .filter(url => /\/sp-[^/]+\.png$/i.test(url))
  );

  openLightbox(): void { this.lightboxOpen.set(true); }
  closeLightbox(): void { this.lightboxOpen.set(false); }

  openArPopup(): void {
    // AR try-on hiện chỉ dựng cho nhẫn (theo dõi khớp ngón tay) — bấm nhầm ở sản
    // phẩm khác (vòng tay, dây chuyền...) sẽ ướm sai hoàn toàn vì logic đo/định vị
    // hoàn toàn khác (cổ tay/cổ, không phải ngón tay).
    if (this.product().category !== 'nhan') return;
    this.arPopupOpen.set(true);
  }
  closeArPopup(): void { this.arPopupOpen.set(false); }

  lightboxPrev(): void {
    const len = this.productImages().length;
    this.activeImageIndex.update(i => (i - 1 + len) % len);
  }

  lightboxNext(): void {
    const len = this.productImages().length;
    this.activeImageIndex.update(i => (i + 1) % len);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.lightboxOpen.set(false);
    this.arPopupOpen.set(false);
  }
  readonly selectedSize    = signal<number | null>(null);
  readonly showSizeGuide   = signal(false);

  readonly displayPrice = computed(() => {
    const p = this.product();
    const size = this.selectedSize();
    const variant = p.variants.find(v => Number(v.size_value) === size)
      ?? p.variants[0];
    return Number(variant?.price ?? p.price);
  });

  // Số lượng còn lại của size đang chọn — null khi chưa chọn size (sản phẩm có
  // nhiều size) để không hiện nhầm tồn kho của size khác.
  readonly selectedVariantStock = computed((): number | null => {
    const p = this.product();
    const size = this.selectedSize();
    const variant = size != null
      ? p.variants.find(v => Number(v.size_value) === size)
      : p.variants[0];
    return variant ? Number(variant.stock_quantity) : null;
  });
  openSizeGuide(): void { this.showSizeGuide.set(true); }
  closeSizeGuide(): void { this.showSizeGuide.set(false); }

  readonly productImages = computed((): string[] => {
    const p = this.product();
    if (p?.images?.length) return p.images.map(i => i.image_url);
    return p?.imageUrl ? [p.imageUrl] : [];
  });

  readonly productSizes = computed(() => this.product()?.sizes ?? []);

  selectImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  selectSize(size: number): void {
    if (this.isSizeOutOfStock(size)) return;
    this.selectedSize.set(size);
  }

  // CART-04: size hết hàng thì hiện xám, không cho chọn — thay vì để chọn được
  // rồi mới báo lỗi lúc thêm vào giỏ.
  isSizeOutOfStock(size: number): boolean {
    const variant = this.product().variants.find(v => Number(v.size_value) === size);
    return !variant || variant.status !== 'AVAILABLE' || Number(variant.stock_quantity) <= 0;
  }

  private buildCartItem(): Omit<CartItem, 'id'> | null {
    const p = this.product();
    if (!p.id) return null;
    const size = this.selectedSize();
    // Sản phẩm có nhiều size để chọn nhưng chưa chọn size nào — chặn thêm vào giỏ
    // thay vì âm thầm lấy variant đầu tiên (trước đây selectedSize mặc định = 10
    // nên luôn "trông như đã chọn", giờ mặc định null nên phải chặn rõ ràng ở đây).
    if (p.sizes?.length && size == null) {
      this.notify.error('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
      return null;
    }
    const variant = (size != null ? p.variants.find(v => Number(v.size_value) === size) : null)
      ?? p.variants[0];
    if (!variant) return null;
    const spec = size ? `Size ${size}` : (variant.variant_name ?? '');
    const image = p.imageUrl
      || p.images.find(i => i.is_primary)?.image_url
      || p.images[0]?.image_url
      || '';
    return {
      type: 'available',
      name: p.name,
      spec,
      price: Number(variant.price ?? p.price),
      image,
      quantity: 1,
      variantId: variant.variant_id,
    };
  }

  addToCart(): void {
    const item = this.buildCartItem();
    if (!item) return;
    this.cartService.addItem(item);
  }

  flyToCart(event: MouseEvent): void {
    const p = this.product();
    if (p.sizes?.length && this.selectedSize() == null) {
      this.notify.error('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
      return;
    }
    const btn = event.currentTarget as HTMLElement;
    const cartEl = document.getElementById('cart-icon-btn');
    if (!cartEl) { this.addToCart(); return; }

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    const fly = document.createElement('div');
    const imgSrc = this.productImages()[this.activeImageIndex()] ?? this.product().imageUrl;

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

    fly.getBoundingClientRect(); // force reflow

    fly.style.left    = `${cartRect.left + cartRect.width / 2 - 12}px`;
    fly.style.top     = `${cartRect.top  + cartRect.height / 2 - 12}px`;
    fly.style.transform = 'scale(0.15)';
    fly.style.opacity   = '0';

    setTimeout(() => {
      document.body.removeChild(fly);
      this.addToCart();
      this.cartService.triggerBump();
    }, 700);
  }

  buyNow(): void {
    const item = this.buildCartItem();
    if (!item) return;
    this.cartService.setBuyNowItem(item);
    this.router.navigate(['/checkout']);
  }

  readonly formatPrice = formatPrice;

  private static readonly CATEGORY_LABELS: Record<string, string> = {
    'nhan':       'NHẪN',
    'day-chuyen': 'DÂY CHUYỀN',
    'hoa-tai':    'HOA TAI',
    'lac-tay':    'LẮC TAY',
    'charm':      'CHARM',
  };

  readonly categoryLabel = computed(() => {
    const cat = this.product()?.category ?? '';
    return ProductDetailComponent.CATEGORY_LABELS[cat] ?? cat.toUpperCase();
  });
}
