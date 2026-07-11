import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Endpoint không nên thử refresh khi 401 (tránh vòng lặp / logic khác nhau)
const REFRESH_EXEMPT = ['/auth/token/refresh', '/auth/login', '/auth/register', '/auth/logout'];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isExempt = REFRESH_EXEMPT.some((u) => req.url.includes(u));

      // Access token hết hạn giữa phiên → thử refresh 1 lần rồi gửi lại request gốc,
      // thay vì đăng xuất ngay (trước đây luôn logout ngay khi gặp 401).
      if (err.status === 401 && auth.isLoggedIn() && !isExempt) {
        return auth.refreshToken().pipe(
          switchMap((res) => {
            const retried = req.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } });
            return next(retried);
          }),
          catchError((refreshErr) => {
            auth.logout();
            return throwError(() => refreshErr);
          }),
        );
      }

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
