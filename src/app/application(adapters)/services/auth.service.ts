import { SignInUseCase } from "@domain/usecases/sign-in.usecase";
// import { SignUpUseCase } from "../../domain/usecases/sign-up.usecase";

export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase,
    // private signUpUseCase: SignUpUseCase
  ) {}

  login(email: string, password: string) {
    return this.signInUseCase.execute(email, password);
    //  .catch(err => {
    //   // Aquí puedes mapear errores de Infra a algo que entienda la UI
    //   throw new Error("Login failed. Try again.");
    // });
  }

  // register(name: string, email: string, password: string) {
  //   return this.signUpUseCase.execute(name, email, password);
  // }
}
