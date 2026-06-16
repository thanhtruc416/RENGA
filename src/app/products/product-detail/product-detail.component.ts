import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs';
import { ProductsService } from '../products.service';

interface ProductSpec {
  label: string;
  value: string;
}

interface Review {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  quote: string;
  date: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  // Đọc :id từ route → gọi service → sau này swap of() sang http.get() trong service là xong
  // Khi dùng http.get() (async): đổi requireSync thành initialValue: undefined và wrap template bằng @if (product(); as p)
  readonly product = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('id') ?? '1'),
      switchMap((id) => this.productsService.getProductById(id)),
    ),
    { requireSync: true },
  );

  // TODO: lấy từ API — product.specs
  readonly specs: ProductSpec[] = [
    { label: 'CHẤT LIỆU', value: 'Vàng Trắng 18k' },
    { label: 'KIM CƯƠNG CHÍNH', value: '1.50 Carat' },
    { label: 'ĐỘ TINH KHIẾT', value: 'VVS1 - Flawless' },
    { label: 'TRỌNG LƯỢNG', value: '4.2 Grams' },
  ];

  // TODO: lấy từ API — /api/products/:id/reviews
  readonly reviews = signal<Review[]>([
    {
      id: 1,
      name: 'MINH THƯ H.',
      imageUrl: '/images/product-detail-nhan-aeterna-3.png',
      rating: 5,
      quote: '"Sản phẩm thực tế còn lộng lẫy hơn trong hình. Dịch vụ chăm sóc khách hàng rất chuyên nghiệp, khâu đóng gói cực kỳ cao cấp."',
      date: '20 THÁNG 10, 2023',
    },
    {
      id: 2,
      name: 'LAN ANH T.',
      imageUrl: '/images/product-detail-nhan-aeterna-2.png',
      rating: 5,
      quote: '"Sản phẩm thực tế còn lộng lẫy hơn trong hình. Dịch vụ chăm sóc khách hàng rất chuyên nghiệp, khâu đóng gói cực kỳ cao cấp."',
      date: '15 THÁNG 09, 2023',
    },
    {
      id: 3,
      name: 'THU HƯƠNG N.',
      imageUrl: '/images/product-detail-nhan-aeterna-3.png',
      rating: 5,
      quote: '"Sản phẩm thực tế còn lộng lẫy hơn trong hình. Dịch vụ chăm sóc khách hàng rất chuyên nghiệp, khâu đóng gói cực kỳ cao cấp."',
      date: '01 THÁNG 08, 2023',
    },
  ]);

  // TODO: lấy từ API — /api/products?category=:category&exclude=:id&limit=4
  readonly relatedProducts = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('id') ?? '1'),
      switchMap((id) =>
        this.productsService.getProducts().pipe(
          map((all) => all.filter((p) => p.id !== id).slice(0, 4)),
        ),
      ),
    ),
    { initialValue: [] },
  );

  readonly stars = [1, 2, 3, 4, 5];
  readonly reviewCount = signal(30);
  readonly activeImageIndex = signal(0);
  readonly selectedSize = signal<number | null>(10);

  readonly productImages = computed(() => {
    const p = this.product();
    return p?.images?.length ? p.images : [p?.imageUrl ?? ''];
  });

  readonly productSizes = computed(() => this.product()?.sizes ?? []);

  selectImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  selectSize(size: number): void {
    this.selectedSize.set(size);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + '₫';
  }
}
