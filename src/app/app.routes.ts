import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then((m) => m.productsRoutes),
  },
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
      import('./appointment-history/appointment-history.component').then(
        (m) => m.AppointmentHistoryComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'profile/rewards',
    loadComponent: () =>
      import('./profile/profile-rewards.component').then(
        (m) => m.ProfileRewardsComponent,
      ),
  },
  {
    path: 'danh-muc',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (m) => m.CategoriesComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'orders/tracking',
    loadComponent: () =>
      import('./orders/order-tracking/order-tracking.component').then(
        (m) => m.OrderTrackingComponent,
      ),
  },
  {
    path: 'orders/lookup',
    loadComponent: () =>
      import('./orders/order-lookup/order-lookup.component').then(
        (m) => m.OrderLookupComponent,
      ),
  },
  {
    path: 'orders/custom/:id',
    loadComponent: () =>
      import('./orders/order-detail-custom/order-detail-custom.component').then(
        (m) => m.OrderDetailCustomComponent,
      ),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./orders/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent,
      ),
  },
  {
    path: 'dang-ki',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'dang-nhap',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'quen-mat-khau',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'mat-khau-moi',
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
