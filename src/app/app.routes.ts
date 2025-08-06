import { Routes } from '@angular/router';

import { HomeComponent } from '@app/presentation/views/pages/home/home.component';
import { NotFoundComponent } from '@presentation/views/pages/not-found/not-found.component';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  //landingPageRoute
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('@presentation/views/pages/auth/auth.routes').then(
        (m) => m.AUTH_ROUTES,
      ),
  },

  {
    path: 'dashboard',
    canMatch: [authGuard],
    loadChildren: () =>
      import('@presentation/views/pages/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES,
      ),
  },
  { path: '**', component: NotFoundComponent },
];
