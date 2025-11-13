import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavSection } from '@presentation/views/models/dashboard/dashboard.data.model';
import { AuthController } from '@presentation/controllers/auth.controller';



@Component({
  selector: 'sidebar',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <aside class="w-64 bg-gray-900 text-white flex flex-col h-screen">
      <!-- Logo -->
      <div class="px-6 py-6 border-b border-gray-800 flex items-center space-x-2">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <mat-icon class="text-white">dashboard</mat-icon>
        </div>
        <span class="text-xl font-bold">Dashboard</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        <div *ngFor="let section of navSections">
          <h3 class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {{ section.title }}
          </h3>
          <div class="space-y-1">
            <button
              *ngFor="let item of section.items"
              [routerLink]="item.route"
              routerLinkActive="bg-blue-600"
              [routerLinkActiveOptions]="{ exact: false }"
              class="w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 group"
            >
              <mat-icon class="text-lg group-hover:text-blue-400">{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-6 border-t border-gray-800">
        <button type="button"
          class="w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 group"
        (click)="onLogout()"
          >
          <mat-icon class="text-lg">logout</mat-icon>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  `,
  providers: [AuthController],
})
export class SidebarComponent implements OnInit {
  navSections: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'Analytics', icon: 'analytics', route: '/analytics' },
        { label: 'Reports', icon: 'assessment', route: '/reports' }
      ]
    },
    {
      title: 'Management',
      items: [
        { label: 'Users', icon: 'people', route: '/users' },
        { label: 'Products', icon: 'shopping_cart', route: '/products' },
        { label: 'Orders', icon: 'receipt_long', route: '/orders' }
      ]
    },
    {
      title: 'Settings',
      items: [
        { label: 'Profile', icon: 'person', route: '/profile' },
        { label: 'Preferences', icon: 'tune', route: '/preferences' },
        { label: 'Security', icon: 'security', route: '/security' }
      ]
    }
  ];

  constructor(private router: Router, private readonly authController: AuthController) {}

  ngOnInit(): void {}

  
   onLogout() {
    this.authController.logOut()
    this.router.navigateByUrl('/auth/sign-in');
  }
  
}
