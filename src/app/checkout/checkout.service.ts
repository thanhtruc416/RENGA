import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  addressLine: string;
}

export interface PlaceOrderPayload {
  shippingAddress: ShippingAddress;
  paymentMethod: 'cod' | 'bank_transfer' | 'vnpay' | 'momo';
  voucherCode?: string;
  note?: string;
}

export interface PlaceOrderResult {
  orderId: string;
  orderCode: string;
  paymentUrl?: string;
}

export interface VoucherResult {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly http = inject(HttpClient);

  placeOrder(payload: PlaceOrderPayload): Observable<ApiResponse<PlaceOrderResult>> {
    return this.http.post<ApiResponse<PlaceOrderResult>>('/api/checkout', payload);
  }

  applyVoucher(code: string): Observable<ApiResponse<VoucherResult>> {
    return this.http.post<ApiResponse<VoucherResult>>('/api/vouchers/apply', { code });
  }
}
