import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  imageUrl: string;
  size: number;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
}

export interface AddToCartPayload {
  productId: string;
  size: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);

  getCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>('/api/cart');
  }

  addToCart(payload: AddToCartPayload): Observable<ApiResponse<Cart>> {
    return this.http.post<ApiResponse<Cart>>('/api/cart/items', payload);
  }

  updateQuantity(itemId: string, quantity: number): Observable<ApiResponse<Cart>> {
    return this.http.patch<ApiResponse<Cart>>(`/api/cart/items/${itemId}`, { quantity });
  }

  removeFromCart(itemId: string): Observable<ApiResponse<Cart>> {
    return this.http.delete<ApiResponse<Cart>>(`/api/cart/items/${itemId}`);
  }

  clearCart(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>('/api/cart');
  }
}
