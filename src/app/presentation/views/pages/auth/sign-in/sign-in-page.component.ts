import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { SignInFormComponent } from './components/sign-in-fom/sign-in-form.component';
import { SignInHeaderComponent } from './components/sign-in-header/sign-in-header.component';
import { SignInFooterComponent } from './components/sign-in-footer/sign-in-footer.component';

@Component({
  selector: 'sign-in-page',
  imports: [AuthLayoutComponent, SignInFormComponent, SignInHeaderComponent, SignInFooterComponent],
  template: `
    <auth-layout>
      <sign-in-header slot="header"></sign-in-header>
      <sign-in-form slot="form"></sign-in-form>
      <sign-in-footer slot="footer"></sign-in-footer>
    </auth-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {}
