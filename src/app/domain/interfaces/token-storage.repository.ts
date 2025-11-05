

/**
 * Abstracción para el almacenamiento de tokens
 * Esta interfaz pertenece al dominio y define el contrato
 * sin depender de detalles de implementación
 */
export abstract class TokenStorageRepository {
  abstract saveToken(token: string): void;
  abstract getToken(): string | null;
  abstract clearToken(): void;
  abstract hasValidToken(): boolean;
}