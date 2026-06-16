import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

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

@Component({
  selector: 'app-warranty-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './warranty-management.component.html',
  styleUrl: './warranty-management.component.css'
})
export class WarrantyManagementComponent implements OnInit {
  // --- STATE (SIGNALS) ---
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
      productImage: 'https://picsum.photos/id/1015/200/200',
      customerName: 'Isabella Montgomery',
      customerEmail: 'isabella.m@email.com',
      description: 'Viên kim cương trung tâm...',
      status: 'pending',
      actionState: 'process',
      evidenceImages: ['https://picsum.photos/id/1027/300/300', 'https://picsum.photos/id/1035/300/300']
    },
    {
      id: 'WR-2024-0744',
      productId: '#WR-8830-2023',
      sku: 'SKU: WT-902-RC',
      productName: 'Celestial Chrono Rose',
      productImage: 'https://picsum.photos/id/175/200/200',
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
      productImage: 'https://picsum.photos/id/350/200/200',
      customerName: 'Eleanor Vance',
      customerEmail: 'evance@design.co',
      description: 'Mất mặt dây chuyền...',
      status: 'pending',
      actionState: 'process',
      evidenceImages: ['https://picsum.photos/id/1040/300/300']
    },
    {
      id: 'WR-2024-0650',
      productId: '#WR-8832-2023',
      sku: 'SKU: ER-442-EM',
      productName: 'Verdant Halo Drops',
      productImage: 'https://picsum.photos/id/152/200/200',
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
      productImage: 'https://picsum.photos/id/152/200/200',
      customerName: 'Maximilian Rossi',
      customerEmail: 'rossi@fi-tech.it',
      description: 'Rớt hạt ngọc nhỏ...',
      status: 'completed',
      actionState: 'delivered',
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

  ngOnInit(): void {}

  // --- METHODS ---
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
    
    // Đóng modal sau khi submit
    this.closeModal();
  }
}