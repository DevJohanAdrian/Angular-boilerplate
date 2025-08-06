import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  imports: [],
  template: `<p>sign-up works!</p>`,
  styleUrl: './sign-up-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent { }
