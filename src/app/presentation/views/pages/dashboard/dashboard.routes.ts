import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/presentation/views/pages/not-found/not-found-page.component';
import { DashboardModulesPageComponent } from './DashboardModulesPage/DashboardModulesPage.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardModulesPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
