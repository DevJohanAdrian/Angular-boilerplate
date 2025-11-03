import { createAction, props } from '@ngrx/store';
import { User } from '@domain/entities/user.entity';

export const signIn = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);

export const signInSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>(),
);

export const signInFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>(),
);

export const signOut = createAction('[Auth] Logout');

export const signOutSuccess = createAction('[Auth] Logout Success');

export const signOutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>(),
);
