import { SignInUseCase } from "@domain/usecases/sign-in.usecase";
// import { SignUpUseCase } from "../../domain/usecases/sign-up.usecase";

export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase,
    // private signUpUseCase: SignUpUseCase
  ) {}

  login(email: string, password: string) {
    return this.signInUseCase.execute(email, password);
  }

  // register(name: string, email: string, password: string) {
  //   return this.signUpUseCase.execute(name, email, password);
  // }
}
