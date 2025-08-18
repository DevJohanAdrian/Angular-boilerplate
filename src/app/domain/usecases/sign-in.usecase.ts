import { AuthRepository } from "../interfaces/auth.repository";
import { Inject } from '@angular/core';
import { AUTH_REPOSITORY } from "@core/tokens/auth-repository.token";
import { Observable } from "rxjs";
import { User } from "../entities/user.entity";

export class SignInUseCase {
  constructor(@Inject(AUTH_REPOSITORY)private authRepository: AuthRepository) {}

  // execute(email: string, password: string) {
  //   // Lógica de negocio aquí
  //   return this.authRepository.signIn(email, password);
  // }

   execute(email: string, password: string): Observable<User> {
    return this.authRepository.signIn(email, password);
  }
}
