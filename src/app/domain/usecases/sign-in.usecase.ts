import { AuthRepository } from "../interfaces/auth.repository";
import { Inject } from '@angular/core';
import { AUTH_REPOSITORY } from "@core/tokens/auth-repository.token";

export class SignInUseCase {
  constructor(@Inject(AUTH_REPOSITORY)private authRepository: AuthRepository) {}

  execute(email: string, password: string) {
    // Lógica de negocio aquí
    return this.authRepository.signIn(email, password);
  }
}
