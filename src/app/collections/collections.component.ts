import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaSectionComponent } from '../shared/components/cta-section/cta-section.component';

interface Collection {
  id: string;
  tag: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  imageUrl: string;
  slug: string;
  reversed: boolean;
}

@Component({
  selector: 'app-collections',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CtaSectionComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent {
  readonly collections: Collection[] = [
    {
      id: 'dong-bo',
      tag: 'ĐỘC QUYỀN',
      titleLine1: 'BỘ TRANG SỨC',
      titleLine2: 'ĐỒNG BỘ',
      description:
        'Sự kết hợp hoàn mỹ giữa dây chuyền, nhẫn và hoa tai, tạo nên một bản giao hưởng ánh sáng và phong cách đồng nhất cho những dịp quan trọng nhất.',
      imageUrl: 'assets/Collection/z8022262886330_e7c283ded250695a7e71dd8ce3ec856b.jpg',
      slug: 'bo-trang-suc-dong-bo',
      reversed: false,
    },
    {
      id: 'cap-doi',
      tag: 'VĨNH HẰNG',
      titleLine1: 'BỘ TRANG SỨC',
      titleLine2: 'CẶP ĐÔI',
      description:
        'Biểu tượng của sự gắn kết vĩnh cửu. Những thiết kế song hành mang đậm dấu ấn cá nhân, dành riêng cho những tâm hồn đồng điệu.',
      imageUrl: 'assets/Collection/z8022262886332_43a69c6971898f0d9aed90d36a42db0e.jpg',
      slug: 'bo-trang-suc-cap-doi',
      reversed: true,
    },
    {
      id: 'hoang-gia',
      tag: 'DI SẢN',
      titleLine1: 'BỘ SƯU TẬP',
      titleLine2: 'HOÀNG GIA',
      description:
        'Đỉnh cao của nghệ thuật chế tác thủ công. Những kiệt tác mang hơi thở quý tộc, được khảm bởi những viên đá quý hiếm nhất thế gian.',
      imageUrl: 'assets/Collection/z8022262886331_0d3c0df4e22204c7e0f558214743aea0.jpg',
      slug: 'hoang-gia',
      reversed: false,
    },
  ];
}
