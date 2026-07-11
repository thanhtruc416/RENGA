import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Trước đây luôn đá về /dang-nhap trơn — đăng nhập xong lại về trang chủ
  // thay vì quay lại đúng trang khách đang định vào (vd /account, /orders/...).
  return router.createUrlTree(['/dang-nhap'], { queryParams: { returnUrl: state.url } });
};
