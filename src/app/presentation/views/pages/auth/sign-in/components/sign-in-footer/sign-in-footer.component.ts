import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sign-in-footer',
  imports: [],
  template: ` <!-- Footer -->
          <div class="px-8 py-6 text-center border-t border-gray-100 bg-gray-50/50">
            <p class="text-sm text-gray-600">
              Don't have an account? 
              <a href="#" class="ml-1 font-semibold text-purple-600 transition-colors duration-200 hover:text-purple-700">
                Create one here
              </a>
            </p>
          </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFooterComponent { }
