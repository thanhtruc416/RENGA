export type UserRole = 'admin' | 'employee' | 'customer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt?: string;
}

export interface Customer extends User {
  role: 'customer';
  birthDate?: string;
  address?: string;
  tierId?: string;
  loyaltyPoints?: number;
}

export interface Employee extends User {
  role: 'employee' | 'admin';
  position?: string;
  department?: string;
}
