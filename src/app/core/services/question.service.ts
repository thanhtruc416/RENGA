import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProductQuestion {
  id: string;
  question: string;
  answer: string | null;
  author: string;
  askedAt: string;
  repliedAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/products`;

  getProductQuestions(productId: string): Observable<{ success: boolean; data: ProductQuestion[] }> {
    return this.http.get<{ success: boolean; data: ProductQuestion[] }>(`${this.base}/${productId}/questions`);
  }

  submitQuestion(productId: string, content: string): Observable<{ success: boolean; data?: { questionId: string }; message?: string }> {
    return this.http.post<{ success: boolean; data?: { questionId: string }; message?: string }>(
      `${this.base}/${productId}/questions`, { content },
    );
  }
}
