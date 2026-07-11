import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AdminService, AdminQuestion, QaStats } from '../admin.service';
import { NotificationService } from '../../core/services/notification.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

type ReplyFormGroup = FormGroup<Record<string, FormControl<string>>>;
type Tab = 'pending' | 'replied' | 'hidden';

@Component({
  selector: 'app-qa-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe],
  templateUrl: './qa-management.component.html',
  styleUrl: './qa-management.component.css',
})
export class QaManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notify = inject(NotificationService);

  readonly currentTab = signal<Tab>('pending');
  readonly stats = signal<QaStats | null>(null);

  readonly isLoading = signal(true);
  readonly questions = signal<AdminQuestion[]>([]);
  readonly total = signal(0);
  readonly currentPage = signal(1);
  readonly itemsPerPage = 3;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => getPageWindow(this.currentPage(), this.totalPages()));

  readonly replyForm: ReplyFormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loadStats();
    this.loadQuestions();
  }

  private loadStats(): void {
    this.adminService.getQaStats().subscribe({
      next: (res) => { if (res.success) this.stats.set(res.data); },
      error: () => this.notify.error('Không tải được số liệu Hỏi-đáp.'),
    });
  }

  loadQuestions(): void {
    this.isLoading.set(true);
    this.adminService.getQuestions({
      page: this.currentPage(), limit: this.itemsPerPage, status: this.currentTab(),
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.questions.set(res.questions);
          this.total.set(res.total);
          this.rebuildReplyForm(res.questions);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.notify.error('Không tải được danh sách câu hỏi.');
      },
    });
  }

  private rebuildReplyForm(questions: AdminQuestion[]): void {
    for (const key of Object.keys(this.replyForm.controls)) this.replyForm.removeControl(key as never);
    for (const q of questions) {
      this.replyForm.addControl(q.question_id, new FormControl('', { nonNullable: true, validators: [Validators.required] }));
    }
  }

  changeTab(tab: Tab): void {
    this.currentTab.set(tab);
    this.currentPage.set(1);
    this.loadQuestions();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadQuestions();
  }

  submitReply(questionId: string): void {
    const control = this.replyForm.controls[questionId];
    if (!control?.valid || control.value.trim() === '') {
      this.notify.error('Vui lòng nhập câu trả lời!');
      return;
    }
    this.adminService.replyToQuestion(questionId, control.value.trim()).subscribe({
      next: () => {
        this.notify.success('Gửi phản hồi thành công!');
        this.loadStats();
        this.loadQuestions();
      },
      error: (err) => this.notify.error(err?.error?.message ?? 'Gửi phản hồi thất bại.'),
    });
  }

  hideQuestion(questionId: string): void {
    this.adminService.setQuestionVisibility(questionId, 'HIDDEN').subscribe({
      next: () => { this.notify.success('Ẩn câu hỏi thành công!'); this.loadStats(); this.loadQuestions(); },
      error: () => this.notify.error('Ẩn câu hỏi thất bại.'),
    });
  }

  unhideQuestion(questionId: string): void {
    this.adminService.setQuestionVisibility(questionId, 'VISIBLE').subscribe({
      next: () => { this.notify.success('Bỏ ẩn câu hỏi thành công!'); this.loadStats(); this.loadQuestions(); },
      error: () => this.notify.error('Bỏ ẩn câu hỏi thất bại.'),
    });
  }
}
