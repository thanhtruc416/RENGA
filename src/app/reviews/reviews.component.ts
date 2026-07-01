import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReviewService, ReviewableItem } from '../core/services/review.service';
import { formatPrice } from '../shared/utils/currency.util';

interface ReviewSpec { label: string; value: string; }

const ORDER_TYPE_LABEL: Record<string, string> = {
  STANDARD: 'Sản phẩm có sẵn',
  STUDIO:   'Tùy biến (The Studio)',
  DESIGN:   'Thiết kế riêng',
};

@Component({
  selector: 'app-reviews',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit {
  private readonly route          = inject(ActivatedRoute);
  private readonly reviewService  = inject(ReviewService);

  readonly orderItemId = signal('');
  readonly item         = signal<ReviewableItem | null>(null);
  readonly isLoading    = signal(true);
  readonly loadError    = signal(false);

  readonly orderId = computed(() => {
    const it = this.item();
    return it ? `#${it.orderId}` : '';
  });

  readonly productName = computed(() => this.item()?.productName ?? '');
  readonly productImage = computed(() => this.item()?.imageUrl || 'assets/images/collection-prod-diamond-ring.png');

  readonly specs = computed<ReviewSpec[]>(() => {
    const it = this.item();
    if (!it) return [];
    return [
      { label: 'Sản phẩm',    value: it.productName },
      { label: 'Loại đơn',    value: ORDER_TYPE_LABEL[it.orderType] ?? it.orderType },
      { label: 'Giá trị',     value: formatPrice(it.price) + '₫' },
      { label: 'Ngày hoàn tất', value: new Date(it.date).toLocaleDateString('vi-VN') },
    ];
  });

  readonly stars = [1, 2, 3, 4, 5];

  readonly rating     = signal(0);
  readonly hoverRating = signal(0);
  readonly reviewText  = signal('');
  readonly fileNames   = signal<string[]>([]);
  readonly isSubmitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitError  = signal('');

  readonly displayRating = computed(() => this.hoverRating() || this.rating());

  ngOnInit(): void {
    const orderItemId = this.route.snapshot.queryParamMap.get('orderItemId') ?? '';
    this.orderItemId.set(orderItemId);

    if (!orderItemId) {
      this.isLoading.set(false);
      this.loadError.set(true);
      return;
    }

    this.reviewService.getReviewableItems().subscribe({
      next: (res) => {
        const found = res.success ? res.data.find(i => i.orderItemId === orderItemId) : undefined;
        if (found) {
          this.item.set(found);
          if (found.reviewed) {
            this.rating.set(found.rating ?? 0);
            this.reviewText.set(found.content ?? '');
            this.isSubmitted.set(true);
          }
        } else {
          this.loadError.set(true);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.loadError.set(true);
      },
    });
  }

  setRating(n: number): void { this.rating.set(n); }
  setHover(n: number): void  { this.hoverRating.set(n); }
  clearHover(): void          { this.hoverRating.set(0); }

  onTextInput(event: Event): void {
    this.reviewText.set((event.target as HTMLTextAreaElement).value);
  }

  onFileSelect(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.fileNames.set(Array.from(files).map(f => f.name));
    }
  }

  submitReview(): void {
    if (this.rating() === 0 || this.isSubmitting() || !this.orderItemId()) return;
    this.isSubmitting.set(true);
    this.submitError.set('');
    this.reviewService.submitReview({
      orderItemId: this.orderItemId(),
      rating: this.rating(),
      content: this.reviewText().trim() || undefined,
    }).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.isSubmitted.set(true);
        } else {
          this.submitError.set(res.message ?? 'Gửi đánh giá thất bại.');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.submitError.set(err?.error?.message ?? 'Gửi đánh giá thất bại. Vui lòng thử lại.');
      },
    });
  }
}
