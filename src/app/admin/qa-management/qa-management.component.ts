import { ChangeDetectionStrategy, Component, OnInit,computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

// --- INTERFACES (Khai báo chuẩn strict type, không dùng any) ---
export interface QaStat {
  readonly id: string;
  readonly label: string;
  readonly value: string | number;
  readonly subtext?: string;
  readonly isWarning?: boolean;
}

export interface QaQuestion {
  readonly id: string;
  readonly customer: {
    readonly name: string;
    readonly type: string;
    readonly avatarUrl: string;
  };
  readonly product: {
    readonly name: string;
    readonly imageUrl: string;
  };
  readonly date: string;
  readonly questionText: string;
  readonly status: 'pending' | 'replied' | 'hidden';
}

// --- TYPE CHO FORM ---
type ReplyFormGroup = FormGroup<Record<string, FormControl<string>>>;

@Component({
  selector: 'app-qa-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // Bắt buộc theo Rule
  imports: [ReactiveFormsModule, DatePipe], // Bổ sung module Form và Pipe format ngày tháng
  templateUrl: './qa-management.component.html',
  styleUrl: './qa-management.component.css',
})
export class QaManagementComponent implements OnInit {
  // --- STATE (SIGNALS) ---
  readonly currentTab = signal<'pending' | 'replied' | 'hidden'>('pending');
  
  readonly showToast = signal<boolean>(false);
  readonly toastMessage = signal<string>('');
  readonly toastType = signal<'success' | 'error'>('success');

  readonly currentPage = signal<number>(1);
  readonly itemsPerPage = 3;
  readonly stats = signal<QaStat[]>([
    { id: 'reply-rate', label: 'Tỷ lệ phản hồi', value: '85%', subtext: '+2% tuần này' },
    { id: 'new-questions', label: 'Câu hỏi mới (24h)', value: 24, isWarning: true },
    { id: 'avg-time', label: 'Thời gian phản hồi TB', value: '2.4h' },
    { id: 'invalid-questions', label: 'Số câu hỏi không hợp lệ', value: 5, isWarning: true },
  ]);

  // Mock data theo giao diện prototype (Tạm dùng ảnh placeholder để bạn dễ test)
  readonly questions = signal<QaQuestion[]>([
    {
      id: 'q1',
      customer: { name: 'Nguyễn Thu Thủy', type: 'KHÁCH HÀNG DIAMOND', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      product: { name: 'Dây chuyền Kim cương Eternal Glow 18k', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-20T14:30:00',
      questionText: 'Dây chuyền này có thể thay đổi độ dài không?',
      status: 'pending'
    },
    {
      id: 'q2',
      customer: { name: 'Trần Minh Quân', type: 'KHÁCH HÀNG MỚI', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      product: { name: 'Đồng hồ Classic Heritage Edition', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-20T12:15:00',
      questionText: 'Sản phẩm có đi kèm hộp quà và giấy chứng nhận không?',
      status: 'pending'
    },
    {
      id: 'q3',
      customer: { name: 'Lê Bảo Ngọc', type: 'KHÁCH HÀNG VIP', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      product: { name: 'Bông tai Vàng 24k Royal Bloom', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-19T18:05:00',
      questionText: 'Bông tai này có phiên bản vàng trắng không ạ?',
      status: 'pending'
    },
    {
      id: 'q4',
      customer: { name: 'Lê Bảo Ngọc', type: 'KHÁCH HÀNG VIP', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      product: { name: 'Bông tai Vàng 24k Royal Bloom', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-19T18:05:00',
      questionText: 'Bông tai này có phiên bản vàng trắng không ạ?',
      status: 'pending'
    },
    {
      id: 'q5',
      customer: { name: 'Lê Bảo Ngọc', type: 'KHÁCH HÀNG VIP', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      product: { name: 'Bông tai Vàng 24k Royal Bloom', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-19T18:05:00',
      questionText: 'Bông tai này có phiên bản vàng trắng không ạ?',
      status: 'pending'
    },
    {
      id: 'q6',
      customer: { name: 'Lê Bảo Ngọc', type: 'KHÁCH HÀNG VIP', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      product: { name: 'Bông tai Vàng 24k Royal Bloom', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-19T18:05:00',
      questionText: 'Bông tai này có phiên bản vàng trắng không ạ?',
      status: 'pending'
    },
    {
      id: 'q7',
      customer: { name: 'Lê Bảo Ngọc', type: 'KHÁCH HÀNG VIP', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      product: { name: 'Bông tai Vàng 24k Royal Bloom', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-19T18:05:00',
      questionText: 'Bông tai này có phiên bản vàng trắng không ạ?',
      status: 'pending'
    },
    {
      id: 'q8',
      customer: { name: 'Lê Bảo Ngọc', type: 'KHÁCH HÀNG VIP', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
      product: { name: 'Bông tai Vàng 24k Royal Bloom', imageUrl: 'assets/c040d6bc93557f0e266c8b36718f36c93e724bfb.png' },
      date: '2023-10-19T18:05:00',
      questionText: 'Bông tai này có phiên bản vàng trắng không ạ?',
      status: 'pending'
    }
  ]);
readonly filteredQuestions = computed(() => {
    return this.questions().filter(q => q.status === this.currentTab());
  });

  readonly totalItems = computed(() => this.filteredQuestions().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.itemsPerPage)));
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly paginatedQuestions = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredQuestions().slice(startIndex, startIndex + this.itemsPerPage);
  });

  readonly pendingCount = computed(() => this.questions().filter(q => q.status === 'pending').length);
  readonly repliedCount = computed(() => this.questions().filter(q => q.status === 'replied').length);
  readonly hiddenCount = computed(() => this.questions().filter(q => q.status === 'hidden').length);
  
  // Khởi tạo Form typed rõ ràng theo rule
  readonly replyForm: ReplyFormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initFormControls();
  }

  // Khởi tạo FormControl cho từng câu hỏi độc lập
  private initFormControls(): void {
    const questionsList = this.questions();
    questionsList.forEach(q => {
      this.replyForm.addControl(
        q.id, 
        new FormControl('', { nonNullable: true, validators: [Validators.required] })
      );
    });
  }

  // --- METHODS ---
  changeTab(tab: 'pending' | 'replied' | 'hidden'): void {
    this.currentTab.set(tab);
  }

   goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
  submitReply(questionId: string): void {
    const control = this.replyForm.controls[questionId];
    
    if (control?.valid && control.value.trim() !== '') {
      console.log(`Đã trả lời câu ${questionId} với nội dung:`, control.value);
      
      // Cập nhật trạng thái câu hỏi thành 'replied'
      this.questions.update(qs => 
        qs.map(q => q.id === questionId ? { ...q, status: 'replied' } : q)
      );
      
      control.reset(); 
      this.displayToast('Gửi phản hồi thành công!', 'success');
    } else {
      this.displayToast('Vui lòng nhập câu trả lời!', 'error');
    }
  }

  hideQuestion(questionId: string): void {
    console.log(`Đã ẩn câu hỏi ID: ${questionId}`);
    
    // Cập nhật trạng thái câu hỏi thành 'hidden'
    this.questions.update(qs => 
      qs.map(q => q.id === questionId ? { ...q, status: 'hidden' } : q)
    );

    this.displayToast('Ẩn câu hỏi thành công!', 'success');
  }

  private displayToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}