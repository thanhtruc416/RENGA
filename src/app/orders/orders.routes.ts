import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'tra-cuu',
    loadComponent: () => import('./order-lookup/order-lookup.component').then(m => m.OrderLookupComponent),
  },
  {
    path: 'theo-doi',
    loadComponent: () => import('./order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./order-detail/order-detail.component').then(m => m.OrderDetailComponent),
  },
  {
    path: 'custom/:id',
    loadComponent: () => import('./order-detail-custom/order-detail-custom.component').then(m => m.OrderDetailCustomComponent),
  },
];
