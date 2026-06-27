import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

type AllowedRole = 'CUSTOMER' | 'GUEST' | 'ADMIN' | 'DESIGNER';

/**
 * Cho phép truy cập nếu user có ít nhất một trong các role được liệt kê.
 * Phải dùng sau middleware `authenticate`.
 *
 * @example
 * router.get('/profile', authenticate, requireRole('CUSTOMER', 'ADMIN'), handler);
 */
export function requireRole(...roles: AllowedRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Chưa đăng nhập.' });
      return;
    }

    if (!roles.includes(req.user.role as AllowedRole)) {
      res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này.' });
      return;
    }

    next();
  };
}

/**
 * Chỉ cho phép SUPER_ADMIN.
 * Phải dùng sau middleware `authenticate`.
 */
export function requireSuperAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ message: 'Chưa đăng nhập.' });
    return;
  }

  if (req.user.role !== 'ADMIN' || req.user.adminRole !== 'SUPER_ADMIN') {
    res.status(403).json({ message: 'Chỉ Super Admin mới có quyền thực hiện thao tác này.' });
    return;
  }

  next();
}
