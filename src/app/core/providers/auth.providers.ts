import { Provider } from '@angular/core';

import { AUTH_REPOSITORY } from '@core/tokens/auth-repository.token';
import { TOKEN_STORAGE_REPOSITORY } from '@core/tokens/token-storage.token';
import { AuthApiService } from '@infra/http/auth-api-service';
import { LocalTokenStorageService } from '@infra/storage/local-token-storage.service';
import { SignInUseCase } from '@domain/usecases/sign-in.usecase';
import { AuthRepository } from '@domain/interfaces/auth.repository';
import { TokenStorageRepository } from '@domain/interfaces/token-storage.repository';
import { AuthService } from '@application/services/auth.service';

export const authProviders: Provider[] = [
  // 🔹 Repositorios de infraestructura
  {
    provide: AUTH_REPOSITORY,
    useClass: AuthApiService,
  },
  {
    provide: TOKEN_STORAGE_REPOSITORY,
    useClass: LocalTokenStorageService,
  },
  
  // 🔹 Casos de uso de dominio
  {
    provide: SignInUseCase,
    useFactory: (repo: AuthRepository) => new SignInUseCase(repo),
    deps: [AUTH_REPOSITORY],
  },
  
  // 🔹 Servicios de aplicación
  AuthService,
];
