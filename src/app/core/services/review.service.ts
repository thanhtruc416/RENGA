import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HomeReview {
  id: string;
  rating: number;
  quote: string;
  author: string;
}

export interface ProductReview {
  id: string;
  rating: number;
  quote: string;
  author: string;
  photoUrl: string | null;
  date: string;
}

export interface ReviewableItem {
  orderItemId: string;
  orderId: string;
  orderType: 'STANDARD' | 'STUDIO' | 'DESIGN';
  date: string;
  productName: string;
  imageUrl: string | null;
  price: number;
  reviewed: boolean;
  rating: number | null;
  content: string | null;
}

export interface SubmitReviewPayload {
  orderItemId: string;
  rating: number;
  content?: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/reviews`;

  getHomeReviews(limit = 8): Observable<HomeReview[]> {
    return this.http.get<HomeReview[]>(`${this.base}/home`, {
      params: { limit },
    });
  }

  getProductReviews(productId: string, limit = 20): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(`${this.base}/product/${productId}`, {
      params: { limit },
    });
  }

  getReviewableItems(): Observable<{ success: boolean; data: ReviewableItem[] }> {
    return this.http.get<{ success: boolean; data: ReviewableItem[] }>(`${this.base}/reviewable`);
  }

  submitReview(payload: SubmitReviewPayload): Observable<{ success: boolean; data?: { reviewId: string }; message?: string }> {
    return this.http.post<{ success: boolean; data?: { reviewId: string }; message?: string }>(this.base, payload);
  }
}