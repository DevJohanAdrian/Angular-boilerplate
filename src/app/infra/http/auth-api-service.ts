import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '@domain/interfaces/auth.repository';
import { User } from '@domain/entities/user.entity';

@Injectable()
export class AuthApiService implements AuthRepository {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Promise<User> {
    // Implementación HTTP
    return this.http.post<User>('/api/login', { email, password }).toPromise();
  }

  signUp(name: string, email: string, password: string): Promise<User> {
    // Implementación HTTP
    return this.http.post<User>('/api/register', { name, email, password }).toPromise();
  }
}
