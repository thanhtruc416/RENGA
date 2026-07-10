import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AdminFaq, AdminFaqInput, FaqTopic } from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

interface FaqForm {
  topic: FormControl<FaqTopic>;
  question: FormControl<string>;
  answer: FormControl<string>;
}

const TOPIC_LABEL: Record<FaqTopic, string> = {
  PRODUCT: 'Sản phẩm',
  ORDER: 'Đơn hàng',
  PAYMENT: 'Thanh toán',
  WARRANTY: 'Bảo hành',
  CUSTOMIZATION: 'Tùy biến/Thiết kế',
  MEMBERSHIP: 'Thành viên',
  APPOINTMENT: 'Lịch hẹn',
  OTHER: 'Khác',
};

@Component({
  selector: 'app-faq-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './faq-management.component.html',
  styleUrl: './faq-management.component.css',
})
export class FaqManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly topicLabel = TOPIC_LABEL;
  readonly topicOptions: FaqTopic[] = ['PRODUCT', 'ORDER', 'PAYMENT', 'WARRANTY', 'CUSTOMIZATION', 'MEMBERSHIP', 'APPOINTMENT', 'OTHER'];

  filterTopic   = signal('');
  filterSearch  = signal('');
  filterApplied = signal(false);
  private activeTopic  = '';
  private activeSearch = '';

  readonly isLoading = signal(true);
  readonly faqs = signal<AdminFaq[]>([]);
  readonly total = signal(0);
  currentPage = signal(1);
  readonly itemsPerPage = 8;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => getPageWindow(this.currentPage(), this.totalPages()));

  readonly isModalOpen = signal(false);
  readonly editingFaqId = signal<string | null>(null);
  readonly isSubmitting = signal(false);

  readonly faqForm = new FormGroup<FaqForm>({
    topic: new FormControl<FaqTopic>('PRODUCT', { nonNullable: true }),
    question: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    answer: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void { this.loadFaqs(); }

  loadFaqs(): void {
    this.isLoading.set(true);
    this.adminService.getFaqs({
      page: this.currentPage(), limit: this.itemsPerPage,
      topic: this.activeTopic || undefined, search: this.activeSearch || undefined,
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) { this.faqs.set(res.faqs); this.total.set(res.total); }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách FAQ.');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadFaqs();
  }

  applyFilters(): void {
    this.activeTopic = this.filterTopic();
    this.activeSearch = this.filterSearch();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadFaqs();
  }

  clearFilters(): void {
    this.filterTopic.set('');
    this.filterSearch.set('');
    this.activeTopic = '';
    this.activeSearch = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadFaqs();
  }

  openCreateModal(): void {
    this.editingFaqId.set(null);
    this.faqForm.reset({ topic: 'PRODUCT', question: '', answer: '' });
    this.isModalOpen.set(true);
  }

  openEditModal(faq: AdminFaq): void {
    this.editingFaqId.set(faq.faq_id);
    this.faqForm.reset({ topic: faq.topic, question: faq.question, answer: faq.answer });
    this.isModalOpen.set(true);
  }

  closeModal(): void { this.isModalOpen.set(false); }

  saveFaq(): void {
    if (this.faqForm.invalid) {
      this.notify.error('Vui lòng điền đầy đủ chủ đề, câu hỏi và câu trả lời.');
      return;
    }
    const payload: AdminFaqInput = this.faqForm.getRawValue();
    this.isSubmitting.set(true);
    const editingId = this.editingFaqId();
    const req$ = editingId ? this.adminService.updateFaq(editingId, payload) : this.adminService.createFaq(payload);
    req$.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.notify.success(editingId ? 'Cập nhật FAQ thành công! Chatbot sẽ dùng nội dung mới ngay.' : 'Tạo FAQ thành công! Chatbot sẽ dùng nội dung này ngay.');
        this.closeModal();
        this.loadFaqs();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.notify.error(err?.error?.message ?? 'Lưu FAQ thất bại.');
      },
    });
  }

  toggleActive(faq: AdminFaq): void {
    this.adminService.updateFaq(faq.faq_id, { isActive: !faq.is_active }).subscribe({
      next: () => {
        this.notify.success(faq.is_active ? 'Đã ẩn FAQ khỏi chatbot.' : 'Đã kích hoạt FAQ cho chatbot.');
        this.loadFaqs();
      },
      error: () => this.notify.error('Cập nhật trạng thái thất bại.'),
    });
  }
}
