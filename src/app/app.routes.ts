import { Routes } from '@angular/router';
import { DashboardComponent } from '@p';

export const routes: Routes = [
  //landingPageRoute,
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./presentation/views/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
//   {
//     path: 'sign-up',
//     loadComponent: () =>
//       import('./presentation/views/pages/sign-up/sign-up.component').then(
//         (m) => m.SignUpComponent,
//       ),
//   },
  {path: 'dashboard', component:},  
];
