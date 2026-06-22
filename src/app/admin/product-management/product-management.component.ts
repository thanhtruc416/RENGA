import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';
import { formatPrice } from '../../shared/utils/currency.util';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  material: string;
  price: number;
  stock: number;
  status: 'active' | 'out-of-stock' | 'draft';
  isHidden?: boolean; // Đã thêm để ẩn hiện
}

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
export class ProductManagementComponent {
  activeTab = signal<'normal' | 'bespoke'>('normal');
  showAddModal = signal(false);
  filterCategory = signal('');
  filterMaterial = signal('');
  filterStatus   = signal('');
  filterApplied  = signal(false);
  
  activeCategory = signal('');
  activeMaterial = signal('');
  activeStatus   = signal('');

  // --- STATE UPLOAD ẢNH VÀ TOAST ---
  uploadedImage = signal<string | null>(null);
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  // --- STATE PHÂN TRANG ---
  currentPage = signal(1);
  readonly itemsPerPage = 5;

  products = signal<Product[]>([
    { id: 'JWL-001', name: 'Serpentine Diamond Ring',     imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: 'Vàng 18K',   price: 4200000, stock: 12, status: 'active' },
    { id: 'JWL-002', name: 'Celestial Diamond Necklace',  imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Vòng cổ', material: 'Vàng Trắng', price: 6800000, stock: 0,  status: 'out-of-stock' },
    { id: 'JWL-003', name: 'Aurora Stud Earrings',        imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Bông tai', material: 'Bạc',        price: 1500000, stock: 25, status: 'active' },
    { id: 'JWL-004', name: 'Luna Bangle',                 imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Vòng tay', material: 'Vàng 18K',   price: 3500000, stock: 8,  status: 'draft' },
    { id: 'JWL-005', name: 'Rose Petal Ring',             imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: 'Vàng Trắng', price: 2900000, stock: 0,  status: 'out-of-stock' },
    { id: 'JWL-006', name: 'Ocean Blue Sapphire Ring',    imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: 'Vàng Trắng', price: 8500000, stock: 3,  status: 'active' },
  ]);
  
  readonly filteredProducts = computed(() => {
    const cat    = this.activeCategory();
    const mat    = this.activeMaterial();
    const status = this.activeStatus();
    if (!cat && !mat && !status) return this.products();
    return this.products().filter(p => {
      if (cat    && p.category !== cat)    return false;
      if (mat    && p.material !== mat)    return false;
      if (status && p.status  !== status)  return false;
      return true;
    });
  });

  // --- LOGIC PHÂN TRANG ---
  readonly paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredProducts().slice(start, start + this.itemsPerPage);
  });

  get totalItems() { return this.filteredProducts().length; }
  get totalPages() { return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage)); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage.set(page);
  }

  editingProduct = signal<Product | null>(null);

  /* ── Form state ── */
  newName     = signal('');
  newCategory = signal('Nhẫn');
  newMaterial = signal('Vàng 18K');
  newPrice    = signal(0);
  newDesc     = signal('');
  newStock    = signal(0);

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

  // --- LOGIC ẨN/HIỆN SẢN PHẨM ---
  toggleVisibility(product: Product) {
    this.products.update(list => list.map(p => 
      p.id === product.id ? { ...p, isHidden: !p.isHidden } : p
    ));
    this.displayToast(`${product.isHidden ? 'Hiện' : 'Ẩn'} sản phẩm thành công!`, 'success');
  }

  // --- LOGIC UPLOAD ẢNH ---
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.displayToast('File quá lớn. Vui lòng chọn ảnh dưới 10MB!', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => this.uploadedImage.set(e.target?.result as string);
      reader.readAsDataURL(file);
    }
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

  openEditModal(product: Product) {
    if (product.isHidden) return; // Chặn edit khi row đang bị ẩn
    this.newName.set(product.name);
    this.newCategory.set(product.category);
    this.newMaterial.set(product.material);
    this.newPrice.set(product.price);
    this.newStock.set(product.stock);
    this.uploadedImage.set(product.imageUrl); // Load ảnh cũ lên preview
    this.editingProduct.set(product);
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
    this.editingProduct.set(null);
    this.resetForm();
  }

  // --- LOGIC LƯU SẢN PHẨM CÓ VALIDATE ---
  saveProduct(status: 'active' | 'draft') {
    // 1. Kiểm tra validate
    if (!this.newName().trim() || this.newPrice() <= 0 || !this.uploadedImage()) {
      this.displayToast('Vui lòng điền đủ thông tin và tải ảnh lên!', 'error');
      return;
    }

    const editing = this.editingProduct();
    const finalImage = this.uploadedImage() as string;

    if (editing) {
      this.products.update(list =>
        list.map(p => p === editing
          ? { ...p, name: this.newName(), category: this.newCategory(), material: this.newMaterial(), price: this.newPrice(), stock: this.newStock(), imageUrl: finalImage, status: status }
          : p
        )
      );
    } else {
      const next: Product = {
        id: `JWL-${String(this.products().length + 1).padStart(3, '0')}`,
        name: this.newName(),
        imageUrl: finalImage,
        category: this.newCategory(),
        material: this.newMaterial(),
        price: this.newPrice(),
        stock: this.newStock(),
        status: status,
      };
      this.products.update(list => [next, ...list]); // Thêm lên đầu danh sách
    }
    
    this.displayToast(`Lưu ${status === 'active' ? 'công khai' : 'nháp'} thành công!`, 'success');
    this.closeAddModal();
  }

  private resetForm() {
    this.newName.set('');
    this.newCategory.set('Nhẫn');
    this.newMaterial.set('Vàng 18K');
    this.newPrice.set(0);
    this.newDesc.set('');
    this.newStock.set(0);
    this.bespokeEnabled.set(false);
    this.uploadedImage.set(null); // Xóa ảnh preview
  }

  onPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\./g, '').replace(/[^\d]/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    this.newPrice.set(num);
    input.value = num ? num.toLocaleString('vi-VN') : '';
  }

  applyFilters() {
    this.activeCategory.set(this.filterCategory());
    this.activeMaterial.set(this.filterMaterial());
    this.activeStatus.set(this.filterStatus());
    this.filterApplied.set(true);
    this.currentPage.set(1);
  }

  clearFilters() {
    this.filterCategory.set('');
    this.filterMaterial.set('');
    this.filterStatus.set('');
    this.activeCategory.set('');
    this.activeMaterial.set('');
    this.activeStatus.set('');
    this.filterApplied.set(false);
    this.currentPage.set(1);
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