import { Routes } from '@angular/router';
import { DashboardPageComponent } from './layout/dashboard-page.component';
import { NotFoundComponent } from '@presentation/views/pages/not-found/not-found.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./DashboardModulesPage/DashboardModulesPage.component').then(
            (m) => m.DashboardModulesPageComponent,
          ),
      },
      //modulos que se definiran despues
      {},
      // no found page del dashboard
      { path: '**', component: NotFoundComponent },
    ],
  },
];
