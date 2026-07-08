import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReviewService, ReviewableItem } from '../../core/services/review.service';
import { formatPrice } from '../../shared/utils/currency.util';
import { NotificationService } from '../../core/services/notification.service';

interface ReviewOrder {
  id: string;
  orderItemId: string;
  type: string;
  date: string;
  product: string;
  total: string;
  reviewed: boolean;
}

const ORDER_TYPE_LABEL: Record<string, string> = {
  STANDARD: 'Sản phẩm có sẵn',
  STUDIO:   'Tùy biến (The Studio)',
  DESIGN:   'Thiết kế riêng',
};

const PAGE_SIZE = 4;

@Component({
  selector: 'app-review-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent implements OnInit {
  private readonly router        = inject(Router);
  private readonly reviewService = inject(ReviewService);
  private readonly notify        = inject(NotificationService);

  readonly isLoading = signal(true);
  readonly allOrders = signal<ReviewOrder[]>([]);

  ngOnInit(): void {
    this.reviewService.getReviewableItems().subscribe({
      next: (res) => {
        if (res.success) {
          this.allOrders.set((res.data as ReviewableItem[]).map((item): ReviewOrder => ({
            id: item.orderId,
            orderItemId: item.orderItemId,
            type: item.orderType,
            date: new Date(item.date).toLocaleDateString('vi-VN'),
            product: item.productName,
            total: formatPrice(item.price) + '₫',
            reviewed: item.reviewed,
          })));
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách đơn hàng cần đánh giá.');
      },
    });
  }

  readonly orderTypeLabel = ORDER_TYPE_LABEL;

  navigateToReview(orderItemId: string): void {
    this.router.navigate(['/orders/reviews/write'], { queryParams: { orderItemId } });
  }
  // Draft — what user selected but not yet applied
  readonly pendingType   = signal('');
  readonly pendingStatus = signal('');
  readonly pendingTime   = signal('3months');

  // Active — what's actually used for filtering
  readonly activeType   = signal('');
  readonly activeStatus = signal('');
  readonly activeTime   = signal('3months');

  readonly currentPage = signal(1);

  readonly hasDraftChanges = computed(() =>
    this.pendingType()   !== this.activeType()   ||
    this.pendingStatus() !== this.activeStatus() ||
    this.pendingTime()   !== this.activeTime()
  );

  readonly hasActiveFilters = computed(() =>
    this.activeType()   !== '' ||
    this.activeStatus() !== '' ||
    this.activeTime()   !== '3months'
  );

  readonly filtered = computed(() => {
    let list = this.allOrders();
    const type   = this.activeType();
    const status = this.activeStatus();
    if (type)   list = list.filter(o => o.type === type);
    if (status === 'unreviewed') list = list.filter(o => !o.reviewed);
    if (status === 'reviewed')   list = list.filter(o => o.reviewed);
    return list;
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  readonly pageItems = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  applyFilters(): void {
    this.activeType.set(this.pendingType());
    this.activeStatus.set(this.pendingStatus());
    this.activeTime.set(this.pendingTime());
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.pendingType.set('');
    this.pendingStatus.set('');
    this.pendingTime.set('3months');
    this.activeType.set('');
    this.activeStatus.set('');
    this.activeTime.set('3months');
    this.currentPage.set(1);
  }

  goTo(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  onOrderTypeChange(event: Event): void {
    this.pendingType.set((event.target as HTMLSelectElement).value);
  }

  onStatusChange(event: Event): void {
    this.pendingStatus.set((event.target as HTMLSelectElement).value);
  }

  onTimeChange(event: Event): void {
    this.pendingTime.set((event.target as HTMLSelectElement).value);
  }
}
