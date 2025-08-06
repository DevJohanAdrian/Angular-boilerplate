import { Routes } from '@angular/router';
import { SignInPageComponent } from '@presentation/views/pages/auth/sign-in/sign-in-page.component';
import { SignUpPageComponent } from '@presentation/views/pages/auth/sign-up/sign-up-page.component';
import { NotFoundComponent } from '@presentation/views/pages/not-found/not-found.component';

export const AUTH_ROUTES: Routes = [
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: '**', component: NotFoundComponent },
];
