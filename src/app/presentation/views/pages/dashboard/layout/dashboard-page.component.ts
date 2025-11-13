// @Component({
//   selector: 'dashboard-page',
//   imports: [RouterModule, SidebarComponent, NavbarComponent],
//   template: `<!-- dashboard-layout.page.html -->
//     <navbar></navbar>
//     <sidebar></sidebar>
//     <div class="content">
//       <router-outlet></router-outlet>
//       <!-- Aquí se renderiza products, users, etc. -->
//     </div>`,
// })
// export class DashboardPageComponent {}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '@presentation/views/pages/dashboard/layout/sidebar/sidebar.component';
import { NavbarComponent } from '@presentation/views/pages/dashboard/layout/navbar/navbar.component';

@Component({
  selector: 'dashboard-page',
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <sidebar></sidebar>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Navbar -->
        <navbar></navbar>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto p-6">
          <router-outlet></router-outlet>
          <!-- Aquí se renderiza products, users, etc. -->
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
