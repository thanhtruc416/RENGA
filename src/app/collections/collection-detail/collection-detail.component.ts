import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface CollectionProduct {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

interface CollectionDetail {
  slug: string;
  title: string;
  subtitle: string;
  storyTag: string;
  storyTitle: string;
  storyBody1: string;
  storyBody2: string;
  storyQuote: string;
  storyImageUrl: string;
  productsTitle: string;
  productsSubtitle: string;
  products: CollectionProduct[];
}

const COLLECTIONS: Record<string, CollectionDetail> = {
  'bo-trang-suc-dong-bo': {
    slug: 'bo-trang-suc-dong-bo',
    title: 'Bộ trang sức Đồng bộ',
    subtitle:
      'Sự kết hợp hoàn mỹ giữa dây chuyền, nhẫn và hoa tai, tạo nên một bản giao hưởng ánh sáng và phong cách đồng nhất cho những dịp quan trọng nhất',
    storyTag: 'Câu chuyện',
    storyTitle: 'Vẻ đẹp đồng điệu',
    storyBody1:
      'Bộ sưu tập Đồng Bộ ra đời từ triết lý rằng mỗi chi tiết đều phải hài hòa như một bản nhạc. Dây chuyền, nhẫn và hoa tai được chế tác từ cùng một dòng kim loại quý, mang chung ngôn ngữ thẩm mỹ tinh tế và nhất quán.',
    storyBody2:
      'Đường cắt gọn gàng, ánh phản chiếu đồng đều tạo nên sự sang trọng không phô trương. Đây là bộ sưu tập dành cho người phụ nữ hiện đại — tự tin, tinh tế và luôn hoàn chỉnh trong từng khoảnh khắc.',
    storyQuote: 'Vẻ đẹp thực sự nằm trong sự hài hòa tổng thể, không phải trong từng chi tiết đơn lẻ',
    storyImageUrl: 'assets/images/collection-dong-bo.png',
    productsTitle: 'Sự tuyển chọn',
    productsSubtitle: 'Khám phá những tác phẩm được tuyển chọn từ bộ sưu tập Đồng Bộ',
    products: [
      { id: '1', name: 'HARMONY GOLD RING', price: '3.800.000', imageUrl: 'assets/images/collection-prod-diamond-ring.png' },
      { id: '2', name: 'SYMPHONY NECKLACE', price: '2.600.000', imageUrl: 'assets/images/collection-prod-unity-necklace.png' },
      { id: '3', name: 'ACCORD BAND', price: '2.900.000', imageUrl: 'assets/images/collection-prod-baguette-band.png' },
      { id: '4', name: 'UNISON STUDS', price: '1.350.000', imageUrl: 'assets/images/collection-prod-mini-studs.png' },
    ],
  },

  'bo-trang-suc-cap-doi': {
    slug: 'bo-trang-suc-cap-doi',
    title: 'Bộ trang sức Cặp đôi',
    subtitle:
      'Biểu tượng của sự gắn kết vĩnh cửu. Những thiết kế song hành mang đậm dấu ấn cá nhân, dành riêng cho những tâm hồn đồng điệu.',
    storyTag: 'Câu chuyện',
    storyTitle: 'Biểu tượng của sự gắn kết',
    storyBody1:
      'Mỗi thiết kế trong bộ sưu tập Eternity là một chương của câu chuyện tình yêu bất tận. Chúng tôi tin rằng trang sức không chỉ là phụ kiện, mà là những kỷ vật ghi dấu những lời thề nguyện thiêng liêng nhất.',
    storyBody2:
      'Sự tinh xảo trong từng đường nét cắt gọt và sự đồng nhất trong độ sáng của kim cương tạo nên một vòng tròn khép kín, không điểm bắt đầu, không điểm kết thúc — giống như chính tình yêu của bạn.',
    storyQuote: 'Được đính đá thủ công đầy tỉ mỉ, mang lại vẻ rạng rỡ bền lâu suốt đời.',
    storyImageUrl: 'assets/images/collection-story-cap-doi.png',
    productsTitle: 'Sự tuyển chọn',
    productsSubtitle: 'Khám phá những tác phẩm được tuyển chọn từ vũ trụ Eternity.',
    products: [
      { id: '1', name: 'ETERNITY DIAMOND RING', price: '4.200.000', imageUrl: 'assets/images/collection-prod-diamond-ring.png' },
      { id: '2', name: 'INTERLOCKING UNITY NECKLACE', price: '2.850.000', imageUrl: 'assets/images/collection-prod-unity-necklace.png' },
      { id: '3', name: 'BAGUETTE ETERNITY BAND', price: '3.100.000', imageUrl: 'assets/images/collection-prod-baguette-band.png' },
      { id: '4', name: 'ETERNITY MINI STUDS', price: '1.450.000', imageUrl: 'assets/images/collection-prod-mini-studs.png' },
    ],
  },

  'hoang-gia': {
    slug: 'hoang-gia',
    title: 'Bộ sưu tập Hoàng Gia',
    subtitle:
      'Đỉnh cao của nghệ thuật chế tác thủ công. Những kiệt tác mang hơi thở quý tộc, được khảm bởi những viên đá quý hiếm nhất thế gian.',
    storyTag: 'Di sản',
    storyTitle: 'Ngọn lửa hoàng gia',
    storyBody1:
      'Lấy cảm hứng từ những triều đại vàng son trong lịch sử, bộ sưu tập Hoàng Gia tái hiện vẻ đẹp uy nghi qua từng chi tiết chạm khắc thủ công. Mỗi tác phẩm là sự hội tụ của kỹ thuật kim hoàn điêu luyện và nguyên liệu quý hiếm bậc nhất.',
    storyBody2:
      'Những viên đá quý được tuyển chọn khắt khe từ các mỏ danh tiếng thế giới, mỗi viên đều mang trong mình câu chuyện của đất trời. Đây không chỉ là trang sức — đây là di sản được truyền từ thế hệ này sang thế hệ khác.',
    storyQuote: 'Mỗi kiệt tác là lời nhắc nhở rằng vẻ đẹp chân thực vượt qua mọi giới hạn của thời gian.',
    storyImageUrl: 'assets/images/collection-hoang-gia.png',
    productsTitle: 'Sự tuyển chọn',
    productsSubtitle: 'Khám phá những kiệt tác được chọn lọc từ bộ sưu tập Hoàng Gia.',
    products: [
      { id: '1', name: 'ROYAL CROWN NECKLACE', price: '12.500.000', imageUrl: 'assets/images/collection-prod-unity-necklace.png' },
      { id: '2', name: 'IMPERIAL DIAMOND RING', price: '8.900.000', imageUrl: 'assets/images/collection-prod-diamond-ring.png' },
      { id: '3', name: 'REGAL SAPPHIRE BAND', price: '6.200.000', imageUrl: 'assets/images/collection-prod-baguette-band.png' },
      { id: '4', name: 'SOVEREIGN STUDS', price: '3.800.000', imageUrl: 'assets/images/collection-prod-mini-studs.png' },
    ],
  },
};

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CtaSectionComponent],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.css',
})
export class CollectionDetailComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(p => p.get('slug') ?? '')),
    { initialValue: '' }
  );

  readonly collection = computed(
    () => COLLECTIONS[this.slug()] ?? COLLECTIONS['bo-trang-suc-cap-doi']
  );
}
