import { User } from '../entities/user.entity';

/**
 * Value Object que representa el resultado de una autenticación exitosa
 * Encapsula tanto el usuario como la información del token
 * Este objeto pertenece al dominio y es inmutable
 */
export class AuthResult {
  constructor(
    public readonly user: User,
    public readonly token: string,
    // public readonly expiresIn?: number,
    public readonly refreshToken?: string
  ) {
    this.validateToken(token);
  }

  private validateToken(token: string): void {
    if (!token || token.trim().length === 0) {
      throw new Error('Token cannot be empty');
    }
  }

  /**
   * Verifica si el token ha expirado basado en expiresIn
   */
  // isTokenExpired(): boolean {
  //   if (!this.expiresIn) return false;
    
  //   // Asumiendo que expiresIn es timestamp de expiración
  //   return Date.now() > this.expiresIn;
  // }

  /**
   * Factory method para crear desde respuesta de API
   */
  static create(user: User, token: string, refreshToken?: string): AuthResult {
    return new AuthResult(user, token, refreshToken);
  }
}

