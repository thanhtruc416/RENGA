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
  // ── Nhẫn (12 sản phẩm) ──────────────────────────────────────────────────
  { id: '1',  category: 'nhan', collection: 'HERITAGE COLLECTION', name: 'Nhẫn Kim Cương Solitaire',    price: 24500000, imageUrl: '/images/product-nhan-kim-cuong-solitaire.png' },
  { id: '2',  category: 'nhan', collection: 'ETERNAL LOVE',        name: 'Nhẫn Eternal Love',           price: 18900000, imageUrl: '/images/product-nhan-eternal-love.png' },
  { id: '3',  category: 'nhan', collection: 'MODERN NOIR',         name: 'Nhẫn Emerald Modernity',      price: 42000000, imageUrl: '/images/product-nhan-emerald-modernity.png' },
  { id: '4',  category: 'nhan', collection: 'PETITE GRACE',        name: 'Nhẫn Rose Gold Sapphire',     price: 12500000, imageUrl: '/images/product-nhan-rose-gold-sapphire.png' },
  { id: '5',  category: 'nhan', collection: 'ROYAL INSIGNIA',      name: 'Nhẫn Vàng 18K Pavé',          price: 31000000, imageUrl: '/images/product-nhan-kim-cuong-solitaire.png' },
  { id: '6',  category: 'nhan', collection: 'CELESTIAL',           name: 'Nhẫn Bạch Kim Ruby',          price: 38500000, imageUrl: '/images/product-nhan-eternal-love.png' },
  { id: '7',  category: 'nhan', collection: 'MODERN NOIR',         name: 'Nhẫn Halo Kim Cương',         price: 55000000, imageUrl: '/images/product-nhan-emerald-modernity.png' },
  { id: '8',  category: 'nhan', collection: 'PETITE GRACE',        name: 'Nhẫn Đính Hôn Moissanite',   price: 16800000, imageUrl: '/images/product-nhan-rose-gold-sapphire.png' },
  { id: '9',  category: 'nhan', collection: 'HERITAGE COLLECTION', name: 'Nhẫn Signet Vàng 24K',        price: 28000000, imageUrl: '/images/product-nhan-kim-cuong-solitaire.png' },
  { id: '10', category: 'nhan', collection: 'ETERNAL LOVE',        name: 'Nhẫn Đôi Sapphire',           price: 21000000, imageUrl: '/images/product-nhan-eternal-love.png' },
  { id: '11', category: 'nhan', collection: 'CELESTIAL',           name: 'Nhẫn Ngọc Trai Akoya',        price: 14200000, imageUrl: '/images/product-nhan-rose-gold-sapphire.png' },
  { id: '12', category: 'nhan', collection: 'ROYAL INSIGNIA',      name: 'Nhẫn Vintage Kim Cương Xanh', price: 67000000, imageUrl: '/images/product-nhan-emerald-modernity.png' },

  // ── Dây chuyền (10 sản phẩm) ────────────────────────────────────────────
  { id: '13', category: 'day-chuyen', collection: 'HERITAGE COLLECTION', name: 'Dây Chuyền Vàng 18K',          price: 15800000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '14', category: 'day-chuyen', collection: 'ETERNAL LOVE',        name: 'Dây Chuyền Moissanite',        price: 22000000, imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '15', category: 'day-chuyen', collection: 'CELESTIAL',           name: 'Dây Chuyền Ngọc Trai',         price: 11500000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '16', category: 'day-chuyen', collection: 'MODERN NOIR',         name: 'Dây Chuyền Kim Cương Tennis',  price: 48000000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '17', category: 'day-chuyen', collection: 'PETITE GRACE',        name: 'Dây Chuyền Charm Vàng',        price: 8900000,  imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '18', category: 'day-chuyen', collection: 'ROYAL INSIGNIA',      name: 'Dây Chuyền Bạch Kim Sapphire', price: 35000000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '19', category: 'day-chuyen', collection: 'HERITAGE COLLECTION', name: 'Dây Chuyền Hoa Vàng 14K',      price: 13200000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '20', category: 'day-chuyen', collection: 'ETERNAL LOVE',        name: 'Dây Chuyền Chữ Ký',            price: 18500000, imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '21', category: 'day-chuyen', collection: 'CELESTIAL',           name: 'Dây Chuyền Sao Vàng',          price: 9600000,  imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '22', category: 'day-chuyen', collection: 'MODERN NOIR',         name: 'Dây Chuyền Hộp Bạch Kim',      price: 27000000, imageUrl: '/images/product-aura-diamond-studs.png' },

  // ── Hoa tai (10 sản phẩm) ───────────────────────────────────────────────
  { id: '23', category: 'hoa-tai', collection: 'PETITE GRACE',        name: 'Hoa Tai Kim Cương Studs',     price: 18500000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '24', category: 'hoa-tai', collection: 'MODERN NOIR',         name: 'Hoa Tai Vàng Hồng Drop',     price: 9800000,  imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '25', category: 'hoa-tai', collection: 'HERITAGE COLLECTION', name: 'Hoa Tai Ngọc Trai Baroque',  price: 7200000,  imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '26', category: 'hoa-tai', collection: 'CELESTIAL',           name: 'Hoa Tai Vòng Bạch Kim',      price: 14000000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '27', category: 'hoa-tai', collection: 'ETERNAL LOVE',        name: 'Hoa Tai Kim Cương Halo',     price: 32000000, imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '28', category: 'hoa-tai', collection: 'ROYAL INSIGNIA',      name: 'Hoa Tai Emerald Giọt Lệ',   price: 25500000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '29', category: 'hoa-tai', collection: 'PETITE GRACE',        name: 'Hoa Tai Vàng 18K Huggies',  price: 6800000,  imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '30', category: 'hoa-tai', collection: 'MODERN NOIR',         name: 'Hoa Tai Ruby Hạt Nhỏ',      price: 11200000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '31', category: 'hoa-tai', collection: 'CELESTIAL',           name: 'Hoa Tai Sao Moissanite',    price: 8400000,  imageUrl: '/images/product-aura-diamond-studs.png' },
  { id: '32', category: 'hoa-tai', collection: 'HERITAGE COLLECTION', name: 'Hoa Tai Chandelier Vàng',   price: 19800000, imageUrl: '/images/product-silk-gold-bangle.png' },

  // ── Lắc tay & vòng tay (10 sản phẩm) ───────────────────────────────────
  { id: '33', category: 'lac-tay', collection: 'HERITAGE COLLECTION', name: 'Lắc Tay Vàng Trắng',        price: 28000000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '34', category: 'lac-tay', collection: 'ETERNAL LOVE',        name: 'Vòng Tay Charm Vàng',       price: 7500000,  imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '35', category: 'lac-tay', collection: 'ROYAL INSIGNIA',      name: 'Lắc Tay Kim Cương Tennis',  price: 52000000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '36', category: 'lac-tay', collection: 'PETITE GRACE',        name: 'Vòng Tay Bangle Bạch Kim',  price: 18600000, imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '37', category: 'lac-tay', collection: 'MODERN NOIR',         name: 'Lắc Tay Vàng 24K Đặc',     price: 34000000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '38', category: 'lac-tay', collection: 'CELESTIAL',           name: 'Vòng Tay Ngọc Trai Tahiti', price: 12800000, imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '39', category: 'lac-tay', collection: 'HERITAGE COLLECTION', name: 'Lắc Tay Mắt Xích Vàng',    price: 22500000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '40', category: 'lac-tay', collection: 'ETERNAL LOVE',        name: 'Vòng Tay Charm Bạc 925',    price: 5200000,  imageUrl: '/images/product-eternal-gold-band.png' },
  { id: '41', category: 'lac-tay', collection: 'ROYAL INSIGNIA',      name: 'Lắc Tay Sapphire Xanh',    price: 41000000, imageUrl: '/images/product-silk-gold-bangle.png' },
  { id: '42', category: 'lac-tay', collection: 'PETITE GRACE',        name: 'Vòng Tay Hoa Cỏ Vàng',     price: 9100000,  imageUrl: '/images/product-eternal-gold-band.png' },

  // ── Charm (10 sản phẩm) ─────────────────────────────────────────────────
  { id: '43', category: 'charm', collection: 'PETITE GRACE',        name: 'Charm Trái Tim Vàng',       price: 3200000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '44', category: 'charm', collection: 'MODERN NOIR',         name: 'Charm Bướm Vàng 18K',       price: 4100000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '45', category: 'charm', collection: 'CELESTIAL',           name: 'Charm Ngôi Sao Bạc',        price: 2800000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '46', category: 'charm', collection: 'ETERNAL LOVE',        name: 'Charm Khóa Tình Yêu',       price: 5500000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '47', category: 'charm', collection: 'HERITAGE COLLECTION', name: 'Charm Chữ Khởi Đầu',        price: 3800000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '48', category: 'charm', collection: 'PETITE GRACE',        name: 'Charm Hoa Anh Đào',         price: 4600000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '49', category: 'charm', collection: 'ROYAL INSIGNIA',      name: 'Charm Kim Cương Mini',      price: 9200000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '50', category: 'charm', collection: 'MODERN NOIR',         name: 'Charm Mặt Trăng Bạc 925',  price: 2400000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '51', category: 'charm', collection: 'CELESTIAL',           name: 'Charm Cầu Vồng Vàng',      price: 3500000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
  { id: '52', category: 'charm', collection: 'ETERNAL LOVE',        name: 'Charm Infinity Bạch Kim',   price: 6800000, imageUrl: '/images/product-solo-sparkle-pendant.png' },
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
