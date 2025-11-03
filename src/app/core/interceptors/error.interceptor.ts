import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          // Token inválido o expirado
          console.warn('Token inválido o sesión expirada');
          router.navigate(['/sign-in']);
          break;
        case 403:
          console.error('No tienes permisos para esta acción');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error HTTP:', error);
      }

      return throwError(() => error);
    })
  );
};
