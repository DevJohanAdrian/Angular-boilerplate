import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authProviders } from './core/providers/auth.providers';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Interceptores
import { authInterceptor } from '@app/core/http/interceptors/auth.interceptor';
import { errorInterceptor } from '@app/core/http/interceptors/error.interceptor';

// Store
import { appStoreProviders } from '@app/application(adapters)/store/app.store';

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
