import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Material {
  tag: string;
  title: string;
  body: string;
  icon: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-sustainable-materials',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './sustainable-materials.component.html',
  styleUrl: './sustainable-materials.component.css',
})
export class SustainableMaterialsComponent {
  readonly materials: Material[] = [
    {
      tag: 'KIM LOẠI QUÝ',
      title: 'Vàng tái chế',
      body: 'Toàn bộ vàng sử dụng trong sản phẩm RENGA đến từ nguồn tái chế được chứng nhận, giảm thiểu nhu cầu khai thác mới và tác động đến hệ sinh thái.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    },
    {
      tag: 'ĐÁ QUÝ',
      title: 'Kim cương lab-grown',
      body: 'Kim cương nuôi cấy trong phòng thí nghiệm có cấu trúc và vẻ đẹp hoàn toàn tương đương kim cương tự nhiên, nhưng chỉ tạo ra 1/10 lượng khí thải carbon so với khai thác truyền thống.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>`,
    },
    {
      tag: 'ĐÁ BÁN QUÝ',
      title: 'Đá quý có chứng nhận',
      body: 'Sapphire, ruby và các đá quý màu được lựa chọn từ những mỏ đạt chuẩn Fairtrade, nơi quyền lợi của người lao động và cộng đồng địa phương được bảo vệ nghiêm ngặt.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    },
    {
      tag: 'NGUYÊN LIỆU',
      title: 'Bạc Sterling tái chế',
      body: 'Bạc 925 tái chế từ nguồn công nghiệp và tiêu dùng, được tinh chế và kiểm định độ tinh khiết trước khi đưa vào quy trình chế tác tại xưởng.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    },
  ];

  readonly stats: Stat[] = [
    { value: '100%', label: 'Kim loại quý từ nguồn tái chế hoặc chứng nhận RJC' },
    { value: '60%', label: 'Kim cương lab-grown trong bộ sưu tập hiện tại' },
    { value: '0', label: 'Nguồn cung từ vùng xung đột (Conflict-free)' },
    { value: '2026', label: 'Mục tiêu trung hòa carbon toàn bộ chuỗi cung ứng' },
  ];

  readonly steps: Step[] = [
    {
      num: '01',
      title: 'Lựa chọn nhà cung cấp',
      desc: 'Mọi nhà cung cấp nguyên liệu đều phải vượt qua quy trình thẩm định gồm kiểm tra chứng nhận, lịch sử hoạt động và cam kết môi trường trước khi hợp tác.',
    },
    {
      num: '02',
      title: 'Kiểm định nguồn gốc',
      desc: 'Mỗi lô nguyên liệu đều đi kèm tài liệu truy xuất nguồn gốc đầy đủ. RENGA duy trì hệ thống hồ sơ minh bạch cho phép truy xuất đến tận mỏ khai thác hoặc cơ sở tái chế.',
    },
    {
      num: '03',
      title: 'Kiểm soát chất lượng',
      desc: 'Trước khi đưa vào chế tác, mọi nguyên liệu đều được kiểm định độ tinh khiết và chất lượng tại xưởng. Những lô không đạt tiêu chuẩn sẽ bị trả lại hoàn toàn.',
    },
  ];
}
