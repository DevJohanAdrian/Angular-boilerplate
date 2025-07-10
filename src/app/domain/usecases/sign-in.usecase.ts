import { AuthRepository } from "../interfaces/auth.repository";

export class SignInUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(email: string, password: string) {
    // Lógica de negocio aquí
    return this.authRepository.signIn(email, password);
  }
}
