import { InjectionToken } from '@angular/core';
import { TokenStorageRepository } from '@domain/interfaces/token-storage.repository';

export const TOKEN_STORAGE_REPOSITORY = new InjectionToken<TokenStorageRepository>('TOKEN_STORAGE_REPOSITORY');