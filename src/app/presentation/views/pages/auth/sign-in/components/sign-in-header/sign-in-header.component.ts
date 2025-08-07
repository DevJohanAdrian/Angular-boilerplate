import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sign-in-header',
  imports: [MatIconModule],
  template: ` <div class="px-8 pt-8 pb-6 text-center">
    <div
      class="flex items-center justify-center w-20 h-20 mx-auto mb-4 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl"
    >
      <!-- <mat-icon class="text-white text-3xl" aria-hidden="false" aria-label="Example home icon" fontIcon="account_circle"></mat-icon> -->
      <!-- forma clasica -->
      <!-- <mat-icon class="text-white text-3xl">account_circle</mat-icon> -->
      <span
        class="material-icons text-white text-3xl"
        role="img"
        aria-label="User icon"
        >account_circle</span
      >
    </div>
    <h1 class="mb-2 text-3xl font-bold text-gray-800">Welcome Back</h1>
    <p class="text-gray-600">Sign in to continue to your account</p>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInHeaderComponent {}
