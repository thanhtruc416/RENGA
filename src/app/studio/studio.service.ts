import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

export interface DesignRequest {
  id: string;
  customerName: string;
  phone: string;
  category: string;
  description: string;
  referenceImages?: string[];
  budget?: number;
  status: 'pending' | 'reviewing' | 'designing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CreateDesignRequestPayload {
  category: string;
  description: string;
  referenceImages?: string[];
  budget?: number;
  appointmentDate?: string;
}

export interface StudioAppointment {
  id: string;
  designRequestId?: string;
  customerName: string;
  phone: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

@Injectable({ providedIn: 'root' })
export class StudioService {
  private readonly http = inject(HttpClient);

  getDesignRequests(): Observable<PaginatedResponse<DesignRequest>> {
    return this.http.get<PaginatedResponse<DesignRequest>>(`${environment.apiUrl}/studio/designs`);
  }

  createDesignRequest(payload: CreateDesignRequestPayload): Observable<ApiResponse<DesignRequest>> {
    return this.http.post<ApiResponse<DesignRequest>>(`${environment.apiUrl}/studio/designs`, payload);
  }

  getAppointments(): Observable<PaginatedResponse<StudioAppointment>> {
    return this.http.get<PaginatedResponse<StudioAppointment>>(`${environment.apiUrl}/studio/appointments`);
  }

  bookAppointment(payload: Partial<StudioAppointment>): Observable<ApiResponse<StudioAppointment>> {
    return this.http.post<ApiResponse<StudioAppointment>>(`${environment.apiUrl}/studio/appointments`, payload);
  }

  cancelAppointment(id: string): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${environment.apiUrl}/studio/appointments/${id}/cancel`, {});
  }
}
