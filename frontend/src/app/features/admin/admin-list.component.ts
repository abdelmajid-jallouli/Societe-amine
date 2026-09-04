import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService, AdminItem } from '../../core/services/admin.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tw-p-6">
      <h3>Liste des administrateurs</h3>
      <table>
        <thead><tr><th>Nom</th><th>Email</th><th>Rôle</th></tr></thead>
        <tbody>
          <tr *ngFor="let a of admins">
            <td>{{ a.fullName }}</td>
            <td>{{ a.email }}</td>
            <td>{{ a.role }}</td>
          </tr>
        </tbody>
      </table>
      <button (click)="load()">Actualiser</button>
    </div>
  `
})
export class AdminListComponent implements OnInit {
  admins: AdminItem[] = [];

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.admin.getAdmins().subscribe(res => this.admins = res.content || []);
  }
}
