import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '@application/services/auth.service';
import { catchError, map, mergeMap, of } from 'rxjs';

export const signIn$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ email, password }) =>
        authService.signIn(email, password).pipe(
          map(({ user, token }) => AuthActions.signInSuccess({ user, token })),
          catchError((error) => of(AuthActions.signInFailure({ error })))
        )
      )
    ),
  { functional: true }
);
