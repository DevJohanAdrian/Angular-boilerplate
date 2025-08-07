import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpFooterComponent } from './components/sign-up-footer/sign-up-footer.component';
import { SignUpHeaderComponent } from './components/sign-up-header/sign-up-header.component';

@Component({
  selector: 'sign-up-page',
  imports: [
    AuthLayoutComponent,
    SignUpHeaderComponent,

    SignUpFormComponent,
    SignUpFooterComponent,
  ],
  template: `<auth-layout>
    <sign-up-header slot="header"></sign-up-header>
    <sign-up-form slot="form"></sign-up-form>
    <sign-up-footer slot="footer"></sign-up-footer>
  </auth-layout>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {}
