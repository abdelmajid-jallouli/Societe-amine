import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, AuthState } from '../models/auth.models';

interface LoginPayload {
  email: string;
  password: string;
}

const STORAGE_KEY = 'comptabilite-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly state = signal<AuthState>(this.loadState());
  private readonly loggedIn = computed(() => !!this.state().token);
  private readonly currentRole = computed(() => this.state().role);

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/api/auth/login`, { email, password } as LoginPayload)
      .pipe(tap((response) => this.setState(response)));
  }

  registerClient(payload: { firstName: string; lastName: string; email: string; password: string; phone?: string; }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/api/auth/register`, payload)
      .pipe(tap((response) => this.setState(response)));
  }

  logout(): void {
    // Clearing local auth state ensures the UI and HTTP interceptor stop trusting an expired token.
    this.clearState();
    void this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  getRole(): 'ADMIN' | 'CLIENT' | null {
    return this.currentRole();
  }

  getFullName(): string | null {
    return this.state().fullName;
  }

  getToken(): string | null {
    return this.state().token;
  }

  private setState(response: AuthResponse): void {
    const nextState: AuthState = {
      token: response.token,
      role: response.role,
      fullName: response.fullName
    };

    this.state.set(nextState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  private clearState(): void {
    this.state.set({ token: null, role: null, fullName: null });
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadState(): AuthState {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { token: null, role: null, fullName: null };
    }

    try {
      return JSON.parse(raw) as AuthState;
    } catch {
      return { token: null, role: null, fullName: null };
    }
  }
}
