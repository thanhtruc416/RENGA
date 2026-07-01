import {
  ChangeDetectionStrategy, Component, computed,
  DestroyRef, inject, OnInit, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountService, LoyaltyTransaction } from '../account.service';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  gender: '' | 'MALE' | 'FEMALE' | 'OTHER';
}

interface PointHistoryItem {
  label: string;
  points: number;
  type: 'earn' | 'redeem';
}

@Component({
  selector: 'app-profile-info',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly destroyRef     = inject(DestroyRef);

  // ── Profile ─────────────────────────────────────────────────────────────────
  readonly isLoading = signal(true);

  readonly user = signal<UserProfile>({
    fullName: '', email: '', phone: '', birthDate: '', address: '', gender: '',
  });

  readonly isEditing = signal(false);
  readonly isSaving  = signal(false);
  readonly draft     = signal<UserProfile>({ ...this.user() });

  readonly draftDateInput = computed(() => {
    const d = this.draft().birthDate;
    if (!d) return '';
    const parts = d.split('/');
    return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : '';
  });

  startEdit(): void {
    this.draft.set({ ...this.user() });
    this.isEditing.set(true);
  }

  cancelEdit(): void { this.isEditing.set(false); }

  saveEdit(form: HTMLFormElement): void {
    if (!form.reportValidity() || this.isSaving()) return;
    const d = this.draft();
    this.isSaving.set(true);
    this.accountService.updateProfile({
      fullName: d.fullName,
      email: d.email,
      phone: d.phone,
      birthDate: d.birthDate,
      address: d.address,
      gender: d.gender,
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        if (res.success) {
          this.user.set({ ...d });
          this.isEditing.set(false);
          this.showPopup(true, 'Cập nhật thành công!', 'Thông tin hồ sơ của bạn đã được lưu.');
        } else {
          this.showPopup(false, 'Cập nhật thất bại!', res.message ?? 'Vui lòng thử lại.');
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        this.showPopup(false, 'Cập nhật thất bại!', err?.error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại.');
      },
    });
  }

  setDraft(field: keyof UserProfile, value: string): void {
    this.draft.update(d => ({ ...d, [field]: value } as UserProfile));
  }

  genderLabel(gender: UserProfile['gender']): string {
    return gender === 'MALE' ? 'Nam' : gender === 'FEMALE' ? 'Nữ' : gender === 'OTHER' ? 'Khác' : 'Chưa cập nhật';
  }

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
    el.setCustomValidity(
      el.validity.valueMissing      ? 'Vui lòng nhập số điện thoại' :
      el.validity.patternMismatch   ? 'Chỉ được chứa chữ số, dấu + và khoảng trắng' : ''
    );
  }

  onEmailInvalid(e: Event): void {
    const el = e.target as HTMLInputElement;
    el.setCustomValidity(
      el.validity.valueMissing   ? 'Vui lòng nhập địa chỉ email' :
      el.validity.typeMismatch   ? 'Email không hợp lệ (ví dụ: ten@email.com)' : ''
    );
  }

  // ── Loyalty ──────────────────────────────────────────────────────────────────
  readonly loyaltyTier           = signal('Gold');
  readonly loyaltyPoints         = signal(0);
  readonly loyaltyUsed           = signal(0);
  readonly loyaltyNextTierPoints = signal(5000);
  readonly loyaltyHistory        = signal<PointHistoryItem[]>([]);

  readonly loyaltyProgress = computed(() =>
    Math.min(100, Math.round((this.loyaltyPoints() / this.loyaltyNextTierPoints()) * 100))
  );
  readonly loyaltyRemaining = computed(() =>
    Math.max(0, this.loyaltyNextTierPoints() - this.loyaltyPoints())
  );

  // ── Password ─────────────────────────────────────────────────────────────────
  readonly currentPassword = signal('');
  readonly newPassword     = signal('');
  readonly confirmPassword = signal('');
  readonly showPasswords   = signal(false);
  readonly isChangingPw    = signal(false);

  readonly confirmMismatch = computed(() =>
    !!this.confirmPassword() && this.confirmPassword() !== this.newPassword()
  );

  setCurrentPassword(v: string): void { this.currentPassword.set(v); }
  setNewPassword(v: string): void     { this.newPassword.set(v); }
  setConfirmPassword(v: string): void { this.confirmPassword.set(v); }

  updatePassword(): void {
    if (!this.currentPassword() || !this.newPassword() || this.confirmMismatch() || this.isChangingPw()) return;
    this.isChangingPw.set(true);
    this.accountService.changePassword({
      currentPassword: this.currentPassword(),
      newPassword:     this.newPassword(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isChangingPw.set(false);
        if (res.success) {
          this.currentPassword.set('');
          this.newPassword.set('');
          this.confirmPassword.set('');
          this.showPopup(true, 'Đổi mật khẩu thành công!', 'Mật khẩu mới của bạn đã được cập nhật.');
        } else {
          this.showPopup(false, 'Đổi mật khẩu thất bại!', res.message ?? 'Vui lòng thử lại.');
        }
      },
      error: (err) => {
        this.isChangingPw.set(false);
        this.showPopup(false, 'Đổi mật khẩu thất bại!',
          err?.error?.message ?? 'Mật khẩu hiện tại không đúng. Vui lòng thử lại.');
      },
    });
  }

  // ── Popup ────────────────────────────────────────────────────────────────────
  readonly popupVisible = signal(false);
  readonly popupSuccess = signal(true);
  readonly popupTitle   = signal('');
  readonly popupDesc    = signal('');

  closePopup(): void { this.popupVisible.set(false); }

  private showPopup(success: boolean, title: string, desc: string): void {
    this.popupSuccess.set(success);
    this.popupTitle.set(title);
    this.popupDesc.set(desc);
    this.popupVisible.set(true);
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.accountService.getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            const d = res.data;
            this.user.set({
              fullName:  d.fullName  ?? '',
              email:     d.email     ?? '',
              phone:     d.phone     ?? '',
              birthDate: d.birthDate ?? '',
              address:   d.address   ?? '',
              gender:    d.gender    ?? '',
            });
          }
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });

    this.accountService.getLoyaltyPoints()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            const d = res.data;
            this.loyaltyPoints.set(d.total ?? 0);
            this.loyaltyUsed.set(d.used   ?? 0);
            this.loyaltyNextTierPoints.set(d.nextTierPoints ?? 5000);
            this.loyaltyTier.set(d.tierName ?? 'Silver');
            if (d.history?.length) {
              this.loyaltyHistory.set(
                (d.history as LoyaltyTransaction[]).map(h => ({
                  label: h.description,
                  points: h.points,
                  type: h.type,
                }))
              );
            }
          }
        },
      });
  }
}