import { Provider } from '@angular/core';

import { AUTH_REPOSITORY } from '@core/tokens/auth-repository.token';
import { AuthApiService } from '@infra/http/auth-api-service';
import { SignInUseCase } from '@domain/usecases/sign-in.usecase';
// import { SignUpUseCase } from '@domain/usecases/sign-up.usecase';
import { AuthRepository } from '@domain/interfaces/auth.repository';
import { AuthService } from '@application/services/auth.service';

export const authProviders: Provider[] = [
  // 🔹 Repositorio
  {
    provide: AUTH_REPOSITORY,
    useClass: AuthApiService,
  },
  // 🔹 UseCases
  {
    provide: SignInUseCase,
    useFactory: (repo: AuthRepository) => new SignInUseCase(repo),
    deps: [AUTH_REPOSITORY],
  },
  // {
  //   provide: SignUpUseCase,
  //   useFactory: (repo: AuthRepository) => new SignUpUseCase(repo),
  //   deps: [AUTH_REPOSITORY],
  // },
  // 🔹 Servicios
  AuthService,
];
