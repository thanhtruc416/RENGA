import { Routes } from '@angular/router';

export const studioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./studio.component').then(m => m.StudioComponent),
  },
];
