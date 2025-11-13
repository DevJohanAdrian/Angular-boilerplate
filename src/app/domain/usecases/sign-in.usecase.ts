import { AuthRepository } from '../interfaces/auth.repository';
import { Inject } from '@angular/core';
import { AUTH_REPOSITORY } from '@core/tokens/auth-repository.token';
import { Observable, throwError } from 'rxjs';
import { AuthResult } from '../value-objects/auth-result';
import { User } from '../entities/user.entity';
import { map, catchError } from 'rxjs/operators';

/**
 * Caso de uso para el inicio de sesión
 * Contiene la lógica de negocio específica para esta operación
 */
export class SignInUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY) private authRepository: AuthRepository,
  ) {}

  execute(email: string, password: string): Observable<AuthResult> {
    // Validaciones de reglas de negocio ANTES de llamar al repositorio
    this.validateInput(email, password);

    return this.authRepository.signIn(email, password).pipe(
      map((authResult) => {
        // Aplicar reglas de negocio post-autenticación
        this.validateUserCanSignIn(authResult.user);
        // this.validateAuthResult(authResult);

        return authResult;
      }),
      catchError((error) => {
        // Mapear errores de infraestructura a errores de dominio
        return throwError(() => this.mapToDomainError(error));
      }),
    );
  }
  // only for email login
  // private validateInput(email: string, password: string): void {
  //   if (!email || !email.trim()) {
  //     throw new Error('Email or username is required');
  //   }

  //   if (!password || password.length < 6) {
  //     throw new Error('Password must be at least 6 characters long');
  //   }

  //   // Validación adicional de formato de email
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     throw new Error('Invalid email format');
  //   }
  // }

  private validateInput(identifier: string, password: string): void {
    if (!identifier || !identifier.trim()) {
      throw new Error('Email or username is required');
    }

    // Validar longitud mínima del password
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Detectar si el input parece un email (tiene @ y un dominio)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(identifier);

    // Validar formato si es email
    if (isEmail) {
      // ya validado por el regex, pero se puede reforzar:
      if (!emailRegex.test(identifier)) {
        throw new Error('Invalid email format');
      }
    } else {
      // Si no es email, tratamos el input como username
      if (identifier.length < 3 || identifier.length > 20) {
        throw new Error('Username must be between 3 and 20 characters long');
      }

      // Solo letras, números, puntos y guiones bajos
      const usernameRegex = /^[a-zA-Z0-9._-]+$/;
      if (!usernameRegex.test(identifier)) {
        throw new Error(
          'Username can only contain letters, numbers, dots, and underscores',
        );
      }
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

  // private validateAuthResult(authResult: AuthResult): void {
  //   if (authResult.isTokenExpired()) {
  //     throw new Error('Received expired token');
  //   }
  // }

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
