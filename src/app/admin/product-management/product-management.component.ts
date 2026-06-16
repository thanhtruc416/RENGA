import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../admin-layout/admin-header.component';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  material: string;
  price: number;
  stock: number;
  status: 'active' | 'out-of-stock' | 'draft';
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
  filterStatus = signal('');
  currentPage = signal(1);
  totalItems = 24;

  products = signal<Product[]>([
    { id: 'JWL-001', name: 'Serpentine Diamond Ring',  imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: '18K White Gold', price: 4000000, stock: 12, status: 'active' },
    { id: 'JWL-001', name: 'Serpentine Diamond',       imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Vòng cổ', material: '18K White Gold', price: 4000000, stock: 0,  status: 'out-of-stock' },
    { id: 'JWL-001', name: 'Serpentine Diamond Ring',  imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: '18K White Gold', price: 4000000, stock: 12, status: 'active' },
    { id: 'JWL-001', name: 'Serpentine Diamond Ring',  imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: '18K White Gold', price: 4000000, stock: 12, status: 'active' },
    { id: 'JWL-001', name: 'Serpentine Diamond Ring',  imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png', category: 'Nhẫn',    material: '18K White Gold', price: 4000000, stock: 12, status: 'active' },
  ]);

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

  openAddModal() {
    this.resetForm();
    this.editingProduct.set(null);
    this.showAddModal.set(true);
  }

  openEditModal(product: Product) {
    this.newName.set(product.name);
    this.newCategory.set(product.category);
    this.newMaterial.set(product.material);
    this.newPrice.set(product.price);
    this.newStock.set(product.stock);
    this.editingProduct.set(product);
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
    this.editingProduct.set(null);
    this.resetForm();
  }

  saveProduct() {
    const editing = this.editingProduct();
    if (editing) {
      this.products.update(list =>
        list.map(p => p === editing
          ? { ...p, name: this.newName(), category: this.newCategory(), material: this.newMaterial(), price: this.newPrice(), stock: this.newStock() }
          : p
        )
      );
    } else {
      const next: Product = {
        id: `JWL-${String(this.products().length + 1).padStart(3, '0')}`,
        name: this.newName(),
        imageUrl: 'assets/fb5bb58e3e5f9c8520c4c858877baa6ffc50afac.png',
        category: this.newCategory(),
        material: this.newMaterial(),
        price: this.newPrice(),
        stock: this.newStock(),
        status: 'active',
      };
      this.products.update(list => [...list, next]);
    }
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
  }

  clearFilters() {
    this.filterCategory.set('');
    this.filterMaterial.set('');
    this.filterStatus.set('');
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

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN');
  }

  get totalPages() { return Math.ceil(this.totalItems / 5); }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage.set(page);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
