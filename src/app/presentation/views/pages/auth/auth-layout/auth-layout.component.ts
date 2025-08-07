import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-layout',
  imports: [],
  template: ` <div
    class="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <div class="w-full max-w-md">
      <!-- Card Container -->
      <div
        class="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl border-white/20"
      >
        <ng-content select="[slot=header]"></ng-content>
        <ng-content select="[slot=form]"></ng-content>
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}
