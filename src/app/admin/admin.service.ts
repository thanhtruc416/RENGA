import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { Order } from '../orders/orders.service';
import { Product } from '../products/products.service';
import { environment } from '../../environments/environment';

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
    return this.http.get<PaginatedResponse<Order>>(`${environment.apiUrl}/admin/orders`, { params: { ...params } });
  }

  updateOrderStatus(id: string, status: string): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${environment.apiUrl}/admin/orders/${id}/status`, { status });
  }

  // Products
  getProducts(params?: AdminListParams): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(`${environment.apiUrl}/admin/products`, { params: { ...params } });
  }

  createProduct(payload: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${environment.apiUrl}/admin/products`, payload);
  }

  updateProduct(id: string, payload: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${environment.apiUrl}/admin/products/${id}`, payload);
  }

  deleteProduct(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiUrl}/admin/products/${id}`);
  }

  // Appointments
  getAppointments(params?: AdminListParams): Observable<PaginatedResponse<Appointment>> {
    return this.http.get<PaginatedResponse<Appointment>>(`${environment.apiUrl}/admin/appointments`, { params: { ...params } });
  }

  updateAppointment(id: string, payload: Partial<Appointment>): Observable<ApiResponse<Appointment>> {
    return this.http.patch<ApiResponse<Appointment>>(`${environment.apiUrl}/admin/appointments/${id}`, payload);
  }
}
