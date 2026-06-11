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
];
