
import { inject, Injectable } from '@angular/core';
import { Store,  } from '@ngrx/store';
import * as AuthActions from '@application/store/actions/auth.actions';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '@application/store/selectors/auth.selector';


@Injectable()
export class AuthController {
  private store = inject(Store);

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  authenticated$ = this.store.select(selectIsAuthenticated);

  onSignIn(email: string, password: string) {
    this.store.dispatch(AuthActions.signIn({ email, password }));
  }

  onSignOut() {
    this.store.dispatch(AuthActions.signOut());
  }
}




// Ya no es necesario este controlador directo ya que ahora usamos NgRx para manejar el estado de autenticación
// import { Injectable } from '@angular/core';
// import { AuthService } from '@application/services/auth.service';

// @Injectable()
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}


//   signIn(email: string, password: string) {
//     return this.authService.signIn(email, password);
//   }
  
//   logOut() {
//     return this.authService.logout();
//   }
// }

