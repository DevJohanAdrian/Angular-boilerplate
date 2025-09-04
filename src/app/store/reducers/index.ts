import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducer';
// import { productsReducer, ProductsState } from './products.reducer';

export interface AppState {
  auth: AuthState;
  // products: ProductsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // products: productsReducer,
};
