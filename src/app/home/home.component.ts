import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ModalService } from '../core/services/modal.service';
import { formatPrice } from '../shared/utils/currency.util';

interface Category {
  name: string;
  imageUrl: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface Review {
  id: number;
  quote: string;
  author: string;
  imageUrl: string;
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
  @ViewChild('reviewsTrack') reviewsTrack!: ElementRef<HTMLDivElement>;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly modalService = inject(ModalService);

  scrollToCategories(): void {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollReviews(dir: 'prev' | 'next'): void {
    const el = this.reviewsTrack.nativeElement;
    const card = el.querySelector<HTMLElement>('.home__review-card');
    const step = (card?.offsetWidth ?? 280) + 24;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
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

  readonly bestSellers = signal<Product[]>([
    { id: '1', name: 'Aura Diamond Studs', price: 12500000, imageUrl: 'assets/images/product-aura-diamond-studs.png' },
    { id: '2', name: 'Eternal Gold Band', price: 8900000, imageUrl: 'assets/images/product-eternal-gold-band.png' },
    { id: '3', name: 'Silk Gold Bangle', price: 15200000, imageUrl: 'assets/images/product-silk-gold-bangle.png' },
    { id: '4', name: 'Solo Sparkle Pendant', price: 6400000, imageUrl: 'assets/images/product-solo-sparkle-pendant.png' },
  ]);

  readonly reviews = signal<Review[]>([
    { id: 1, quote: '"Chiếc nhẫn hoàn hảo hơn cả mong đợi!"', author: 'Lan Anh', imageUrl: 'assets/images/review-customer.png' },
    { id: 2, quote: '"Dịch vụ tư vấn rất chuyên nghiệp và tận tâm!"', author: 'Minh Tú', imageUrl: 'assets/images/review-customer.png' },
    { id: 3, quote: '"Trang sức đẹp, chất lượng vượt trội!"', author: 'Thu Hương', imageUrl: 'assets/images/review-customer.png' },
    { id: 4, quote: '"Sẽ quay lại mua thêm cho người thân!"', author: 'Ngọc Hà', imageUrl: 'assets/images/review-customer.png' },
    { id: 5, quote: '"Thiết kế tinh tế, đóng gói rất cẩn thận!"', author: 'Bảo Châu', imageUrl: 'assets/images/review-customer.png' },
    { id: 6, quote: '"Nhân viên tư vấn nhiệt tình, chu đáo!"', author: 'Khánh Linh', imageUrl: 'assets/images/review-customer.png' },
    { id: 7, quote: '"Chiếc dây chuyền y hệt hình, rất hài lòng!"', author: 'Phương Mai', imageUrl: 'assets/images/review-customer.png' },
    { id: 8, quote: '"Giao hàng nhanh, sản phẩm chất lượng cao!"', author: 'Trúc Anh', imageUrl: 'assets/images/review-customer.png' },
  ]);

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

  readonly stars = [1, 2, 3, 4, 5];

  readonly formatPrice = formatPrice;
}
