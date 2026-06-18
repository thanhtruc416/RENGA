import { Routes } from '@angular/router';
import { adminGuard } from '../core/guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'san-pham',
        loadComponent: () =>
          import('./product-management/product-management.component').then(
            (m) => m.ProductManagementComponent,
          ),
      },
      {
        path: 'don-hang',
        loadComponent: () =>
          import('./order-management/order-management.component').then(
            (m) => m.OrderManagementComponent,
          ),
      },
      {
        path: 'don-hang/:id',
        loadComponent: () =>
          import('./order-detail/order-detail.component').then((m) => m.AdminOrderDetailComponent),
      },
      {
        path: 'don-thiet-ke/tao',
        loadComponent: () =>
          import('./design-order-create/design-order-create.component').then(
            (m) => m.DesignOrderCreateComponent,
          ),
      },
      {
        path: 'lich-hen',
        loadComponent: () =>
          import('./appointment-management/appointment-management.component').then(
            (m) => m.AppointmentManagementComponent,
          ),
      },
      {
        path: 'bao-hanh',
        loadComponent: () =>
          import('./warranty-management/warranty-management.component').then(
            (m) => m.WarrantyManagementComponent,
          ),
      },
      {
        path: 'voucher',
        loadComponent: () =>
          import('./voucher-management/voucher-management.component').then(
            (m) => m.VoucherManagementComponent,
          ),
      },
      {
        path: 'hoi-dap',
        loadComponent: () =>
          import('./qa-management/qa-management.component').then((m) => m.QaManagementComponent),
      },
    ],
  },
];
