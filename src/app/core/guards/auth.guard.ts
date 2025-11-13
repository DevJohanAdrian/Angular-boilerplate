import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment, Route } from '@angular/router';
import { AuthService } from '@application/services/auth.service';
import { map } from 'rxjs/operators';

/**
 * AuthGuard: Protege rutas que requieren autenticación.
 * Usa el nuevo enfoque funcional con `CanMatchFn` (Angular 16+).
 */
export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      // Si no está autenticado, redirige al login
      router.navigate(['/auth/sign-in'], {
        queryParams: { redirectTo: '/' + segments.map(s => s.path).join('/') },
      });
      return false;
    })
  );
};
