import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthController } from '@presentation/controllers/auth.controller';


@Component({
  selector: 'navbar',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  template: ` <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- Left Section -->
        <div class="flex items-center space-x-4">
          <button mat-icon-button class="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <mat-icon>menu</mat-icon>
          </button>
          <div class="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              class="px-4 py-2 text-sm text-gray-900 placeholder-gray-600 transition-all bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2">
          <!-- Notifications -->
          <button mat-icon-button class="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <mat-icon>notifications_none</mat-icon>
            <span class="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
          </button>

          <!-- Messages -->
          <button mat-icon-button class="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <mat-icon>mail_outline</mat-icon>
          </button>

          <!-- User Menu -->
          <button
            mat-icon-button
            [matMenuTriggerFor]="userMenu"
            class="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
      </div>
    </nav>

    <!-- User Menu -->
    <mat-menu #userMenu="matMenu">
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      <button mat-menu-item>
        <mat-icon>help_outline</mat-icon>
        <span>Help</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item type="button" (click)="onLogout()">
        <mat-icon>logout</mat-icon>
          <span>Logout</span>
      </button>
    </mat-menu>`,
    providers: [AuthController],
})
export class NavbarComponent {

  constructor(private readonly authController: AuthController
  ) {}

  onLogout() {
    this.authController.onSignOut()
    // this.router.navigateByUrl('/auth/sign-in'); // se hace en el effect
  }
  
}
