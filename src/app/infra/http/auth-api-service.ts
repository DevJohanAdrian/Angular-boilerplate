import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '@domain/interfaces/auth.repository';
import { User } from '@domain/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApiService implements AuthRepository {
  private readonly baseUrl = '/api/auth';
  constructor(private http: HttpClient) {}

  // signIn(email: string, password: string): Promise<User> {
  //   // Implementación HTTP
  //   return this.http.post<User>('/api/login', { email, password }).toPromise()  as Promise<User>;
  // }

  // signUp(name: string, email: string, password: string): Promise<User> {
  //   // Implementación HTTP
  //   return this.http.post<User>('/api/register', { name, email, password }).toPromise()  as Promise<User>;
  // }

  signIn(email: string, password: string): Observable<User> {
    console.log('AuthApiService: signIn called with', email, password);
    return this.http.post<User>(`${this.baseUrl}/sign-in`, { email, password });
  }


}
