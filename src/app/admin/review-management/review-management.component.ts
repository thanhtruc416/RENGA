import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AdminReview, ReviewVisibility } from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

type ReplyFormGroup = FormGroup<Record<string, FormControl<string>>>;

@Component({
  selector: 'app-review-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './review-management.component.html',
  styleUrl: './review-management.component.css',
})
export class ReviewManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  filterVisibility = signal('');
  filterSearch     = signal('');
  filterApplied    = signal(false);
  private activeVisibility = '';
  private activeSearch     = '';

  readonly isLoading = signal(true);
  readonly reviews = signal<AdminReview[]>([]);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly itemsPerPage = 5;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => getPageWindow(this.currentPage(), this.totalPages()));

  readonly replyForm: ReplyFormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading.set(true);
    this.adminService.getReviews({
      page: this.currentPage(), limit: this.itemsPerPage,
      visibility: this.activeVisibility || undefined, search: this.activeSearch || undefined,
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.reviews.set(res.reviews);
          this.total.set(res.total);
          this.rebuildReplyForm(res.reviews);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách đánh giá.');
      },
    });
  }

  private rebuildReplyForm(reviews: AdminReview[]): void {
    for (const key of Object.keys(this.replyForm.controls)) this.replyForm.removeControl(key as never);
    for (const r of reviews) {
      this.replyForm.addControl(r.review_id, new FormControl(r.admin_reply ?? '', { nonNullable: true, validators: [Validators.required] }));
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadReviews();
  }

  applyFilters(): void {
    this.activeVisibility = this.filterVisibility();
    this.activeSearch = this.filterSearch();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadReviews();
  }

  clearFilters(): void {
    this.filterVisibility.set('');
    this.filterSearch.set('');
    this.activeVisibility = '';
    this.activeSearch = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadReviews();
  }

  toggleVisibility(review: AdminReview): void {
    const next: ReviewVisibility = review.visibility_status === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE';
    this.adminService.setReviewVisibility(review.review_id, next).subscribe({
      next: () => {
        this.notify.success(next === 'HIDDEN' ? 'Đã ẩn đánh giá.' : 'Đã hiện lại đánh giá.');
        this.loadReviews();
      },
      error: () => this.notify.error('Cập nhật trạng thái thất bại.'),
    });
  }

  submitReply(reviewId: string): void {
    const control = this.replyForm.controls[reviewId];
    if (!control?.valid || control.value.trim() === '') {
      this.notify.error('Vui lòng nhập nội dung phản hồi!');
      return;
    }
    this.adminService.replyToReview(reviewId, control.value.trim()).subscribe({
      next: () => { this.notify.success('Gửi phản hồi thành công!'); this.loadReviews(); },
      error: (err) => this.notify.error(err?.error?.message ?? 'Gửi phản hồi thất bại.'),
    });
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }
}
