import { Provider } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducers } from './reducers';
import { appEffects } from './effects';

export const appStoreProviders = [
  provideStore(appReducers),
  provideEffects(appEffects),
];
