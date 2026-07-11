import {
  ChangeDetectionStrategy, Component, computed,
  DestroyRef, inject, OnInit, signal, ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountService, LoyaltyTransaction } from '../account.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

interface VoucherCard {
  id: string;
  points: number;
  title: string;
  description: string;
}

interface PointHistoryRow {
  date: string;
  description: string;
  type: 'EARNED' | 'REDEEMED';
  points: number;
}

@Component({
  selector: 'app-profile-loyalty',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  templateUrl: './profile-loyalty.component.html',
  styleUrl: './profile-loyalty.component.css',
})
export class ProfileLoyaltyComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly authService    = inject(AuthService);
  private readonly notify         = inject(NotificationService);
  private readonly destroyRef     = inject(DestroyRef);

  // ── User ─────────────────────────────────────────────────────────────────────
  readonly userName = computed(() => {
    const name = this.authService.currentUser()?.fullName ?? '';
    return name.split(' ').pop() ?? name;
  });

  // ── Points ───────────────────────────────────────────────────────────────────
  readonly currentPoints = signal(0);
  readonly isLoadingLoyalty = signal(true);
  readonly pointHistory = signal<PointHistoryRow[]>([]);

  // ── Vouchers (catalog stays static; affordability is computed) ────────────────
  readonly vouchers = signal<VoucherCard[]>([
    {
      id: 'voucher-purchase',
      points: 1500,
      title: 'Phiếu mua hàng',
      description: 'Áp dụng cho đơn hàng thiết kế riêng từ 50.000.000 VNĐ trở lên',
    },
    {
      id: 'voucher-care',
      points: 3000,
      title: 'Dịch vụ Chăm sóc & Đánh bóng Cao Cấp',
      description: 'Làm sạch, đánh bóng và kiểm tra chuyên nghiệp cho tối đa 3 sản phẩm.',
    },
  ]);

  canAfford(voucher: VoucherCard): boolean {
    return this.currentPoints() >= voucher.points;
  }

  // ── Redeem ───────────────────────────────────────────────────────────────────
  readonly showRedeemModal  = signal(false);
  readonly redeemSuccess    = signal(false);
  readonly redeemFailure    = signal(false);
  readonly redeemErrorMsg   = signal('');
  readonly redeemingId      = signal<string | null>(null);
  readonly lastRedeemedTitle = signal('');

  redeemVoucher(voucher: VoucherCard): void {
    if (!this.canAfford(voucher) || this.redeemingId() !== null) return;

    this.redeemingId.set(voucher.id);
    this.redeemSuccess.set(false);
    this.redeemFailure.set(false);
    this.redeemErrorMsg.set('');

    this.accountService.redeemReward({ rewardTitle: voucher.title, pointCost: voucher.points })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.redeemingId.set(null);
          if (res.success && res.data) {
            this.currentPoints.set(res.data.remainingPoints);
            this.lastRedeemedTitle.set(voucher.title);
            this.redeemSuccess.set(true);
            this.showRedeemModal.set(true);
            // Reload history to reflect the new transaction
            this.loadLoyalty();
          } else {
            this.redeemErrorMsg.set(res.message ?? 'Đổi thưởng thất bại. Vui lòng thử lại.');
            this.redeemFailure.set(true);
            this.showRedeemModal.set(true);
          }
        },
        error: (err) => {
          this.redeemingId.set(null);
          this.redeemErrorMsg.set(err?.error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại.');
          this.redeemFailure.set(true);
          this.showRedeemModal.set(true);
        },
      });
  }

  closeRedeemModal(): void {
    this.showRedeemModal.set(false);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  formatPoints(points: number): string {
    const abs = Math.abs(points).toLocaleString('vi-VN');
    return points >= 0 ? `+${abs}` : `-${abs}`;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadLoyalty();
  }

  private loadLoyalty(): void {
    this.isLoadingLoyalty.set(true);
    this.accountService.getLoyaltyPoints()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isLoadingLoyalty.set(false);
          if (res.success && res.data) {
            const d = res.data;
            this.currentPoints.set(d.available ?? d.total ?? 0);
            if (d.history?.length) {
              this.pointHistory.set(
                (d.history as LoyaltyTransaction[]).map(h => ({
                  date:        this.formatDate(h.createdAt),
                  description: h.description,
                  type:        h.type === 'earn' ? 'EARNED' : 'REDEEMED',
                  points:      h.points,
                }))
              );
            }
          }
        },
        error: () => {
          this.isLoadingLoyalty.set(false);
          this.notify.error('Không tải được điểm thưởng thành viên. Vui lòng tải lại trang.');
        },
      });
  }
}