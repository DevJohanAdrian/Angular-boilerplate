// core/tokens/auth-repository.token.ts
import { InjectionToken } from '@angular/core';
import { AuthRepository } from '@domain/interfaces/auth.repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');
