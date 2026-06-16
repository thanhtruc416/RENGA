import { ChangeDetectionStrategy, Component, computed, HostListener, inject, signal } from '@angular/core';
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
  'nhan': 'Mỗi tuyệt tác nhẫn từ RENGA là sự kết tinh giữa nghệ thuật chế tác thủ công di sản và vẻ đẹp vĩnh cửu của những viên đá quý hiếm nhất',
  'day-chuyen': 'Dây chuyền RENGA — từng mắt xích được chế tác tỉ mỉ, nâng tầm phong cách với vẻ đẹp thanh lịch và tinh tế',
  'hoa-tai': 'Hoa tai RENGA mang đến sự hoàn hảo cho từng khoảnh khắc, từ nhẹ nhàng tinh tế đến sang trọng cuốn hút',
  'lac-tay': 'Lắc tay & vòng tay RENGA — điểm nhấn thời thượng trên cổ tay, kể câu chuyện riêng của chủ nhân',
  'charm': 'Charm RENGA — những biểu tượng nhỏ xinh mang theo ý nghĩa lớn lao, cá nhân hóa phong cách của riêng bạn',
};

const MATERIALS = ['Vàng 14K', 'Vàng 18K', 'Bạc 925', 'Bạch Kim'];
const STONES = ['Kim Cương', 'Moissanite', 'Ruby', 'Sapphire', 'Emerald', 'Ngọc Trai'];
export const MAX_PRICE = 100_000_000;

export type SortKey = '' | 'price-asc' | 'price-desc';

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

  readonly MAX_PRICE = MAX_PRICE;
  readonly materials = MATERIALS;
  readonly stones = STONES;

  readonly activeCategory = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('category') ?? 'nhan')),
    { initialValue: this.route.snapshot.queryParamMap.get('category') ?? 'nhan' },
  );

  readonly categoryTitle = computed(() => CATEGORY_NAMES[this.activeCategory()] ?? 'Sản Phẩm');
  readonly categoryDescription = computed(() => CATEGORY_DESCS[this.activeCategory()] ?? '');

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

  // ── Applied state — drives filteredProducts ───────────────
  readonly selectedMaterials = signal<string[]>([]);
  readonly selectedStones = signal<string[]>([]);
  readonly priceMin = signal(0);
  readonly priceMax = signal(MAX_PRICE);
  readonly sortKey = signal<SortKey>('');

  // ── Draft state — user is still selecting, not yet applied ─
  readonly openFilter = signal<string | null>(null);
  readonly draftMaterials = signal<string[]>([]);
  readonly draftStones = signal<string[]>([]);
  readonly draftPriceMin = signal(0);
  readonly draftPriceMax = signal(MAX_PRICE);
  readonly draftSortKey = signal<SortKey>('');

  readonly draftMinPct = computed(() => (this.draftPriceMin() / MAX_PRICE) * 100);
  readonly draftMaxPct = computed(() => (this.draftPriceMax() / MAX_PRICE) * 100);

  hasActiveFilter(key: string): boolean {
    switch (key) {
      case 'chat-lieu': return this.selectedMaterials().length > 0;
      case 'khoang-gia': return this.priceMin() > 0 || this.priceMax() < MAX_PRICE;
      case 'loai-da': return this.selectedStones().length > 0;
      case 'ban-chay': return this.sortKey() !== '';
      default: return false;
    }
  }

  // ── Filtered + sorted products (uses APPLIED state) ───────
  readonly filteredProducts = computed(() => {
    let list = this.products();

    const stones = this.selectedStones();
    if (stones.length) {
      list = list.filter(p =>
        stones.some(s => p.name.toLowerCase().includes(s.toLowerCase()))
      );
    }

    list = list.filter(p => p.price >= this.priceMin() && p.price <= this.priceMax());

    const sort = this.sortKey();
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  });

  readonly displayCount = signal(8);
  readonly totalCount = computed(() => this.filteredProducts().length);
  readonly displayedProducts = computed(() => this.filteredProducts().slice(0, this.displayCount()));

  // ── Panel open/close ──────────────────────────────────────
  toggleFilter(key: string, e: MouseEvent): void {
    e.stopPropagation();
    this.openFilter.update(v => v === key ? null : key);
  }

  stopProp(e: MouseEvent): void { e.stopPropagation(); }

  // ── Draft mutations ───────────────────────────────────────
  toggleDraftMaterial(mat: string): void {
    this.draftMaterials.update(list =>
      list.includes(mat) ? list.filter(m => m !== mat) : [...list, mat]
    );
  }

  toggleDraftStone(s: string): void {
    this.draftStones.update(list =>
      list.includes(s) ? list.filter(x => x !== s) : [...list, s]
    );
  }

  setDraftPriceMin(val: number): void {
    if (val < this.draftPriceMax()) this.draftPriceMin.set(val);
  }

  setDraftPriceMax(val: number): void {
    if (val > this.draftPriceMin()) this.draftPriceMax.set(val);
  }

  setDraftSortKey(key: SortKey): void {
    this.draftSortKey.set(key);
  }

  hasAnyActive(): boolean {
    return this.selectedMaterials().length > 0 ||
      this.priceMin() > 0 ||
      this.priceMax() < MAX_PRICE ||
      this.selectedStones().length > 0 ||
      this.sortKey() !== '';
  }

  // ── Apply: commit ALL drafts → applied, close panel ─────────
  applyAllFilters(e: MouseEvent): void {
    e.stopPropagation();
    this.selectedMaterials.set([...this.draftMaterials()]);
    this.priceMin.set(this.draftPriceMin());
    this.priceMax.set(this.draftPriceMax());
    this.selectedStones.set([...this.draftStones()]);
    this.sortKey.set(this.draftSortKey());
    this.openFilter.set(null);
  }

  resetAllFilters(e: MouseEvent): void {
    e.stopPropagation();
    this.selectedMaterials.set([]);
    this.priceMin.set(0);
    this.priceMax.set(MAX_PRICE);
    this.selectedStones.set([]);
    this.sortKey.set('');
    this.draftMaterials.set([]);
    this.draftPriceMin.set(0);
    this.draftPriceMax.set(MAX_PRICE);
    this.draftStones.set([]);
    this.draftSortKey.set('');
  }

  // ── Reset: clear both draft and applied for a filter ──────
  resetFilter(key: string, e: MouseEvent): void {
    e.stopPropagation();
    switch (key) {
      case 'chat-lieu':
        this.draftMaterials.set([]);
        this.selectedMaterials.set([]);
        break;
      case 'khoang-gia':
        this.draftPriceMin.set(0);
        this.draftPriceMax.set(MAX_PRICE);
        this.priceMin.set(0);
        this.priceMax.set(MAX_PRICE);
        break;
      case 'loai-da':
        this.draftStones.set([]);
        this.selectedStones.set([]);
        break;
      case 'ban-chay':
        this.draftSortKey.set('');
        this.sortKey.set('');
        break;
    }
  }

  @HostListener('document:click')
  closeFilter(): void { this.openFilter.set(null); }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + 'đ';
  }

  loadMore(): void {
    this.displayCount.update((c) => c + 8);
  }
}
