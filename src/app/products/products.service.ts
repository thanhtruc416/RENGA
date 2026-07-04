import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Product {
  id: string;
  category: string;
  category_name: string;
  collection: string;
  name: string;
  price: number;
  imageUrl: string;
  tryonUrl: string | null;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  variant_id: string;
  variant_name: string;
  size_value: string;
  price: number;
  stock_quantity: number;
  status: string;
}

export interface ProductImage {
  image_url: string;
  is_primary: boolean;
  image_type: 'GALLERY' | 'LIFESTYLE' | 'TRYON';
}

export interface ProductDetail extends Product {
  description: string;
  material: string;
  sizes: number[];
  images: ProductImage[];
  variants: ProductVariant[];
  inStock: boolean;
  specs: ProductSpec[];
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/products`;

  getProducts(category?: string, page = 1, limit = 48): Observable<Product[]> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);
    if (category) params = params.set('category', category);

    return this.http.get<{ products: any[]; total: number }>(this.base, { params }).pipe(
      map(res => res.products.map(p => this.mapProduct(p)))
    );
  }

  getProductById(id: string): Observable<ProductDetail> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(
      map(p => {
        const { specs: parsedSpecs, description } = this.parseDescription(p.description ?? '');
        // ~23% sản phẩm (crawl từ PNJ) có mô tả chỉ là văn xuôi marketing, không có
        // dạng "NHÃN: giá trị" nào để parse — suy ra thông số cơ bản từ tên SP +
        // variant thay vì để trống hẳn khối "Thông số chi tiết".
        const specs = parsedSpecs.length
          ? parsedSpecs
          : this.deriveFallbackSpecs(p.product_name ?? '', p.category_name ?? '', p.variants ?? []);
        const imgs: any[] = p.images ?? [];
        const primaryImg = imgs.find((i: any) => i.is_primary)?.image_url
          ?? imgs[0]?.image_url
          ?? '';
        return {
          ...this.mapProduct({ ...p, image_url: primaryImg }),
          description,
          material: specs.find(s => s.label === 'CHẤT LIỆU')?.value ?? '',
          specs,
          sizes:    (p.variants ?? []).map((v: any) => Number(v.size_value)).filter((s: number) => !isNaN(s) && s > 0),
          images:   imgs,
          variants: p.variants ?? [],
          inStock:  (p.variants ?? []).length > 0,
        };
      })
    );
  }

  private deriveFallbackSpecs(productName: string, categoryName: string, variants: any[]): ProductSpec[] {
    const n = productName.toLowerCase();
    const specs: ProductSpec[] = [];

    let material = '';
    if (/99%|9999|vàng ta/.test(n)) material = 'Vàng ta (24K/9999)';
    else if (/75%|\(18k\)/.test(n)) material = 'Vàng 18K';
    else if (/58,5%|\(14k\)/.test(n)) material = 'Vàng 14K';
    else if (/41,6%|\(10k\)/.test(n)) material = 'Vàng 10K';
    else if (/bạch kim|platinum/.test(n)) material = 'Bạch kim';
    else if (/bạc/.test(n)) material = 'Bạc 925';
    if (n.includes('vàng trắng') && material.startsWith('Vàng')) material += ' (Vàng trắng)';
    if (material) specs.push({ label: 'CHẤT LIỆU', value: material });

    if (categoryName) specs.push({ label: 'LOẠI SẢN PHẨM', value: categoryName });

    if (/kim cương/.test(n)) specs.push({ label: 'ĐÁ ĐÍNH KÈM', value: 'Kim cương' });
    else if (/đính đá|sapphire|ruby|topaz|emerald|ngọc|opal|citrine|ecz/.test(n)) {
      const stoneMatch = n.match(/sapphire|ruby|topaz|emerald|citrine/);
      specs.push({ label: 'ĐÁ ĐÍNH KÈM', value: stoneMatch ? stoneMatch[0] : 'Đá tự nhiên/nhân tạo' });
    }

    const sizeValues = [...new Set(variants.map((v: any) => v.size_value).filter(Boolean))];
    if (sizeValues.length) {
      specs.push({ label: 'KÍCH THƯỚC', value: sizeValues.join(', ') });
    }

    return specs;
  }

  private cleanSpecValue(value: string): string {
    // "9250 (9250)" → "Bạc 9250" | "7500 (7500)" → "Vàng 18K" | v.v.
    const dupMatch = value.match(/^(\S+)\s+\(\1\)$/);
    const code = dupMatch ? dupMatch[1] : value;
    const n = parseInt(code, 10);
    if (!isNaN(n)) {
      if (n >= 9200 && n <= 9999) return `Bạc ${n}`;
      if (n >= 7500 && n <= 7599) return `Vàng 18K`;
      if (n >= 5800 && n <= 5899) return `Vàng 14K`;
      if (n >= 3750 && n <= 3799) return `Vàng 9K`;
    }
    // Xóa đuôi trùng lặp trong ngoặc: "Vàng trắng (Vàng trắng)" → "Vàng trắng"
    return value.replace(/^(.+)\s+\(\1\)$/, '$1');
  }

  private parseDescription(raw: string): { specs: ProductSpec[]; description: string } {
    const clean = raw.replace(/^\[SKU:[^\]]+\]\s*/, '');
    const parts = clean.split(' | ');
    const specs: ProductSpec[] = [];
    const descParts: string[] = [];

    for (const part of parts) {
      const colonIdx = part.indexOf(': ');
      if (colonIdx > 0 && colonIdx < 25) {
        specs.push({
          label: part.slice(0, colonIdx).trim().toUpperCase(),
          value: this.cleanSpecValue(part.slice(colonIdx + 2).trim()),
        });
      } else {
        descParts.push(part);
      }
    }

    const description = descParts
      .join(' ')
      .replace(/\|/g, ' ')                                  // "Disney|PNJ" → "Disney PNJ"
      .replace(/(PNJ|Disney|Doji|Pandora)(\s+(PNJ|Disney|Doji|Pandora))+/gi, 'RENGA') // "RENGA RENGA" → "RENGA"
      .replace(/(PNJ|Disney|Doji|Pandora)/gi, 'RENGA')      // còn lại từng cái riêng lẻ
      .replace(/\s{2,}/g, ' ')
      .trim();

    return { specs, description };
  }

  private mapProduct(p: any): Product {
    return {
      id:            p.product_id,
      category:      p.category,
      category_name: p.category_name,
      collection:    '',
      name:          p.product_name,
      price:         Number(p.base_price),
      imageUrl:      p.image_url ?? '',
      tryonUrl:      p.tryon_url ?? null,
    };
  }
}
