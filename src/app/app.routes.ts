import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'studio',
    loadComponent: () =>
      import('./studio/studio.component').then((m) => m.StudioComponent),
  },
  {
    path: 'the-designer',
    loadComponent: () =>
      import('./design/design.component').then((m) => m.DesignComponent),
  },
  {
    path: 'appointment-history',
    loadComponent: () =>
      import('./appointment-history/appointment-history.component').then((m) => m.AppointmentHistoryComponent),
  },
  { path: '', redirectTo: 'studio', pathMatch: 'full' },

  { 
    path: 'cart', 
    loadComponent: () => import('./cart/cart.component').then((m) => m.CartComponent) 
  },

  {
  path: 'checkout',
  loadComponent: () =>
    import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },

  {
    path: 'orders/tracking',
    loadComponent: () =>
      import('./orders/order-tracking/order-tracking.component').then((m) => m.OrderTrackingComponent),
  },
  {
    path: 'orders/lookup',
    loadComponent: () =>
      import('./orders/order-lookup/order-lookup.component').then((m) => m.OrderLookupComponent),
  },
  {
    path: 'orders/custom/:id',
    loadComponent: () =>
      import('./orders/order-detail-custom/order-detail-custom.component').then(
        (m) => m.OrderDetailCustomComponent,
      ),
  },
  // Wildcard param đặt SAU cùng trong nhóm orders
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./orders/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent,
      ),
  },
];

