import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Value {
  icon: string;
  title: string;
  desc: string;
}

interface Milestone {
  year: string;
  event: string;
}

@Component({
  selector: 'app-brand-story',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './brand-story.component.html',
  styleUrl: './brand-story.component.css',
})
export class BrandStoryComponent {
  readonly values: Value[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
      title: 'Thủ công tinh xảo',
      desc: 'Mỗi tác phẩm được chế tác hoàn toàn bằng tay bởi những nghệ nhân kim hoàn lành nghề, đảm bảo từng đường nét đều đạt đến độ tinh xảo tuyệt đối.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      title: 'Cá nhân hóa sâu sắc',
      desc: 'Chúng tôi tin rằng trang sức đẹp nhất là trang sức kể câu chuyện của riêng bạn. Mỗi chi tiết đều có thể được tùy chỉnh để phản ánh cá tính độc bản.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><path d="M6.5 6.5C8.07 4.9 10.2 4 12.5 4c4.4 0 8 3.6 8 8 0 2.3-.9 4.4-2.5 5.9"/></svg>`,
      title: 'Bền vững lâu dài',
      desc: 'Nguyên liệu được lựa chọn từ các nguồn cung cấp có trách nhiệm, đảm bảo rằng vẻ đẹp của trang sức RENGA không tạo ra gánh nặng cho môi trường.',
    },
  ];

  readonly milestones: Milestone[] = [
    { year: '2020', event: 'RENGA ra đời từ một xưởng chế tác nhỏ tại TP.HCM với đội ngũ 3 nghệ nhân' },
    { year: '2021', event: 'Ra mắt bộ sưu tập đầu tiên — Eternity — gồm 12 tác phẩm handcrafted' },
    { year: '2023', event: 'Khai trương The Studio: không gian trải nghiệm thiết kế trang sức cá nhân hóa' },
    { year: '2025', event: 'Ra mắt Bộ sưu tập Hoàng Gia, đánh dấu bước ngoặt vươn tầm luxury' },
  ];
}
