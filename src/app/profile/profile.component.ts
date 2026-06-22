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

  readonly isEditing = signal(false);
  readonly draft     = signal<UserProfile>({ ...this.user() });

  // Shared popup
  readonly popupVisible = signal(false);
  readonly popupSuccess = signal(true);
  readonly popupTitle   = signal('');
  readonly popupDesc    = signal('');

  // kept for template compat (unused now)
  readonly showSuccess = signal(false);
  readonly showFailure = signal(false);

  private profileMockSuccessNext = true;

  closePopup(): void { this.popupVisible.set(false); }

  private showPopup(success: boolean, title: string, desc: string): void {
    this.popupSuccess.set(success);
    this.popupTitle.set(title);
    this.popupDesc.set(desc);
    this.popupVisible.set(true);
  }

  // Converts "DD/MM/YYYY" → "YYYY-MM-DD" for <input type="date">
  readonly draftDateInput = computed(() => {
    const d = this.draft().birthDate;
    if (!d) return '';
    const parts = d.split('/');
    if (parts.length !== 3) return '';
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  });

  startEdit(): void {
    this.draft.set({ ...this.user() });
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  saveEdit(form: HTMLFormElement): void {
    if (!form.reportValidity()) return;
    this.isEditing.set(false);
    if (this.profileMockSuccessNext) {
      this.user.set({ ...this.draft() });
      this.showPopup(true, 'Cập nhật thành công!', 'Thông tin hồ sơ của bạn đã được lưu.');
    } else {
      this.showPopup(false, 'Cập nhật thất bại!', 'Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại.');
    }
    this.profileMockSuccessNext = !this.profileMockSuccessNext;
  }

  setDraft(field: keyof UserProfile, value: string): void {
    this.draft.update(d => ({ ...d, [field]: value }));
  }

  // Converts "YYYY-MM-DD" → "DD/MM/YYYY"
  setBirthDate(isoDate: string): void {
    if (!isoDate) return;
    const [y, m, d] = isoDate.split('-');
    this.draft.update(dr => ({ ...dr, birthDate: `${d}/${m}/${y}` }));
  }

  onPhoneKeyPress(e: KeyboardEvent): void {
    if (!/[\d+\-\s]/.test(e.key)) e.preventDefault();
  }

  onPhoneInvalid(e: Event): void {
    const el = e.target as HTMLInputElement;
    if (el.validity.valueMissing) {
      el.setCustomValidity('Vui lòng nhập số điện thoại');
    } else if (el.validity.patternMismatch) {
      el.setCustomValidity('Số điện thoại chỉ được chứa chữ số, dấu + và khoảng trắng');
    } else {
      el.setCustomValidity('');
    }
  }

  onEmailInvalid(e: Event): void {
    const el = e.target as HTMLInputElement;
    if (el.validity.valueMissing) {
      el.setCustomValidity('Vui lòng nhập địa chỉ email');
    } else if (el.validity.typeMismatch) {
      el.setCustomValidity('Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: ten@email.com)');
    } else {
      el.setCustomValidity('');
    }
  }

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

  readonly currentPassword    = signal('');
  readonly newPassword        = signal('');
  readonly showPasswords      = signal(false);
  readonly passwordSuccess    = signal(false);
  readonly passwordFailure    = signal(false);
  private passwordMockSuccessNext = true;

  setCurrentPassword(value: string): void {
    this.currentPassword.set(value);
  }

  setNewPassword(value: string): void {
    this.newPassword.set(value);
  }

  updatePassword(): void {
    if (!this.currentPassword() || !this.newPassword()) return;
    if (this.passwordMockSuccessNext) {
      this.showPopup(true, 'Đổi mật khẩu thành công!', 'Mật khẩu mới của bạn đã được cập nhật.');
    } else {
      this.showPopup(false, 'Đổi mật khẩu thất bại!', 'Mật khẩu hiện tại không đúng. Vui lòng thử lại.');
    }
    this.passwordMockSuccessNext = !this.passwordMockSuccessNext;
  }
}
