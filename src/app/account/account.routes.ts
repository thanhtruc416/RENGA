import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: 'thong-tin',
    loadComponent: () => import('./profile-info/profile-info.component').then(m => m.ProfileInfoComponent),
  },
  {
    path: 'diem-tich-luy',
    loadComponent: () => import('./profile-loyalty/profile-loyalty.component').then(m => m.ProfileLoyaltyComponent),
  },
];
