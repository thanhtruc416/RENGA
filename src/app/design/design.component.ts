import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatVnd } from '../shared/utils/currency.util';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';

interface Designer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  badge: string;
  bio: string;
  fee: number;
  image: string;
  rating: number;
}

interface CalendarDay {
  date: Date | null;
  dayNum: number | null;
  disabled: boolean;
}

@Component({
  selector: 'app-design',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, PaymentSuccessModalComponent, PaymentFailModalComponent],
  templateUrl: './design.component.html',
  styleUrl: './design.component.css',
})
export class DesignComponent {
  // ─── Static data ──────────────────────────────────────────────────────
  readonly steps = [
    { n: 1, label: 'Chọn Designer' },
    { n: 2, label: 'Đặt lịch' },
    { n: 3, label: 'Tư vấn' },
    { n: 4, label: 'Xác nhận' },
  ];

  private readonly allDesigners: Designer[] = [
    {
      id: 'henri-de-luca',
      name: 'Master Henri de Luca',
      role: 'Nhà thiết kế kim hoàn cao cấp',
      specialty: 'Nhà thiết kế kim cương',
      badge: 'SIGNATURE WORK',
      bio: 'Bậc thầy thiết kế kim cương với hơn 20 năm kinh nghiệm tại các kinh đô trang sức châu Âu.',
      fee: 13_000_000,
      image: 'assets/images/designer-photo.png',
      rating: 5,
    },
    {
      id: 'isabella-moretti',
      name: 'Isabella Moretti',
      role: 'Nhà thiết kế kim hoàn cao cấp',
      specialty: 'Nhà thiết kế vòng cổ',
      badge: 'HERITAGE REVIVAL',
      bio: 'Chuyên gia phục hồi phong cách di sản, kết hợp nét cổ điển Ý với cảm quan hiện đại.',
      fee: 13_000_000,
      image: 'assets/images/designer-photo.png',
      rating: 5,
    },
    {
      id: 'elena-vance',
      name: 'Elena Vance',
      role: 'Nhà thiết kế kim hoàn cao cấp',
      specialty: 'Nhà thiết kế trang sức tay',
      badge: 'AVANT-GARDE METALS',
      bio: 'Chuyên gia thiết kế trang sức cao cấp với phong cách avant-garde độc đáo.',
      fee: 13_000_000,
      image: 'assets/images/designer-photo.png',
      rating: 5,
    },
    {
      id: 'rafael-de-souza',
      name: 'Rafael de Souza',
      role: 'Nhà thiết kế kim hoàn cao cấp',
      specialty: 'Nhà thiết kế nhẫn cưới',
      badge: 'ETERNAL BOND',
      bio: 'Nghệ nhân chuyên thiết kế nhẫn cưới và trang sức đính hôn với ngôn ngữ thiết kế lãng mạn.',
      fee: 15_000_000,
      image: 'assets/images/designer-photo.png',
      rating: 5,
    },
    {
      id: 'mei-lin-chen',
      name: 'Mei Lin Chen',
      role: 'Nhà thiết kế kim hoàn cao cấp',
      specialty: 'Nhà thiết kế hoa tai',
      badge: 'DELICATE FORMS',
      bio: 'Chuyên gia tạo hình hoa tai tinh xảo, lấy cảm hứng từ nghệ thuật điêu khắc châu Á.',
      fee: 11_000_000,
      image: 'assets/images/designer-photo.png',
      rating: 5,
    },
    {
      id: 'lucas-fontaine',
      name: 'Lucas Fontaine',
      role: 'Nhà thiết kế kim hoàn cao cấp',
      specialty: 'Nhà thiết kế lắc tay',
      badge: 'FLUID LUXURY',
      bio: 'Phong cách tối giản Pháp — từng đường nét được tính toán để tôn lên vẻ đẹp tự nhiên.',
      fee: 12_000_000,
      image: 'assets/images/designer-photo.png',
      rating: 5,
    },
  ];

  private readonly designerPageSize = 3;
  private readonly designerVisible = signal(this.designerPageSize);

  readonly designers = computed(() =>
    this.allDesigners.slice(0, this.designerVisible())
  );

  readonly hasMoreDesigners = computed(() =>
    this.designerVisible() < this.allDesigners.length
  );

  readonly timeSlots = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];
  readonly unavailableSlots = new Set(['17:30']);

  readonly paymentMethods = [
    { id: 'momo', label: 'Ví MoMo' },
    { id: 'vnpay', label: 'VNPay' },
    { id: 'bank', label: 'Chuyển khoản ngân hàng' },
    { id: 'card', label: 'Thẻ tín dụng / Ghi nợ' },
  ];

  readonly occasionOptions = [
    { value: 'qua-tang', label: 'QUÀ TẶNG' },
    { value: 'tang-ban-than', label: 'TẶNG BẢN THÂN' },
    { value: 'cap-doi', label: 'CẶP ĐÔI' },
  ];

  // ─── Step state ───────────────────────────────────────────────────────
  readonly currentStep = signal(1);

  // Step 1
  readonly selectedDesigner = signal<Designer | null>(null);

  // Step 2 – calendar
  readonly calendarYear = signal(2026);
  readonly calendarMonth = signal(5); // 0-based: 5 = June
  readonly selectedDate = signal<Date | null>(null);
  readonly selectedTime = signal<string | null>(null);

  // Step 3
  readonly selectedOccasion = signal('qua-tang');
  readonly ideaForm = new FormGroup({
    jewelryType: new FormControl('', { nonNullable: true }),
    style: new FormControl('', { nonNullable: true }),
    material: new FormControl('18k-yellow', { nonNullable: true }),
    budget: new FormControl('', { nonNullable: true }),
    expectedDate: new FormControl('', { nonNullable: true }),
    ideaDesc: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  // Step 4
  readonly selectedPayment = signal('momo');
  readonly showSuccessModal = signal(false);
  readonly showFailModal = signal(false);
  private bookingSuccessNext = true;
  readonly MEMBER_DISCOUNT = 0.1;
  readonly DEPOSIT_RATIO = 0.5;

  readonly voucherInput = signal('');
  readonly appliedVoucher = signal('');
  readonly voucherError = signal(false);

  private readonly VALID_VOUCHERS: Record<string, number> = {
    'RENGA10': 0.10,
    'RENGA20': 0.20,
    'MEMBER5': 0.05,
  };

  readonly voucherDiscount = computed(() => {
    const code = this.appliedVoucher().toUpperCase();
    const rate = this.VALID_VOUCHERS[code] ?? 0;
    return Math.round(this.consultationFee() * rate);
  });

  applyVoucher(): void {
    const code = this.voucherInput().trim().toUpperCase();
    if (this.VALID_VOUCHERS[code]) {
      this.appliedVoucher.set(code);
      this.voucherError.set(false);
    } else {
      this.appliedVoucher.set('');
      this.voucherError.set(true);
    }
  }

  removeVoucher(): void {
    this.appliedVoucher.set('');
    this.voucherInput.set('');
    this.voucherError.set(false);
  }

  // ─── Computed ─────────────────────────────────────────────────────────
  readonly calendarMonthLabel = computed(() => {
    const d = new Date(this.calendarYear(), this.calendarMonth(), 1);
    return d.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
  });

  readonly calendarDays = computed((): CalendarDay[] => {
    const year = this.calendarYear();
    const month = this.calendarMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    // Convert to Mon-based: Mon=0 … Sun=6
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: CalendarDay[] = [];
    for (let i = 0; i < startOffset; i++) {
      days.push({ date: null, dayNum: null, disabled: true });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      days.push({ date, dayNum: d, disabled: date < today });
    }
    return days;
  });

  readonly selectedDateLabel = computed(() => {
    const d = this.selectedDate();
    if (!d) return 'Chưa chọn';
    return d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  });

  readonly isDateSelected = computed(() => (date: Date | null) => {
    const sel = this.selectedDate();
    if (!date || !sel) return false;
    return date.toDateString() === sel.toDateString();
  });

  readonly consultationFee = computed(() => this.selectedDesigner()?.fee ?? 0);
  readonly memberDiscount = computed(() => Math.round(this.consultationFee() * this.MEMBER_DISCOUNT));
  readonly depositAmount = computed(() =>
    Math.round((this.consultationFee() - this.memberDiscount() - this.voucherDiscount()) * this.DEPOSIT_RATIO),
  );

  // ─── Methods ──────────────────────────────────────────────────────────
  goToStep(n: number): void {
    this.currentStep.set(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadMoreDesigners(): void {
    this.designerVisible.update(n => n + this.designerPageSize);
  }

  selectDesigner(designer: Designer): void {
    this.selectedDesigner.set(designer);
    this.goToStep(2);
  }

  prevMonth(): void {
    if (this.calendarMonth() === 0) {
      this.calendarMonth.set(11);
      this.calendarYear.update(y => y - 1);
    } else {
      this.calendarMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.calendarMonth() === 11) {
      this.calendarMonth.set(0);
      this.calendarYear.update(y => y + 1);
    } else {
      this.calendarMonth.update(m => m + 1);
    }
  }

  selectDate(day: CalendarDay): void {
    if (!day.disabled && day.date) {
      this.selectedDate.set(day.date);
      this.selectedTime.set(null);
    }
  }

  selectTime(slot: string): void {
    if (!this.unavailableSlots.has(slot)) {
      this.selectedTime.set(slot);
    }
  }

  confirmSchedule(): void {
    if (this.selectedDate() && this.selectedTime()) {
      this.goToStep(3);
    }
  }

  selectOccasion(value: string): void {
    this.selectedOccasion.set(value);
  }

  confirmIdea(): void {
    this.goToStep(4);
  }

  selectPayment(id: string): void {
    this.selectedPayment.set(id);
  }

  completeBooking(): void {
    // TODO: gọi API đặt lịch — mock xen kẽ để test cả 2 case
    if (this.bookingSuccessNext) {
      this.showSuccessModal.set(true);
    } else {
      this.showFailModal.set(true);
    }
    this.bookingSuccessNext = !this.bookingSuccessNext;
  }

  readonly formatVnd = formatVnd;

  starsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
