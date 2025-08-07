import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sign-up-header',
  imports: [MatIconModule],
  template: ` <!-- Header -->
    <div class="px-8 pt-8 pb-6 text-center">
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto mb-4 shadow-lg bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl"
      >
        <mat-icon class="text-3xl text-white">person_add</mat-icon>
      </div>
      <h1 class="mb-2 text-3xl font-bold text-gray-800">Create Account</h1>
      <p class="text-gray-600">Join us today and get started</p>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpHeaderComponent {}
