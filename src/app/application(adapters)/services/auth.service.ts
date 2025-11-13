import { SignInUseCase } from '@domain/usecases/sign-in.usecase';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthResult } from '@domain/value-objects/auth-result';
import { Injectable, Inject } from '@angular/core';
import { TokenStorageRepository } from '@domain/interfaces/token-storage.repository';
import { TOKEN_STORAGE_REPOSITORY } from '@core/tokens/token-storage.token';
import { tap } from 'rxjs/operators';

/**
 * Servicio de aplicación que orquesta los casos de uso de autenticación
 * Ahora respeta la inversión de dependencias al depender de abstracciones
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    @Inject(TOKEN_STORAGE_REPOSITORY)
    private readonly tokenStorage: TokenStorageRepository,
  ) {}

  private _isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  /** Observable público para el estado de autenticación */
  readonly isAuthenticated$ = this._isAuthenticated$.asObservable();

  /** Verifica si hay token almacenado */
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // login(email: string, password: string) {
  //   return this.signInUseCase.execute(email, password);
  //   //  .catch(err => {
  //   //   // Aquí puedes mapear errores de Infra a algo que entienda la UI
  //   //   throw new Error("Login failed. Try again.");
  //   // });
  // }

  signIn(email: string, password: string): Observable<AuthResult> {
    return this.signInUseCase.execute(email, password).pipe(
      tap((authResult) => {
        // Guardar el token automáticamente después de una autenticación exitosa
        this.saveToken(authResult.token);
        this._isAuthenticated$.next(true); // ✅ notifica al guard inmediatamente
      }),
    );
  }

  // Métodos que delegan al repositorio de almacenamiento
  saveToken(token: string): void {
    this.tokenStorage.saveToken(token);
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  clearToken(): void {
    this.tokenStorage.clearToken();
  }

  isAuthenticated(): boolean {
    return this.tokenStorage.hasValidToken();
  }

   /** Cierra sesión */
  logout() {
    localStorage.removeItem('access_token');
    this._isAuthenticated$.next(false);
  }

  // register(name: string, email: string, password: string) {
  //   return this.signUpUseCase.execute(name, email, password);
  // }
}
