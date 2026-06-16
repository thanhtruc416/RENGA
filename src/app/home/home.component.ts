import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly modalService = inject(ModalService);

  guardedNav(route: string): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([route]);
    } else {
      this.modalService.openLoginRequired();
    }
  }

  readonly categories = signal<Category[]>([
    { name: 'NHẪN', imageUrl: '/images/category-nhan.png', slug: 'nhan' },
    { name: 'DÂY CHUYỀN', imageUrl: '/images/category-day-chuyen.png', slug: 'day-chuyen' },
    { name: 'HOA TAI', imageUrl: '/images/category-hoa-tai.png', slug: 'hoa-tai' },
    { name: 'LẮC TAY', imageUrl: '/images/category-lac-tay.png', slug: 'lac-tay' },
    { name: 'CHARM', imageUrl: '/images/category-charm.png', slug: 'charm' },
  ]);

  readonly bestSellers = signal<Product[]>([
    { id: '1', name: 'Aura Diamond Studs', price: 12500000, imageUrl: '/images/product-aura-diamond-studs.png' },
    { id: '2', name: 'Eternal Gold Band', price: 8900000, imageUrl: '/images/product-eternal-gold-band.png' },
    { id: '3', name: 'Silk Gold Bangle', price: 15200000, imageUrl: '/images/product-silk-gold-bangle.png' },
    { id: '4', name: 'Solo Sparkle Pendant', price: 6400000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  ]);

  readonly reviews = signal<Review[]>([
    { id: 1, quote: '"Chiếc nhẫn hoàn hảo hơn cả mong đợi!"', author: 'Lan Anh', imageUrl: '/images/review-customer.png' },
    { id: 2, quote: '"Dịch vụ tư vấn rất chuyên nghiệp và tận tâm!"', author: 'Minh Tú', imageUrl: '/images/review-customer.png' },
    { id: 3, quote: '"Trang sức đẹp, chất lượng vượt trội!"', author: 'Thu Hương', imageUrl: '/images/review-customer.png' },
    { id: 4, quote: '"Sẽ quay lại mua thêm cho người thân!"', author: 'Ngọc Hà', imageUrl: '/images/review-customer.png' },
  ]);

  readonly features = [
    { icon: '/icons/ic-feature-customize.svg', label: 'Tự thiết kế sản phẩm theo ý thích' },
    { icon: '/icons/ic-feature-consult.svg', label: 'Đặt lịch tư vấn 1-1' },
    { icon: '/icons/ic-feature-quality.svg', label: 'Vật liệu chất lượng' },
    { icon: '/icons/ic-feature-warranty.svg', label: 'Chính sách bảo hành hấp dẫn' },
  ];

  readonly studioSteps = [
    'Chọn kiểu dáng nhẫn từ bộ sưu tập khung cơ bản đa dạng.',
    'Lựa chọn chất liệu: Vàng trắng, Vàng hồng hoặc Platinum.',
    'Cá nhân hóa với đá chủ Moissanite hoặc Kim cương thiên nhiên.',
  ];

  readonly stars = [1, 2, 3, 4, 5];

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + '₫';
  }
}
