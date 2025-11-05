import { Injectable } from "@angular/core";
import { AuthService } from "@application/services/auth.service";

@Injectable()
export class SignInController {
  constructor(private readonly authService: AuthService) {}

  // login(email: string, password: string) {
  //   this.authService.login(email, password)
  //     .then(user => {
  //       // Manejar éxito (redirección, guardar token, etc.)
  //     })
  //     .catch(error => {
  //       // Manejar error
  //     });
  // }

  signIn(email: string, password: string) {
    return this.authService.signIn(email, password);
  }
}
