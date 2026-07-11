import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';
import { formatPrice } from '../../shared/utils/currency.util';
import { AdminService, AdminProduct, AdminCategory } from '../admin.service';
import { getPageWindow } from '../../shared/utils/pagination.util';

interface BespokeMaterial {
  name: string;
  priceDiff: number;
}

interface BespokeMold {
  id: string;
  label: string;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, AdminHeaderComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);

  activeTab = signal<'normal' | 'bespoke'>('normal');
  showAddModal = signal(false);
  filterCategory = signal('');
  filterStatus   = signal('');
  filterApplied  = signal(false);
  searchTerm     = signal('');

  isLoading = signal(false);

  // --- STATE TOAST ---
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  // --- STATE PHÂN TRANG (server-side) ---
  currentPage = signal(1);
  totalItems  = signal(0);
  readonly itemsPerPage = 5;

  products   = signal<AdminProduct[]>([]);
  categories = signal<AdminCategory[]>([]);

  get totalPages() { return Math.max(1, Math.ceil(this.totalItems() / this.itemsPerPage)); }
  get pageNumbers(): number[] { return getPageWindow(this.currentPage(), this.totalPages); }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe({
      next: (res) => this.categories.set(res.data),
      error: () => this.displayToast('Không tải được danh mục sản phẩm.', 'error'),
    });
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.adminService.getProducts({
      page: this.currentPage(),
      limit: this.itemsPerPage,
      search: this.searchTerm() || undefined,
      status: this.activeStatus || undefined,
      category: this.activeCategoryId || undefined,
    }).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.totalItems.set(res.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.displayToast('Không tải được danh sách sản phẩm.', 'error');
      },
    });
  }

  private activeCategoryId = '';
  private activeStatus = '';

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
      this.loadProducts();
    }
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.loadProducts();
  }

  editingProduct = signal<AdminProduct | null>(null);

  /* ── Form state ── */
  newName       = signal('');
  newCategoryId = signal('');
  newMaterial   = signal('Vàng 18K');
  newPrice      = signal(0);
  newDesc       = signal('');
  newStock      = signal(0);
  newImageUrl   = signal('');

  bespokeEnabled  = signal(false);
  bespokeLimit    = signal(20);
  bespokeMolds    = signal<BespokeMold[]>([
    { id: '01', label: 'Phôi Nhẫn #01' },
    { id: '04', label: 'Phôi Nhẫn #04' },
  ]);
  bespokeMaterials = signal<BespokeMaterial[]>([
    { name: 'Vàng 18K',    priceDiff: 2500000 },
    { name: 'Vàng Trắng',  priceDiff: 0 },
  ]);
  bespokeStones = signal<BespokeMaterial[]>([
    { name: 'Kim cương tấm 2ly',  priceDiff: 2500000 },
    { name: 'Đá Moissanite 5ly',  priceDiff: 0 },
  ]);

  // --- ẨN/HIỆN SẢN PHẨM (status ACTIVE <-> INACTIVE thật) ---
  toggleVisibility(product: AdminProduct) {
    const nextStatus = product.status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE';
    this.adminService.updateProduct(product.product_id, { status: nextStatus }).subscribe({
      next: () => {
        this.displayToast(`${nextStatus === 'INACTIVE' ? 'Ẩn' : 'Hiện'} sản phẩm thành công!`, 'success');
        this.loadProducts();
      },
      error: () => this.displayToast('Không thể cập nhật trạng thái sản phẩm.', 'error'),
    });
  }

  // --- LOGIC TOAST MESSAGE ---
  private displayToast(message: string, type: 'success' | 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  openAddModal() {
    this.resetForm();
    this.editingProduct.set(null);
    this.showAddModal.set(true);
  }

  openEditModal(product: AdminProduct) {
    if (product.status === 'INACTIVE') return; // Chặn edit khi đang bị ẩn
    this.newName.set(product.product_name);
    this.newPrice.set(product.base_price);
    this.newImageUrl.set(product.image_url ?? '');
    this.newStock.set(product.stock);
    const cat = this.categories().find(c => c.category_name === product.category_name);
    this.newCategoryId.set(cat?.category_id ?? '');
    this.editingProduct.set(product);
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
    this.editingProduct.set(null);
    this.resetForm();
  }

  // --- LƯU SẢN PHẨM (API thật) ---
  saveProduct(status: 'ACTIVE' | 'INACTIVE') {
    if (!this.newName().trim() || this.newPrice() <= 0 || !this.newCategoryId()) {
      this.displayToast('Vui lòng điền đủ thông tin (tên, giá, danh mục)!', 'error');
      return;
    }

    const description = this.newMaterial() ? `CHẤT LIỆU: ${this.newMaterial()}` : undefined;
    const editing = this.editingProduct();

    if (editing) {
      this.adminService.updateProduct(editing.product_id, {
        category_id:  this.newCategoryId(),
        product_name: this.newName(),
        description,
        base_price:   this.newPrice(),
        status,
      }).subscribe({
        next: () => {
          this.displayToast('Lưu thay đổi thành công!', 'success');
          this.closeAddModal();
          this.loadProducts();
        },
        error: () => this.displayToast('Không thể lưu sản phẩm.', 'error'),
      });
    } else {
      this.adminService.createProduct({
        category_id:  this.newCategoryId(),
        product_name: this.newName(),
        description,
        base_price:   this.newPrice(),
        status,
        image_url:    this.newImageUrl() || undefined,
        variant: {
          variant_name: this.newName(),
          price:         this.newPrice(),
          stock_quantity: this.newStock(),
        },
      }).subscribe({
        next: () => {
          this.displayToast(`Lưu ${status === 'ACTIVE' ? 'công khai' : 'nháp'} thành công!`, 'success');
          this.closeAddModal();
          this.loadProducts();
        },
        error: () => this.displayToast('Không thể tạo sản phẩm.', 'error'),
      });
    }
  }

  private resetForm() {
    this.newName.set('');
    this.newCategoryId.set('');
    this.newMaterial.set('Vàng 18K');
    this.newPrice.set(0);
    this.newDesc.set('');
    this.newStock.set(0);
    this.newImageUrl.set('');
    this.bespokeEnabled.set(false);
  }

  onPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\./g, '').replace(/[^\d]/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    this.newPrice.set(num);
    input.value = num ? num.toLocaleString('vi-VN') : '';
  }

  applyFilters() {
    this.activeCategoryId = this.filterCategory();
    this.activeStatus = this.filterStatus();
    this.filterApplied.set(true);
    this.currentPage.set(1);
    this.loadProducts();
  }

  clearFilters() {
    this.filterCategory.set('');
    this.filterStatus.set('');
    this.searchTerm.set('');
    this.activeCategoryId = '';
    this.activeStatus = '';
    this.filterApplied.set(false);
    this.currentPage.set(1);
    this.loadProducts();
  }

  removeMold(id: string) {
    this.bespokeMolds.update(list => list.filter(m => m.id !== id));
  }
  removeMaterial(i: number) {
    this.bespokeMaterials.update(list => list.filter((_, idx) => idx !== i));
  }
  removeStone(i: number) {
    this.bespokeStones.update(list => list.filter((_, idx) => idx !== i));
  }

  readonly formatPrice = formatPrice;
}
