import { Routes } from '@angular/router';
import { DashboardPageComponent } from './layout/dashboard-page.component';
import { NotFoundPageComponent } from '@app/presentation/views/pages/not-found/not-found-page.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    
  },
];
