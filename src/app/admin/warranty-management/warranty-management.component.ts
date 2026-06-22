import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// --- INTERFACES ---
export interface WarrantyStat {
  readonly id: string;
  readonly label: string;
  readonly value: string | number;
  readonly subtext?: string;
}

export interface WarrantyRequest {
  readonly id: string; // VD: WR-2024-0892
  readonly productId: string; // VD: #WR-8829-2023 (Dùng cho modal)
  readonly sku: string;
  readonly productName: string;
  readonly productImage: string;
  readonly customerName: string;
  readonly customerEmail: string;
  readonly description: string;
  readonly status: 'pending' | 'repairing' | 'completed';
  readonly actionState: 'process' | 'view' | 'delivered';
  readonly evidenceImages: string[];
}

// --- TYPE CHO FORM ---
interface WarrantyProcessForm {
  repairItems: FormControl<string>;
  estimatedCost: FormControl<string>;
  estimatedTime: FormControl<string>;
  freeReason: FormControl<string>;
}
interface CreateWarrantyForm {
  orderCode: FormControl<string>;
  repairItems: FormControl<string>;
  estimatedCost: FormControl<string>;
  estimatedTime: FormControl<string>;
  freeReason: FormControl<string>;
}
@Component({
  selector: 'app-warranty-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './warranty-management.component.html',
  styleUrl: './warranty-management.component.css'
})
export class WarrantyManagementComponent implements OnInit {
  // --- STATE (SIGNALS) ---
  filterCategory = signal('');
  filterStatus   = signal('');
  filterApplied  = signal(false);
  activeCategory = signal('');
  activeStatus   = signal('');

  readonly stats = signal<WarrantyStat[]>([
    { id: 'received', label: 'YÊU CẦU ĐÃ NHẬN', value: 24 },
    { id: 'avg-time', label: 'THỜI GIAN SỬA CHỮA TB', value: '5.2 Days', subtext: '↑ 0.4 So với tháng trước' },
    { id: 'quote-sent', label: 'BÁO GIÁ ĐÃ GỬI', value: 18, subtext: 'Chờ phản hồi: 4' },
    { id: 'rating', label: 'ĐÁNH GIÁ', value: '4.9/5.0' },
  ]);

  // Mock data danh sách bảo hành
  readonly requests = signal<WarrantyRequest[]>([
    {
      id: 'WR-2024-0892',
      productId: '#WR-8829-2023',
      sku: 'SKU: JM-7721-D',
      productName: 'Solitaire Grace Ring',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Isabella Montgomery',
      customerEmail: 'isabella.m@email.com',
      description: 'Viên kim cương trung tâm...',
      status: 'pending',
      actionState: 'process',
      evidenceImages: ['assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png']
    },
    {
      id: 'WR-2024-0744',
      productId: '#WR-8830-2023',
      sku: 'SKU: WT-902-RC',
      productName: 'Celestial Chrono Rose',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'SebastianThorne',
      customerEmail: 's.thorne@luxury.uk',
      description: 'Đánh bóng...',
      status: 'repairing',
      actionState: 'view',
      evidenceImages: []
    },
    {
      id: 'WR-2024-0912',
      productId: '#WR-8831-2023',
      sku: 'SKU: NC-115-TP',
      productName: 'Lumina Pearl Strand',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Eleanor Vance',
      customerEmail: 'evance@design.co',
      description: 'Mất mặt dây chuyền...',
      status: 'pending',
      actionState: 'process',
      evidenceImages: ['assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png']
    },
    {
      id: 'WR-2024-0650',
      productId: '#WR-8832-2023',
      sku: 'SKU: ER-442-EM',
      productName: 'Verdant Halo Drops',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Maximilian Rossi',
      customerEmail: 'rossi@fi-tech.it',
      description: 'Rớt hạt ngọc nhỏ...',
      status: 'completed',
      actionState: 'delivered',
      evidenceImages: []
    },
    {
      id: 'WR-2024-0650',
      productId: '#WR-8832-2023',
      sku: 'SKU: ER-442-EM',
      productName: 'Verdant Halo Drops',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Maximilian Rossi',
      customerEmail: 'rossi@fi-tech.it',
      description: 'Rớt hạt ngọc nhỏ...',
      status: 'completed',
      actionState: 'delivered',
      evidenceImages: []
    },
    {
      id: 'WR-2024-0650',
      productId: '#WR-8832-2023',
      sku: 'SKU: ER-442-EM',
      productName: 'Verdant Halo Drops',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Maximilian Rossi',
      customerEmail: 'rossi@fi-tech.it',
      description: 'Rớt hạt ngọc nhỏ...',
      status: 'completed',
      actionState: 'delivered',
      evidenceImages: []
    },
    {
      id: 'WR-2024-0650',
      productId: '#WR-8832-2023',
      sku: 'SKU: ER-442-EM',
      productName: 'Verdant Halo Drops',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Maximilian Rossi',
      customerEmail: 'rossi@fi-tech.it',
      description: 'Rớt hạt ngọc nhỏ...',
      status: 'completed',
      actionState: 'delivered',
      evidenceImages: []
    },
    {
      id: 'WR-2024-0650',
      productId: '#WR-8832-2023',
      sku: 'SKU: ER-442-EM',
      productName: 'Verdant Halo Drops',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Maximilian Rossi',
      customerEmail: 'rossi@fi-tech.it',
      description: 'Rớt hạt ngọc nhỏ...',
      status: 'completed',
      actionState: 'delivered',
      evidenceImages: []
    },
    {
      id: 'WR-2024-0892',
      productId: '#WR-8829-2023',
      sku: 'SKU: JM-7721-D',
      productName: 'Solitaire Grace Ring',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'Isabella Montgomery',
      customerEmail: 'isabella.m@email.com',
      description: 'Viên kim cương trung tâm...',
      status: 'pending',
      actionState: 'process',
      evidenceImages: ['assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png']
    },
    {
      id: 'WR-2024-0744',
      productId: '#WR-8830-2023',
      sku: 'SKU: WT-902-RC',
      productName: 'Celestial Chrono Rose',
      productImage: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
      customerName: 'SebastianThorne',
      customerEmail: 's.thorne@luxury.uk',
      description: 'Đánh bóng...',
      status: 'repairing',
      actionState: 'view',
      evidenceImages: []
    }
  ]);

  // --- STATE CHO MODAL ---
  readonly selectedRequest = signal<WarrantyRequest | null>(null);
  readonly modalTab = signal<'quote' | 'free'>('quote');

  // Khởi tạo Form
  readonly processForm = new FormGroup<WarrantyProcessForm>({
    repairItems: new FormControl('', { nonNullable: true }),
    estimatedCost: new FormControl('', { nonNullable: true }),
    estimatedTime: new FormControl('', { nonNullable: true }),
    freeReason: new FormControl('', { nonNullable: true })
  });

  // --- STATE MODAL TẠO MỚI ---
  readonly isCreateModalOpen = signal(false);
  readonly createModalTab = signal<'quote' | 'free'>('quote');

  readonly createForm = new FormGroup<CreateWarrantyForm>({
    orderCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    repairItems: new FormControl('', { nonNullable: true }),
    estimatedCost: new FormControl('', { nonNullable: true }),
    estimatedTime: new FormControl('', { nonNullable: true }),
    freeReason: new FormControl('', { nonNullable: true })
  });

  readonly uploadedImages = signal<string[]>([]);
  // --- STATE PHÂN TRANG ---
  currentPage = signal(1);
  readonly itemsPerPage = 5;

  // --- STATE MODAL XEM CHI TIẾT ---
  readonly viewingRequest = signal<WarrantyRequest | null>(null);

  // Tổng số items sau khi lọc
  readonly totalFilteredRequests = computed(() => {
    const cat    = this.activeCategory();
    const status = this.activeStatus();
    if (!cat && !status) return this.requests();
    return this.requests().filter(r => {
      if (cat    && r.sku.toLowerCase().indexOf(cat.toLowerCase()) === -1
                 && r.productName.toLowerCase().indexOf(cat.toLowerCase()) === -1) return false;
      if (status && r.status !== status) return false;
      return true;
    });
  });

  // Items hiển thị trên trang hiện tại
  readonly paginatedRequests = computed(() => {
    const all = this.totalFilteredRequests();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return all.slice(start, start + this.itemsPerPage);
  });

  // Tính toán số trang
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalFilteredRequests().length / this.itemsPerPage)));
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  ngOnInit(): void {}

  // --- METHODS ---
  applyFilters(): void {
    this.activeCategory.set(this.filterCategory());
    this.activeStatus.set(this.filterStatus());
    this.filterApplied.set(true);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.filterCategory.set('');
    this.filterStatus.set('');
    this.activeCategory.set('');
    this.activeStatus.set('');
    this.filterApplied.set(false);
    this.currentPage.set(1);
  }

  openViewModal(request: WarrantyRequest): void {
    this.viewingRequest.set(request);
  }

  closeViewModal(): void {
    this.viewingRequest.set(null);
  }

  openModal(request: WarrantyRequest): void {
    if (request.actionState === 'process') {
      this.selectedRequest.set(request);
      this.modalTab.set('quote');
      this.processForm.reset();
    }
  }

  closeModal(): void {
    this.selectedRequest.set(null);
    
  }

  switchTab(tab: 'quote' | 'free'): void {
    this.modalTab.set(tab);
  }

  submitProcess(): void {
    const currentTab = this.modalTab();
    if (currentTab === 'quote') {
      console.log('Gửi báo giá:', {
        items: this.processForm.controls.repairItems.value,
        cost: this.processForm.controls.estimatedCost.value,
        time: this.processForm.controls.estimatedTime.value
      });
    } else {
      console.log('Xác nhận miễn phí, lý do:', this.processForm.controls.freeReason.value);
    }
    
    this.showToast('Cập nhật trạng thái thành công!', 'success');
    this.closeModal();
  }

  openCreateModal(): void {
    this.isCreateModalOpen.set(true);
    this.createModalTab.set('quote');
    this.createForm.reset();
    this.uploadedImages.set([]);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  switchCreateTab(tab: 'quote' | 'free'): void {
    this.createModalTab.set(tab);
  }

  submitCreate(): void {
    if (this.createForm.invalid) {
      this.showToast('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
      return;
    }
    // Logic gọi API tạo mới...
    
    this.showToast('Cập nhật trạng thái thành công!', 'success');
    this.closeCreateModal();
  }
  // --- STATE TOAST MESSAGE ---
  readonly toastConfig = signal<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastConfig.set({ show: true, message, type });
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      this.toastConfig.update(prev => ({ ...prev, show: false }));
    }, 3000);
  }
  // --- LOGIC UPLOAD ẢNH CHO MODAL TẠO MỚI ---
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      files.forEach(file => {
        // Chặn file > 10MB
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} quá lớn. Vui lòng chọn file dưới 10MB!`);
          return;
        }
        
        // Đọc file thành base64 để hiển thị ra màn hình
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          this.uploadedImages.update(imgs => [...imgs, base64]);
        };
        reader.readAsDataURL(file);
      });
    }
    // Cho phép chọn lại đúng cái ảnh vừa bị xóa
    input.value = '';
  }

  removeImage(index: number): void {
    // Xóa ảnh khỏi mảng dựa vào số thứ tự
    this.uploadedImages.update(imgs => imgs.filter((_, i) => i !== index));
  }
}

