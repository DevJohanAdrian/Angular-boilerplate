import { createAction, props } from '@ngrx/store';
import { User } from '@domain/entities/user.entity';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>(),
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ user: User; token: string }>(),
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure',
  props<{ error: any }>(),
);

export const signOut = createAction('[Auth] Sign Out');

export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const signOutFailure = createAction(
  '[Auth] Sign Out Failure',
  props<{ error: any }>(),
);



