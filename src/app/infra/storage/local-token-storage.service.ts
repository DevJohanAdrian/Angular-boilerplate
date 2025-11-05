import { Injectable } from '@angular/core';
import { TokenStorageRepository } from '@domain/interfaces/token-storage.repository';

/**
 * Implementación concreta del almacenamiento de tokens usando localStorage
 * Esta clase pertenece a la capa de infraestructura
 */
@Injectable()
export class LocalTokenStorageService implements TokenStorageRepository {
  private readonly TOKEN_KEY = 'access_token';

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Aquí podrías agregar lógica para verificar si el token no ha expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}