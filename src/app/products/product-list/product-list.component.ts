import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs';
import { ProductsService } from '../products.service';

interface FilterOption {
  key: string;
  label: string;
}

const CATEGORY_NAMES: Record<string, string> = {
  'nhan': 'Nhẫn',
  'day-chuyen': 'Dây Chuyền',
  'hoa-tai': 'Hoa Tai',
  'lac-tay': 'Lắc Tay & Vòng Tay',
  'charm': 'Charm',
};

const CATEGORY_DESCS: Record<string, string> = {
  'nhan': 'Mỗi tuyệt tác nhẫn từ RENGA là sự kết tinh giữa nghệ thuật chế tác thủ công di sản và vẻ đẹp vĩnh cửu của những viên đá quý hiếm nhất.',
  'day-chuyen': 'Dây chuyền RENGA — từng mắt xích được chế tác tỉ mỉ, nâng tầm phong cách với vẻ đẹp thanh lịch và tinh tế.',
  'hoa-tai': 'Hoa tai RENGA mang đến sự hoàn hảo cho từng khoảnh khắc, từ nhẹ nhàng tinh tế đến sang trọng cuốn hút.',
  'lac-tay': 'Lắc tay & vòng tay RENGA — điểm nhấn thời thượng trên cổ tay, kể câu chuyện riêng của chủ nhân.',
  'charm': 'Charm RENGA — những biểu tượng nhỏ xinh mang theo ý nghĩa lớn lao, cá nhân hóa phong cách của riêng bạn.',
};

@Component({
  selector: 'app-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  readonly activeCategory = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('category') ?? 'nhan')),
    { initialValue: this.route.snapshot.queryParamMap.get('category') ?? 'nhan' },
  );

  readonly categoryTitle = computed(() => CATEGORY_NAMES[this.activeCategory()] ?? 'Sản Phẩm');
  readonly categoryDescription = computed(() => CATEGORY_DESCS[this.activeCategory()] ?? '');

  // Khi activeCategory thay đổi → tự động gọi lại service.getProducts()
  // Sau này chỉ cần đổi of([...]) trong service thành http.get() là xong
  readonly products = toSignal(
    toObservable(this.activeCategory).pipe(
      switchMap((category) => this.productsService.getProducts(category)),
    ),
    { initialValue: [] },
  );

  readonly filters: FilterOption[] = [
    { key: 'chat-lieu', label: 'CHẤT LIỆU' },
    { key: 'khoang-gia', label: 'KHOẢNG GIÁ' },
    { key: 'loai-da', label: 'LOẠI ĐÁ' },
    { key: 'ban-chay', label: 'BÁN CHẠY' },
  ];

  readonly displayCount = signal(8);
  readonly totalCount = computed(() => this.products().length);

  readonly displayedProducts = computed(() => this.products().slice(0, this.displayCount()));

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + 'đ';
  }

  loadMore(): void {
    this.displayCount.update((count) => count + 8);
  }
}
