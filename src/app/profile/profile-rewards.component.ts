import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface VoucherCard {
  id: string;
  iconUrl: string;
  points: number;
  title: string;
  description: string;
}

interface PointHistoryRow {
  date: string;
  description: string;
  type: 'EARNED' | 'BONUS' | 'REDEEMED';
  points: number;
}

@Component({
  selector: 'app-profile-rewards',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './profile-rewards.component.html',
  styleUrl: './profile-rewards.component.css',
})
export class ProfileRewardsComponent {
  readonly userName = signal('Hoàng Anh');

  readonly vouchers = signal<VoucherCard[]>([
    {
      id: 'voucher-purchase',
      iconUrl: '/icons/ic-voucher-ticket.png',
      points: 1500,
      title: 'Phiếu mua hàng',
      description: 'Áp dụng cho đơn hàng thiết kế riêng từ 50.000.000 VNĐ trở lên',
    },
    {
      id: 'voucher-care',
      iconUrl: '/icons/ic-voucher-wand.png',
      points: 3000,
      title: 'Chăm sóc & Đánh bóng Cao Cấp',
      description:
        'Dịch vụ làm sạch, đánh bóng và kiểm tra chuyên nghiệp cho tối đa 3 sản phẩm.',
    },
  ]);

  readonly pointHistory = signal<PointHistoryRow[]>([
    {
      date: 'Oct 24, 2024',
      description: 'Purchase: Heritage Gold Necklace',
      type: 'EARNED',
      points: 2400,
    },
    {
      date: 'Sept 12, 2024',
      description: 'Referral: Premium Member Invite',
      type: 'BONUS',
      points: 500,
    },
    {
      date: 'Aug 05, 2024',
      description: 'Redemption: Store Voucher (£100)',
      type: 'REDEEMED',
      points: -1000,
    },
  ]);

  formatPoints(points: number): string {
    const abs = Math.abs(points).toLocaleString('vi-VN').replace(/\./g, ',');
    return points >= 0 ? `+${abs}` : `-${abs}`;
  }
}
