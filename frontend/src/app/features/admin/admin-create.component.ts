import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="tw-p-6">
      <h3>Créer un administrateur</h3>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <input formControlName="firstName" placeholder="Prénom" />
        <input formControlName="lastName" placeholder="Nom" />
        <input formControlName="email" placeholder="Email" />
        <input formControlName="password" placeholder="Mot de passe" type="password" />
        <button type="submit" [disabled]="form.invalid">Créer</button>
      </form>
      <div *ngIf="message">{{ message }}</div>
    </div>
  `
})
export class AdminCreateComponent {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  message = '';

  constructor(private admin: AdminService) {}

  submit() {
    if (this.form.invalid) return;
    const payload = {
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      password: this.form.value.password!
    };

    this.admin.createAdmin(payload).subscribe({
      next: () => this.message = 'Administrateur créé.',
      error: (err) => this.message = err?.error?.message || 'Erreur'
    });
  }
}
