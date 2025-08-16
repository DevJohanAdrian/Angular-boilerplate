import { Routes } from '@angular/router';
import { DashboardPageComponent } from './layout/dashboard-page.component';
import { NotFoundPageComponent } from '@app/presentation/views/pages/not-found/not-found-page.component';

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
      { path: '**', component: NotFoundPageComponent },
    ],
  },
];
