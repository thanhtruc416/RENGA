import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface User {
      accountId:     string;
      clientId?:     string;
      employeeId?:   string;
      role:          'CUSTOMER' | 'GUEST' | 'ADMIN' | 'DESIGNER';
      employeeType?: 'ADMIN' | 'DESIGNER';
      adminRole?:    'SUPER_ADMIN' | 'STAFF';
    }
    interface Request {
      user?: AuthPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export interface AuthPayload {
  accountId:     string;
  clientId?:     string;
  employeeId?:   string;
  role:          'CUSTOMER' | 'GUEST' | 'ADMIN' | 'DESIGNER';
  employeeType?: 'ADMIN' | 'DESIGNER';
  adminRole?:    'SUPER_ADMIN' | 'STAFF';
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Chưa đăng nhập.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
}

/** Middleware cho phép cả user chưa đăng nhập (không bắt buộc auth) */
export function optionalAuthenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
  } catch {
    // token lỗi → bỏ qua, tiếp tục như guest
  }

  next();
}