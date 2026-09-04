export interface AuthResponse {
  token: string;
  role: 'ADMIN' | 'CLIENT';
  fullName: string;
}

export interface AuthState {
  token: string | null;
  role: 'ADMIN' | 'CLIENT' | null;
  fullName: string | null;
}
