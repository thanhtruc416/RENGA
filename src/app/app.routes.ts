import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./studio/studio.component').then((m) => m.StudioComponent),
  },
  {
    path: 'chinh-sach-bao-hanh',
    loadComponent: () =>
      import('./policies/warranty-policy/warranty-policy.component').then(
        (m) => m.WarrantyPolicyComponent,
      ),
  },
  {
    path: 'doi-tra-hoan-tien',
    loadComponent: () =>
      import('./policies/returns-policy/returns-policy.component').then(
        (m) => m.ReturnsPolicyComponent,
      ),
  },
  {
    path: 'vat-lieu-ben-vung',
    loadComponent: () =>
      import('./sustainable-materials/sustainable-materials.component').then(
        (m) => m.SustainableMaterialsComponent,
      ),
  },
  {
    path: 'cau-chuyen-thuong-hieu',
    loadComponent: () =>
      import('./brand-story/brand-story.component').then(
        (m) => m.BrandStoryComponent,
      ),
  },
  {
    path: 'the-designer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./design/design.component').then((m) => m.DesignComponent),
  },
  {
    path: 'consultation',
    redirectTo: 'the-designer',
    pathMatch: 'full',
  },
  {
    path: 'appointment-history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./appointment-history/appointment-history.component').then(
        (m) => m.AppointmentHistoryComponent,
      ),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./account/account.routes').then((m) => m.accountRoutes),
  },
  {
    path: 'bo-suu-tap',
    loadComponent: () =>
      import('./collections/collections.component').then(
        (m) => m.CollectionsComponent,
      ),
  },
  {
    path: 'bo-suu-tap/:slug',
    loadComponent: () =>
      import('./collections/collection-detail/collection-detail.component').then(
        (m) => m.CollectionDetailComponent,
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
    canActivate: [authGuard],
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
    path: 'orders/reviews',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./reviews/review-list/review-list.component').then((m) => m.ReviewListComponent),
  },
  {
    path: 'orders/reviews/write',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./reviews/reviews.component').then((m) => m.ReviewsComponent),
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
    path: 'quan-tri-vien',
    loadComponent: () =>
      import('./admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent,
      ),
  },
  {
    path: 'cau-hoi-thuong-gap',
    redirectTo: 'doi-tra-hoan-tien',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
