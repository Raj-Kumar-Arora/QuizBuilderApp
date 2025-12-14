import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { LoginRequest } from '../models/auth/login-request.model';
import { RegisterRequest } from '../models/auth/register-request.model';
import { AuthResponse } from '../models/auth/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7175/api/auth';

  constructor(private http: HttpClient) { }

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req)
      .pipe(tap(res => this.setToken(res.token)));
  }

  register(req: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, req);
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
