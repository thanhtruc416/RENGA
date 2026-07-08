import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Angular serialize giá trị `undefined` trong object params thành chuỗi "undefined"
// (khớp WHERE status = 'undefined' ở backend, gây 0 kết quả) — lọc bỏ trước khi gửi.
function toHttpParams(obj: Record<string, string | number | undefined>): HttpParams {
  let params = new HttpParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== '') params = params.set(key, value);
  }
  return params;
}

export interface AdminCategory {
  category_id: string;
  category_name: string;
  slug: string;
}

export interface AdminProduct {
  product_id: string;
  product_name: string;
  base_price: number;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  created_at: string;
  category_name: string;
  image_url: string | null;
  stock: number;
}

export interface AdminProductDetail extends AdminProduct {
  category_id: string;
  description: string | null;
  variants: Array<{ variant_id: string; variant_name: string; size_value: string; price: number; stock_quantity: number; status: string }>;
  images: Array<{ image_id: string; image_url: string; is_primary: boolean; image_type: string; display_order: number }>;
}

export interface AdminProductInput {
  category_id:  string;
  product_name: string;
  description?: string;
  base_price:   number;
  status?:      'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  image_url?:   string;
  variant?:     { variant_name: string; size_value?: string; price: number; stock_quantity: number };
}

export interface AdminOrder {
  order_id: string;
  order_type: 'STANDARD' | 'STUDIO' | 'DESIGN';
  order_status: 'PENDING' | 'PAYMENT_CONFIRMED' | 'PACKED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
  craft_status: string | null;
  total_amount: number;
  created_at: string;
  phone: string;
  customer_name: string | null;
  item_count: number;
}

export interface DashboardStats {
  totalRevenue: number;
  orderStatusCounts: Array<{ status: string; count: number }>;
  topProducts: Array<{ productId: string; name: string; totalSold: number }>;
  pendingPayments: number;
  pendingAppointments: number;
  pendingWarranties: number;
}

// ── Lịch hẹn tư vấn ────────────────────────────────────────────────────────

export interface AdminDesigner {
  employee_id: string;
  full_name: string;
  specialty: string | null;
  bio: string | null;
  consultation_fee: number;
  avatar: string | null;
  portfolio_url: string | null;
}

export interface AdminSlot {
  slot_id: string;
  start_time: string;
  end_time: string;
  slot_date: string;
  is_available: number;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface AdminAppointment {
  appointment_id: string;
  appointment_status: AppointmentStatus;
  payment_status: 'UNPAID' | 'PAID';
  consultation_fee: number;
  idea_description: string | null;
  created_at: string;
  slot_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  designer_name: string;
  designer_id: string;
  designer_avatar: string | null;
  designer_specialty: string | null;
  customer_name: string;
  customer_phone: string;
  client_id: string;
  customer_tier: string | null;
}

// ── Bảo hành ───────────────────────────────────────────────────────────────

export type WarrantyStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface AdminWarrantyRequest {
  warranty_id: string;
  order_id: string;
  request_type: 'WARRANTY' | 'CLEANING' | 'RESIZE' | 'REPAIR' | 'RETURN';
  issue_description: string;
  evidence_images: string[];
  warranty_status: WarrantyStatus;
  rejection_reason: string | null;
  handler_id: string | null;
  drop_off_date: string | null;
  received_at: string | null;
  completed_at: string | null;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  product_id: string | null;
  product_name: string | null;
  variant_name: string | null;
  product_image: string | null;
}

export interface WarrantyStats {
  total: number;
  pendingCount: number;
  inProgressCount: number;
  rejectedCount: number;
  avgRepairDays: number | null;
}

// ── Voucher ────────────────────────────────────────────────────────────────

export type VoucherStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export interface AdminVoucher {
  voucher_id: string;
  voucher_code: string;
  discount_type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discount_value: number;
  min_order_value: number;
  max_discount_amount: number | null;
  applicable_order_type: 'ALL' | 'STANDARD' | 'STUDIO' | 'DESIGN';
  usage_limit: number;
  used_count: number;
  valid_from: string;
  valid_to: string;
  created_at: string;
  effective_status: VoucherStatus;
}

export interface AdminVoucherInput {
  voucherCode: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderValue?: number;
  maxDiscountAmount?: number | null;
  applicableOrderType?: 'ALL' | 'STANDARD' | 'STUDIO' | 'DESIGN';
  usageLimit: number;
  validFrom: string;
  validTo: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

// ── Hỏi-đáp sản phẩm ───────────────────────────────────────────────────────

export interface AdminQuestion {
  question_id: string;
  product_id: string;
  client_id: string;
  question_content: string;
  reply_content: string | null;
  visibility_status: 'VISIBLE' | 'HIDDEN';
  created_at: string;
  replied_at: string | null;
  replied_by_admin_id: string | null;
  customer_name: string;
  customer_tier: string | null;
  product_name: string;
  product_image: string | null;
}

export interface QaStats {
  total: number;
  pendingCount: number;
  repliedCount: number;
  hiddenCount: number;
  newLast24h: number;
  replyRatePct: number;
  avgReplyHours: number | null;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin`;

  // Dashboard
  getDashboard(): Observable<{ success: boolean; data: DashboardStats }> {
    return this.http.get<{ success: boolean; data: DashboardStats }>(`${this.base}/dashboard`);
  }

  // Categories
  getCategories(): Observable<{ success: boolean; data: AdminCategory[] }> {
    return this.http.get<{ success: boolean; data: AdminCategory[] }>(`${this.base}/categories`);
  }

  // Products
  getProducts(params: { page?: number; limit?: number; search?: string; status?: string } = {}): Observable<{ success: boolean; products: AdminProduct[]; total: number; page: number; limit: number }> {
    return this.http.get<any>(`${this.base}/products`, { params: toHttpParams(params) });
  }

  getProduct(id: string): Observable<{ success: boolean; data: AdminProductDetail }> {
    return this.http.get<{ success: boolean; data: AdminProductDetail }>(`${this.base}/products/${id}`);
  }

  createProduct(payload: AdminProductInput): Observable<{ success: boolean; data: { productId: string } }> {
    return this.http.post<{ success: boolean; data: { productId: string } }>(`${this.base}/products`, payload);
  }

  updateProduct(id: string, payload: Partial<AdminProductInput>): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/products/${id}`, payload);
  }

  deleteProduct(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.base}/products/${id}`);
  }

  // Orders
  getOrders(params: { page?: number; limit?: number; status?: string; type?: string; search?: string } = {}): Observable<{ success: boolean; orders: AdminOrder[]; total: number; page: number; limit: number }> {
    return this.http.get<any>(`${this.base}/orders`, { params: toHttpParams(params) });
  }

  getOrder(id: string): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(`${this.base}/orders/${id}`);
  }

  updateOrderStatus(id: string, status: string): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/orders/${id}/status`, { status });
  }

  // ── Lịch hẹn tư vấn ──────────────────────────────────────────────────────

  getDesigners(): Observable<{ success: boolean; data: AdminDesigner[] }> {
    return this.http.get<{ success: boolean; data: AdminDesigner[] }>(`${this.base}/designers`);
  }

  getDesignerSlots(designerId: string, date: string): Observable<{ success: boolean; data: AdminSlot[] }> {
    const params = new HttpParams().set('designerId', designerId).set('date', date);
    return this.http.get<{ success: boolean; data: AdminSlot[] }>(`${this.base}/designer-slots`, { params });
  }

  getAppointments(params: { page?: number; limit?: number; status?: string; designerId?: string; dateFrom?: string; dateTo?: string; search?: string } = {}):
    Observable<{ success: boolean; appointments: AdminAppointment[]; total: number; page: number; limit: number }> {
    return this.http.get<any>(`${this.base}/appointments`, { params: toHttpParams(params) });
  }

  updateAppointmentStatus(id: string, status: AppointmentStatus): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/appointments/${id}/status`, { status });
  }

  reassignAppointment(id: string, slotId: string): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/appointments/${id}/reassign`, { slotId });
  }

  // ── Bảo hành ─────────────────────────────────────────────────────────────

  getWarrantyStats(): Observable<{ success: boolean; data: WarrantyStats }> {
    return this.http.get<{ success: boolean; data: WarrantyStats }>(`${this.base}/warranty-stats`);
  }

  getWarrantyRequests(params: { page?: number; limit?: number; status?: string; search?: string } = {}):
    Observable<{ success: boolean; requests: AdminWarrantyRequest[]; total: number; page: number; limit: number }> {
    return this.http.get<any>(`${this.base}/warranty-requests`, { params: toHttpParams(params) });
  }

  updateWarrantyStatus(id: string, status: WarrantyStatus, rejectionReason?: string): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/warranty-requests/${id}/status`, { status, rejectionReason });
  }

  // ── Voucher ──────────────────────────────────────────────────────────────

  getVouchers(params: { page?: number; limit?: number; status?: string; search?: string } = {}):
    Observable<{ success: boolean; vouchers: AdminVoucher[]; total: number; page: number; limit: number }> {
    return this.http.get<any>(`${this.base}/vouchers`, { params: toHttpParams(params) });
  }

  getVoucher(id: string): Observable<{ success: boolean; data: AdminVoucher }> {
    return this.http.get<{ success: boolean; data: AdminVoucher }>(`${this.base}/vouchers/${id}`);
  }

  createVoucher(payload: AdminVoucherInput): Observable<{ success: boolean; data: { voucherId: string } }> {
    return this.http.post<{ success: boolean; data: { voucherId: string } }>(`${this.base}/vouchers`, payload);
  }

  updateVoucher(id: string, payload: Partial<AdminVoucherInput>): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/vouchers/${id}`, payload);
  }

  // ── Hỏi-đáp sản phẩm ─────────────────────────────────────────────────────

  getQaStats(): Observable<{ success: boolean; data: QaStats }> {
    return this.http.get<{ success: boolean; data: QaStats }>(`${this.base}/questions/stats`);
  }

  getQuestions(params: { page?: number; limit?: number; status?: string; search?: string } = {}):
    Observable<{ success: boolean; questions: AdminQuestion[]; total: number; page: number; limit: number }> {
    return this.http.get<any>(`${this.base}/questions`, { params: toHttpParams(params) });
  }

  replyToQuestion(id: string, replyContent: string): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/questions/${id}/reply`, { replyContent });
  }

  setQuestionVisibility(id: string, visibility: 'VISIBLE' | 'HIDDEN'): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${this.base}/questions/${id}/visibility`, { visibility });
  }
}
