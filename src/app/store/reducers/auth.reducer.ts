import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '@domain/entities/user.entity';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: any;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.signIn, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.signInSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),
  on(AuthActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.signOut, (state) => initialAuthState),
  on(AuthActions.signOutSuccess, (state) => ({
    ...state,
    user: null,
    token: null,
    loading: false,
    error: null,
  })),
  on(AuthActions.signOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
