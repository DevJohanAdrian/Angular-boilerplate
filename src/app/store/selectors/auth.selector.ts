import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.user && !!state.token
);
