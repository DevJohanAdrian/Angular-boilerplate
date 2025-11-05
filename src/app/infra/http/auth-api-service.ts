import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthRepository } from '@domain/interfaces/auth.repository';
import { User } from '@domain/entities/user.entity';
import { AuthResult } from '@domain/value-objects/auth-result';
import { Observable, throwError } from 'rxjs';
import { map, catchError, timeout, retry } from 'rxjs/operators';
import { environment } from '@environments/environment';

/**
 * Implementación HTTP del repositorio de autenticación
 * Esta clase pertenece a la capa de infraestructura y maneja
 * los detalles específicos de comunicación HTTP
 */
@Injectable()
export class AuthApiService implements AuthRepository {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly REQUEST_TIMEOUT = 10000; // 10 segundos
  private readonly MAX_RETRIES = 2;

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<AuthResult> {
    const payload = { email, password };
    
    return this.http.post<ApiUserResponse>(`${this.baseUrl}/sign-in`, payload).pipe(
      timeout(this.REQUEST_TIMEOUT),
      retry(this.MAX_RETRIES),
      map(response => this.mapApiResponseToAuthResult(response)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Mapea la respuesta de la API al AuthResult de dominio
   * Esto aísla el dominio de los detalles de la API externa
   */
  private mapApiResponseToAuthResult(apiResponse: ApiUserResponse): AuthResult {
    // Crear la entidad User usando el factory method
    const user = User.fromApiResponse(apiResponse.user);
    
    // Calcular timestamp de expiración si viene expires_in
    const expiresIn = apiResponse.expires_in 
      ? Date.now() + (apiResponse.expires_in * 1000)
      : undefined;
    
    // Crear y retornar AuthResult
    return AuthResult.create(
      user,
      apiResponse.token,
      expiresIn,
      apiResponse.refresh_token
    );
  }

  /**
   * Maneja errores HTTP y los convierte en errores más específicos
   * para que las capas superiores puedan manejarlos apropiadamente
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Invalid request data';
          break;
        case 401:
          errorMessage = 'Invalid credentials';
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'Authentication service not found';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        case 503:
          errorMessage = 'Service temporarily unavailable';
          break;
        default:
          errorMessage = `Server error: ${error.status}`;
      }
    }

    console.error('AuthApiService Error:', {
      status: error.status,
      message: errorMessage,
      url: error.url,
      timestamp: new Date().toISOString()
    });

    return throwError(() => new Error(errorMessage));
  }
}

/**
 * Interfaces para tipar las respuestas de la API
 * Estas interfaces representan el contrato con la API externa
 */
interface ApiUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    roles?: string[];
    is_active?: boolean;
    created_at?: string;
  };
  token: string;
  expires_in?: number;
  refresh_token?: string;
}
