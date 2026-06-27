import { ChangeDetectionStrategy, Component, computed, signal, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { formatVnd } from '../shared/utils/currency.util';
import { PaymentSuccessModalComponent } from '../shared/components/modal/payment-success-modal/payment-success-modal.component';
import { PaymentFailModalComponent } from '../shared/components/modal/payment-fail-modal/payment-fail-modal.component';
import { environment } from '../../environments/environment';

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

  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);

  private readonly BADGE_MAP: Record<string, string> = {
    'Thiết kế nhẫn cưới': 'ETERNAL BOND',
    'Thiết kế vòng cổ & mặt dây chuyền': 'HERITAGE REVIVAL',
    'Thiết kế lắc tay': 'FLUID LUXURY',
    'Thiết kế hoa tai': 'DELICATE FORMS',
    'Thiết kế trang sức đính đá': 'SIGNATURE WORK',
  };

  private readonly allDesignersData = signal<Designer[]>([]);
  private readonly designerPageSize = 3;
  private readonly designerVisible = signal(this.designerPageSize);

  readonly designers = computed(() => this.allDesignersData().slice(0, this.designerVisible()));
  readonly hasMoreDesigners = computed(() => this.designerVisible() < this.allDesignersData().length);

  readonly timeSlots = signal<string[]>([]);
  readonly unavailableSlots = new Set<string>();
  readonly slotsLoading = signal(false);
  private slotIdByTime: Record<string, string> = {};

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

  // Step 3 – voice input
  readonly isListening = signal(false);
  private recognition: any = null;

  toggleVoice(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Trình duyệt của bạn chưa hỗ trợ nhận giọng nói.'); return; }

    if (this.isListening()) {
      this.recognition?.stop();
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'vi-VN';
    this.recognition.interimResults = false;
    this.recognition.continuous = false;

    this.recognition.onstart  = () => this.isListening.set(true);
    this.recognition.onend    = () => this.isListening.set(false);
    this.recognition.onerror  = () => this.isListening.set(false);
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const current = this.ideaForm.controls.ideaDesc.value;
      this.ideaForm.controls.ideaDesc.setValue(
        current ? `${current} ${transcript}` : transcript
      );
    };
    this.recognition.start();
  }

  // Step 3 – image attachments
  readonly attachedImages = signal<{ name: string; url: string }[]>([]);

  onImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const current = this.attachedImages();
    const added: { name: string; url: string }[] = [];
    Array.from(input.files).forEach(file => {
      if (file.size <= 10 * 1024 * 1024) {
        added.push({ name: file.name, url: URL.createObjectURL(file) });
      }
    });
    this.attachedImages.set([...current, ...added]);
    input.value = '';
  }

  removeImage(index: number): void {
    const imgs = [...this.attachedImages()];
    URL.revokeObjectURL(imgs[index].url);
    imgs.splice(index, 1);
    this.attachedImages.set(imgs);
  }

  // Step 4
  readonly selectedPayment = signal('momo');
  readonly showSuccessModal = signal(false);
  readonly showFailModal = signal(false);
  readonly isSubmitting = signal(false);
  readonly placedAppointmentId = signal('');
  readonly MEMBER_DISCOUNT = 0.1;
  // BR-18: The Designer phải thanh toán 100% phí tư vấn ngay khi đặt lịch
  readonly DEPOSIT_RATIO = 1.0;

  readonly voucherInput = signal('');
  readonly appliedVoucher = signal('');
  readonly voucherError = signal(false);
  readonly voucherDiscount = signal(0);

  applyVoucher(): void {
    const code = this.voucherInput().trim().toUpperCase();
    if (!code) return;
    this.http.post<any>(`${environment.apiUrl}/vouchers/validate`, {
      code,
      order_total: this.consultationFee(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.valid) {
          this.appliedVoucher.set(code);
          this.voucherDiscount.set(res.discount);
          this.voucherError.set(false);
        } else {
          this.appliedVoucher.set('');
          this.voucherDiscount.set(0);
          this.voucherError.set(true);
        }
      },
      error: () => this.voucherError.set(true),
    });
  }

  removeVoucher(): void {
    this.appliedVoucher.set('');
    this.voucherInput.set('');
    this.voucherError.set(false);
    this.voucherDiscount.set(0);
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

  readonly consultationFee  = computed(() => this.selectedDesigner()?.fee ?? 0);
  readonly memberDiscount   = computed(() => Math.round(this.consultationFee() * this.MEMBER_DISCOUNT));
  readonly netFee           = computed(() => this.consultationFee() - this.memberDiscount() - this.voucherDiscount());
  readonly depositAmount    = computed(() =>
    Math.round(this.netFee() * this.DEPOSIT_RATIO),
  );

  constructor() {
    this.http.get<any>(`${environment.apiUrl}/design/designers`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.allDesignersData.set(res.data.map((d: any): Designer => ({
              id:        d.employee_id,
              name:      d.full_name,
              role:      'Nhà thiết kế kim hoàn cao cấp',
              specialty: d.specialty ?? '',
              badge:     this.BADGE_MAP[d.specialty] ?? 'ARTISAN',
              bio:       d.bio ?? '',
              fee:       Number(d.consultation_fee),
              image:     d.avatar ?? 'assets/images/designer-photo.png',
              rating:    5,
            })));
          }
        },
      });
  }

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
      this.timeSlots.set([]);
      this.slotIdByTime = {};
      this.unavailableSlots.clear();

      const designer = this.selectedDesigner();
      if (!designer) return;

      const d = day.date;
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      this.slotsLoading.set(true);
      this.http.get<any>(`${environment.apiUrl}/design/slots`, {
        params: { designerId: designer.id, date: dateStr },
      }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.success) {
            const labels: string[] = [];
            // BR-33: chỉ cho đặt trước ít nhất 24 giờ
            const cutoff = Date.now() + 24 * 60 * 60 * 1000;
            for (const slot of res.data) {
              const label = String(slot.start_time).substring(0, 5);
              labels.push(label);
              this.slotIdByTime[label] = slot.slot_id;
              const [h, m] = label.split(':').map(Number);
              const slotMs = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m).getTime();
              if (!slot.is_available || slotMs < cutoff) this.unavailableSlots.add(label);
            }
            this.timeSlots.set(labels);
          }
          this.slotsLoading.set(false);
        },
        error: () => this.slotsLoading.set(false),
      });
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
    const time     = this.selectedTime();
    const slotId   = time ? (this.slotIdByTime[time] ?? null) : null;
    if (!slotId) { this.showFailModal.set(true); return; }

    this.isSubmitting.set(true);
    this.http.post<any>(`${environment.apiUrl}/design/appointments`, {
      slotId,
      ideaDescription: this.ideaForm.value.ideaDesc ?? '',
      consultationFee: this.consultationFee(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.placedAppointmentId.set(res.data.appointment_id);
          this.showSuccessModal.set(true);
        } else {
          this.showFailModal.set(true);
        }
        this.isSubmitting.set(false);
      },
      error: () => {
        this.showFailModal.set(true);
        this.isSubmitting.set(false);
      },
    });
  }

  readonly formatVnd = formatVnd;

  starsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
