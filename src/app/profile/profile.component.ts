import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
}

interface PointHistoryItem {
  label: string;
  points: number;
}

interface DashboardLink {
  key: string;
  title: string;
  description: string;
  route: string;
  iconUrl: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  readonly user = signal<UserProfile>({
    fullName: 'Nguyễn Thị Hoàng Anh',
    email: 'anhnth23416@gmail.com',
    phone: '+84 7700 900077',
    birthDate: '22/02/2005',
    address: '123 Nguyễn Văn Cừ, Quận 7, TP. Hồ Chí Minh',
  });

  readonly loyaltyTier = signal('Gold');
  readonly loyaltyPoints = signal(4250);
  readonly loyaltyNextTierPoints = signal(5000);
  readonly loyaltyHistory = signal<PointHistoryItem[]>([
    { label: 'Mua kim cương', points: 1200 },
    { label: 'Thưởng kỷ niệm', points: 500 },
  ]);

  readonly loyaltyProgress = computed(() =>
    Math.round((this.loyaltyPoints() / this.loyaltyNextTierPoints()) * 100)
  );
  readonly loyaltyRemaining = computed(
    () => this.loyaltyNextTierPoints() - this.loyaltyPoints()
  );

  readonly dashboardLinks: DashboardLink[] = [
    {
      key: 'rewards',
      title: 'ĐỔI THƯỞNG',
      description: 'Sử dụng điểm tích lũy cho các đặc quyền cao cấp',
      route: '/profile/rewards',
      iconUrl: '/icons/ic-profile-rewards.png',
    },
    {
      key: 'history',
      title: 'LỊCH SỬ TÍCH ĐIỂM',
      description: 'Xem chi tiết các giao dịch và điểm thưởng',
      route: '/profile/points-history',
      iconUrl: '/icons/ic-profile-history.png',
    },
  ];

  readonly currentPassword = signal('');
  readonly newPassword = signal('');

  setCurrentPassword(value: string): void {
    this.currentPassword.set(value);
  }

  setNewPassword(value: string): void {
    this.newPassword.set(value);
  }

  updatePassword(): void {
    // Will connect to auth service
  }
}
