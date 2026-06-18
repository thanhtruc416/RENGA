import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 401:
          auth.logout();
          break;
        case 403:
          router.navigate(['/']);
          break;
        case 404:
          console.error('Không tìm thấy tài nguyên:', req.url);
          break;
        case 500:
          console.error('Lỗi máy chủ. Vui lòng thử lại sau.');
          break;
        default:
          console.error(`Lỗi ${err.status}:`, err.message);
      }

      return throwError(() => err);
    })
  );
};
