import { AuthResult } from "../value-objects/auth-result";
import { Observable } from 'rxjs';

/**
 * Contrato abstracto para el repositorio de autenticación
 * Define las operaciones de autenticación sin depender de detalles de implementación
 */
export abstract class AuthRepository {
  abstract signIn(email: string, password: string): Observable<AuthResult>;
}