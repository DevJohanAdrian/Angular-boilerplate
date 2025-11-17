import { Provider } from '@angular/core';
import { provideStore, META_REDUCERS } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducers } from './reducers';
import { appEffects } from './effects';
import {storageMetaReducer} from './meta-reducers/storage.metareducer';

export const appStoreProviders = [
  provideStore(appReducers, {
    metaReducers: [storageMetaReducer],   
  }),
  provideEffects(appEffects),
];
