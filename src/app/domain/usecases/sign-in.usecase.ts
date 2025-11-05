import { AuthRepository } from "../interfaces/auth.repository";
import { Inject } from '@angular/core';
import { AUTH_REPOSITORY } from "@core/tokens/auth-repository.token";
import { Observable, throwError } from "rxjs";
import { AuthResult } from "../value-objects/auth-result";
import { User } from "../entities/user.entity";
import { map, catchError } from "rxjs/operators";

/**
 * Caso de uso para el inicio de sesión
 * Contiene la lógica de negocio específica para esta operación
 */
export class SignInUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepository: AuthRepository) {}

  execute(email: string, password: string): Observable<AuthResult> {
    // Validaciones de reglas de negocio ANTES de llamar al repositorio
    this.validateInput(email, password);

    return this.authRepository.signIn(email, password).pipe(
      map(authResult => {
        // Aplicar reglas de negocio post-autenticación
        this.validateUserCanSignIn(authResult.user);
        this.validateAuthResult(authResult);
        
        return authResult;
      }),
      catchError(error => {
        // Mapear errores de infraestructura a errores de dominio
        return throwError(() => this.mapToDomainError(error));
      })
    );
  }

  private validateInput(email: string, password: string): void {
    if (!email || !email.trim()) {
      throw new Error('Email is required');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Validación adicional de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validateUserCanSignIn(user: User): void {
    if (!user.isActive) {
      throw new Error('User account is deactivated');
    }

    // Ejemplo: validar que el usuario tenga al menos un rol válido
    if (user.roles.length === 0) {
      throw new Error('User has no assigned roles');
    }
  }

  private validateAuthResult(authResult: AuthResult): void {
    if (authResult.isTokenExpired()) {
      throw new Error('Received expired token');
    }
  }

  private mapToDomainError(error: any): Error {
    // Mapear errores específicos de infraestructura a errores de dominio
    if (error.status === 401) {
      return new Error('Invalid credentials');
    }
    if (error.status === 429) {
      return new Error('Too many login attempts. Please try again later');
    }
    if (error.status >= 500) {
      return new Error('Authentication service is temporarily unavailable');
    }
    
    return new Error('Authentication failed');
  }
}
