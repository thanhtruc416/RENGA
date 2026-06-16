import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { Order } from '../orders/orders.service';
import { Product } from '../products/products.service';

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  note?: string;
}

export interface AdminListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);

  // Orders
  getOrders(params?: AdminListParams): Observable<PaginatedResponse<Order>> {
    return this.http.get<PaginatedResponse<Order>>('/api/admin/orders', { params: { ...params } });
  }

  updateOrderStatus(id: string, status: string): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`/api/admin/orders/${id}/status`, { status });
  }

  // Products
  getProducts(params?: AdminListParams): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>('/api/admin/products', { params: { ...params } });
  }

  createProduct(payload: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>('/api/admin/products', payload);
  }

  updateProduct(id: string, payload: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`/api/admin/products/${id}`, payload);
  }

  deleteProduct(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/api/admin/products/${id}`);
  }

  // Appointments
  getAppointments(params?: AdminListParams): Observable<PaginatedResponse<Appointment>> {
    return this.http.get<PaginatedResponse<Appointment>>('/api/admin/appointments', { params: { ...params } });
  }

  updateAppointment(id: string, payload: Partial<Appointment>): Observable<ApiResponse<Appointment>> {
    return this.http.patch<ApiResponse<Appointment>>(`/api/admin/appointments/${id}`, payload);
  }
}
