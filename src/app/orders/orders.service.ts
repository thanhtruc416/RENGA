import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';

export interface Order {
  id: string;
  code: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface OrderListParams {
  page?: number;
  pageSize?: number;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly http = inject(HttpClient);

  getOrders(params?: OrderListParams): Observable<PaginatedResponse<Order>> {
    return this.http.get<PaginatedResponse<Order>>('/api/orders', { params: { ...params } });
  }

  getOrderById(id: string): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`/api/orders/${id}`);
  }

  getOrderByCode(code: string): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`/api/orders/track/${code}`);
  }

  cancelOrder(id: string, reason?: string): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`/api/orders/${id}/cancel`, { reason });
  }
}
