import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  category: string;
  collection: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductDetail extends Product {
  description: string;
  material: string;
  sizes: number[];
  images: string[];
  inStock: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  // TODO: swap to → this.http.get<Product[]>('/api/products', { params: category ? { category } : {} })
  getProducts(category?: string): Observable<Product[]> {
    const filtered = category
      ? MOCK_PRODUCTS.filter((p) => p.category === category)
      : MOCK_PRODUCTS;
    return of(filtered);
  }

  // TODO: swap to → this.http.get<ProductDetail>(`/api/products/${id}`)
  getProductById(id: string): Observable<ProductDetail> {
    const found = MOCK_PRODUCT_DETAILS.find((p) => p.id === id);
    return of(found ?? MOCK_PRODUCT_DETAILS[0]);
  }
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', category: 'nhan', collection: 'HERITAGE COLLECTION', name: 'Nhẫn Kim Cương Solitaire', price: 24500000, imageUrl: '/images/product-nhan-kim-cuong-solitaire.png' },
  { id: '2', category: 'nhan', collection: 'ETERNAL LOVE', name: 'Nhẫn Eternal Love', price: 18900000, imageUrl: '/images/product-nhan-eternal-love.png' },
  { id: '3', category: 'nhan', collection: 'MODERN NOIR', name: 'Nhẫn Emerald Modernity', price: 42000000, imageUrl: '/images/product-nhan-emerald-modernity.png' },
  { id: '4', category: 'nhan', collection: 'PETITE GRACE', name: 'Nhẫn Rose Gold Sapphire', price: 12500000, imageUrl: '/images/product-nhan-rose-gold-sapphire.png' },
  { id: '5', category: 'nhan', collection: 'HERITAGE COLLECTION', name: 'Nhẫn Kim Cương Solitaire', price: 24500000, imageUrl: '/images/product-nhan-kim-cuong-solitaire.png' },
  { id: '6', category: 'nhan', collection: 'ETERNAL LOVE', name: 'Nhẫn Eternal Love', price: 18900000, imageUrl: '/images/product-nhan-eternal-love.png' },
  { id: '7', category: 'nhan', collection: 'MODERN NOIR', name: 'Nhẫn Emerald Modernity', price: 42000000, imageUrl: '/images/product-nhan-emerald-modernity.png' },
  { id: '8', category: 'nhan', collection: 'PETITE GRACE', name: 'Nhẫn Rose Gold Sapphire', price: 12500000, imageUrl: '/images/product-nhan-rose-gold-sapphire.png' },
  { id: '9', category: 'day-chuyen', collection: 'HERITAGE COLLECTION', name: 'Dây Chuyền Vàng 18K', price: 15800000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '10', category: 'day-chuyen', collection: 'ETERNAL LOVE', name: 'Dây Chuyền Moissanite', price: 22000000, imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '11', category: 'hoa-tai', collection: 'PETITE GRACE', name: 'Hoa Tai Kim Cương', price: 18500000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '12', category: 'hoa-tai', collection: 'MODERN NOIR', name: 'Hoa Tai Vàng Hồng', price: 9800000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '13', category: 'lac-tay', collection: 'HERITAGE COLLECTION', name: 'Lắc Tay Vàng Trắng', price: 28000000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '14', category: 'lac-tay', collection: 'ETERNAL LOVE', name: 'Vòng Tay Charm', price: 7500000, imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '15', category: 'charm', collection: 'PETITE GRACE', name: 'Charm Trái Tim', price: 3200000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '16', category: 'charm', collection: 'MODERN NOIR', name: 'Charm Bướm Vàng', price: 4100000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
];

const MOCK_PRODUCT_DETAILS: ProductDetail[] = [
  {
    id: '1',
    category: 'nhan',
    collection: 'BST HOÀNG GIA 2026',
    name: 'Nhẫn Kim Cương Aeterna',
    price: 85000000,
    imageUrl: '/images/product-detail-nhan-aeterna-1.png',
    description: 'Một minh chứng cho sự tinh xảo vượt thời gian, chiếc nhẫn RENGA mang viên kim cương cắt Brilliant 1.5 carat đặt giữa vòng hào quang pavé rực rỡ, được chế tác thủ công trên nền vàng trắng 18k chuẩn Ý.',
    material: 'Vàng Trắng 18K, Kim cương thiên nhiên',
    sizes: [10, 11, 12, 13],
    images: [
      '/images/product-detail-nhan-aeterna-1.png',
      '/images/product-detail-nhan-aeterna-2.png',
      '/images/product-detail-nhan-aeterna-3.png',
      '/images/product-detail-nhan-aeterna-4.png',
    ],
    inStock: true,
  },
  ...MOCK_PRODUCTS.slice(1).map((p) => ({
    ...p,
    description: 'Được chế tác tỉ mỉ từ những nguyên liệu quý giá nhất, sản phẩm RENGA là biểu tượng của sự sang trọng và tinh tế.',
    material: 'Vàng 18K',
    sizes: [10, 11, 12, 13],
    images: [p.imageUrl],
    inStock: true,
  })),
];
