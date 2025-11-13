import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard-modules-page',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  template: ` <div class="max-w-7xl mx-auto">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">
        Welcome back! Here's what's happening today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Users</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">2,543</p>
            <p class="text-green-600 text-sm mt-2">+12% from last month</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-lg">
            <mat-icon class="text-blue-600 text-3xl">people</mat-icon>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Revenue</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$54,231</p>
            <p class="text-green-600 text-sm mt-2">+8% from last month</p>
          </div>
          <div class="bg-green-100 p-3 rounded-lg">
            <mat-icon class="text-green-600 text-3xl">trending_up</mat-icon>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Active Orders</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">486</p>
            <p class="text-orange-600 text-sm mt-2">+5 today</p>
          </div>
          <div class="bg-orange-100 p-3 rounded-lg">
            <mat-icon class="text-orange-600 text-3xl">shopping_cart</mat-icon>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Conversion Rate</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">3.24%</p>
            <p class="text-green-600 text-sm mt-2">+0.5% from last month</p>
          </div>
          <div class="bg-purple-100 p-3 rounded-lg">
            <mat-icon class="text-purple-600 text-3xl">analytics</mat-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200"
      >
        <h2 class="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h2>
        <div
          class="h-64 flex items-center justify-center bg-gray-50 rounded-lg"
        >
          <p class="text-gray-500">Chart placeholder</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
        <div class="space-y-3">
          <div
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <span class="text-sm text-gray-700">Product A</span>
            <span class="text-sm font-semibold text-gray-900">$12,450</span>
          </div>
          <div
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <span class="text-sm text-gray-700">Product B</span>
            <span class="text-sm font-semibold text-gray-900">$8,230</span>
          </div>
          <div
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <span class="text-sm text-gray-700">Product C</span>
            <span class="text-sm font-semibold text-gray-900">$5,120</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-700">Product D</span>
            <span class="text-sm font-semibold text-gray-900">$3,890</span>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardModulesPageComponent {}
