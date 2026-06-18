import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface LoyaltyPoints {
  total: number;
  available: number;
  used: number;
  history: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/account/profile`);
  }

  updateProfile(payload: UpdateProfilePayload): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${environment.apiUrl}/account/profile`, payload);
  }

  changePassword(payload: ChangePasswordPayload): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${environment.apiUrl}/account/password`, payload);
  }

  getLoyaltyPoints(): Observable<ApiResponse<LoyaltyPoints>> {
    return this.http.get<ApiResponse<LoyaltyPoints>>(`${environment.apiUrl}/account/loyalty`);
  }
}
