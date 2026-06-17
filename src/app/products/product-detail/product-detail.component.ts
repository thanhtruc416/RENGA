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
  readonly qaMessages = signal([
    {
      id: 1,
      author: 'Huỳnh Ngọc Thảo',
      authorInitial: 'H',
      time: '18 tháng trước',
      text: 'cho hỏi 18 tuổi mua trang sức góp 0% lãi suất có góp thẩm định ng thân k a',
      reply: 'Chào Chị Thảo! Dạ nếu gọi qua Công ty tài chính sẽ có gọi người thân. Sản phẩm đang có ưu đãi trả góp 0% lãi suất qua công ty tài chính HomeCredit trả trước 30% · 11.097.000đ · góp mỗi tháng dự kiến: 4.326.500đ (6 tháng). Chị có thể tham khảo thêm tại cửa hàng nhé.',
      replyTime: '18 tháng trước',
    },
    {
      id: 2,
      author: 'Trần Minh Khoa',
      authorInitial: 'T',
      time: '5 tháng trước',
      text: 'Nhẫn có thể điều chỉnh size sau khi mua không ạ?',
      reply: 'Chào anh! Dạ có, RENGA hỗ trợ điều chỉnh size miễn phí trong vòng 30 ngày kể từ ngày nhận hàng. Anh mang nhẫn đến cửa hàng gần nhất là được nhé!',
      replyTime: '5 tháng trước',
    },
  ]);

  readonly qaInput = signal('');
  readonly expandedReplies = signal(new Set([1, 2]));

  toggleReply(id: number): void {
    this.expandedReplies.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  sendQa(): void {
    const text = this.qaInput().trim();
    if (!text) return;
    this.qaMessages.update(msgs => [
      ...msgs,
      {
        id: msgs.length + 1,
        author: 'Bạn',
        authorInitial: 'B',
        time: 'Vừa xong',
        text,
        reply: '',
        replyTime: '',
      },
    ]);
    this.qaInput.set('');
  }

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
