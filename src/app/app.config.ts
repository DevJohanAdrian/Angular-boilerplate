import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { authProviders } from './core/providers/auth.providers';
// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
import { appStoreProviders } from './store/app.store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Interceptores
import { authInterceptor } from '@app/core/interceptors/auth.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideRouter(routes),
    ...authProviders,
    ...appStoreProviders, // 👈 Aquí ya centralizas NgRx
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
