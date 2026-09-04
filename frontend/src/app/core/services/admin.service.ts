import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface CreateAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AdminItem {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  createAdmin(payload: CreateAdminPayload): Observable<AdminItem> {
    return this.http.post<AdminItem>(`${environment.apiBaseUrl}/api/admin/admins`, payload);
  }

  getAdmins(page = 0, size = 20) {
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get<{ content: AdminItem[] }>(`${environment.apiBaseUrl}/api/admin/admins`, { params });
  }
}
