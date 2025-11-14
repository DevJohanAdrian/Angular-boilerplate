import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '@application/services/auth.service';
import { SignInUseCase } from '@app/domain/usecases/sign-in.usecase';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

export const signIn$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), signInUseCase= inject(SignInUseCase), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap(({ email, password }) =>
        signInUseCase.execute(email, password).pipe(
          tap((authResult) => {
            // Guardar el token automáticamente después de una autenticación exitosa
            authService.saveToken(authResult.token);
          }),
          map((authResult) => AuthActions.signInSuccess({ 
            user: authResult.user, 
            token: authResult.token 
          })),
          catchError((error) => of(AuthActions.signInFailure({ error })))
        )
        
      )
    ),
  { functional: true }
);

export const redirectAfterLogin$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(AuthActions.signInSuccess),
      tap(() => {
        router.navigate(['/dashboard']);
      })
    ),
  { functional: true, dispatch: false }
);

export const signOut$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.signOut),
      tap(() => {
        // Limpiar el token al cerrar sesión
        authService.clearToken();
        router.navigateByUrl('/auth/sign-in');
      })
    ),
  { functional: true, dispatch: false }
);
