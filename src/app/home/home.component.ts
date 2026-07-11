import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../core/services/auth.service';
import { ModalService } from '../core/services/modal.service';
import { ProductsService, Product } from '../products/products.service';
import { ReviewService, HomeReview } from '../core/services/review.service';
import { formatPrice } from '../shared/utils/currency.util';

interface Category {
  name: string;
  imageUrl: string;
  slug: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly authService     = inject(AuthService);
  private readonly router          = inject(Router);
  private readonly modalService    = inject(ModalService);
  private readonly productsService = inject(ProductsService);
  private readonly reviewService   = inject(ReviewService);

  scrollToCategories(): void {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }

  guardedNav(route: string): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([route]);
    } else {
      this.modalService.openLoginRequired();
    }
  }

  readonly categories = signal<Category[]>([
    { name: 'NHẪN', imageUrl: 'assets/images/category-nhan.png', slug: 'nhan' },
    { name: 'DÂY CHUYỀN', imageUrl: 'assets/images/category-day-chuyen.png', slug: 'day-chuyen' },
    { name: 'HOA TAI', imageUrl: 'assets/images/category-hoa-tai.png', slug: 'hoa-tai' },
    { name: 'LẮC TAY', imageUrl: 'assets/images/category-lac-tay.png', slug: 'lac-tay' },
    { name: 'CHARM', imageUrl: 'assets/images/category-charm.png', slug: 'charm' },
  ]);

  readonly bestSellers = toSignal(
    this.productsService.getProducts(undefined, 1, 4),
    { initialValue: [] as Product[] }
  );

  readonly reviews = toSignal(
    this.reviewService.getHomeReviews(8),
    { initialValue: [] as HomeReview[] }
  );

  readonly features = [
    { icon: 'assets/icons/ic-feature-customize.svg', label: 'Tự thiết kế sản phẩm theo ý thích' },
    { icon: 'assets/icons/ic-feature-consult.svg', label: 'Đặt lịch tư vấn 1-1' },
    { icon: 'assets/icons/ic-feature-quality.svg', label: 'Vật liệu chất lượng' },
    { icon: 'assets/icons/ic-feature-warranty.svg', label: 'Chính sách bảo hành hấp dẫn' },
  ];

  readonly studioSteps = [
    'Chọn kiểu dáng nhẫn từ bộ sưu tập khung cơ bản đa dạng',
    'Lựa chọn chất liệu: Vàng trắng, Vàng hồng hoặc Platinum',
    'Cá nhân hóa với đá chủ Moissanite hoặc Kim cương thiên nhiên',
  ];

  starsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  readonly formatPrice = formatPrice;
}