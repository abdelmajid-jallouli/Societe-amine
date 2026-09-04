import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login-page">
      <div class="login-panel">
        <div class="brand">Cabinet Comptabilité</div>
        <p class="subtitle">Créer un compte client</p>

        <mat-card class="login-card">
          <mat-card-header>
            <mat-card-title>Inscription</mat-card-title>
            <mat-card-subtitle>Complétez vos informations</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div *ngIf="errorMessage" class="error-banner" role="alert">
              <mat-icon>error</mat-icon>
              <span>{{ errorMessage }}</span>
            </div>

            <form [formGroup]="form" (ngSubmit)="submit()" class="login-form">
              <mat-form-field appearance="outline">
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="firstName" />
                <mat-error *ngIf="form.controls.firstName.hasError('required')">Prénom requis</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput formControlName="lastName" />
                <mat-error *ngIf="form.controls.lastName.hasError('required')">Nom requis</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" autocomplete="email" />
                <mat-error *ngIf="form.controls.email.hasError('required')">Email requis</mat-error>
                <mat-error *ngIf="form.controls.email.hasError('email')">Format email invalide</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mot de passe</mat-label>
                <input matInput type="password" formControlName="password" autocomplete="new-password" />
                <mat-error *ngIf="form.controls.password.hasError('required')">Mot de passe requis</mat-error>
                <mat-error *ngIf="form.controls.password.hasError('minlength')">8 caractères minimum</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Téléphone (facultatif)</mat-label>
                <input matInput formControlName="phone" />
              </mat-form-field>

              <button mat-flat-button color="primary" type="submit" [disabled]="loading || form.invalid">
                <mat-progress-spinner *ngIf="loading" mode="indeterminate" diameter="18"></mat-progress-spinner>
                <span>{{ loading ? 'Inscription...' : "S'inscrire" }}</span>
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; min-height: 100vh; }
      .login-page { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: linear-gradient(135deg,#07111f 0%,#0b1f3a 45%,#123c6b 100%); }
      .login-panel { width: min(100%, 520px); }
      .brand { color: #ffffff; font-size: 2rem; font-weight: 700; }
      .subtitle { margin: 8px 0 24px; color: rgba(255,255,255,0.8); }
      .login-card { border-radius: var(--app-border-radius); box-shadow: 0 24px 60px rgba(3,12,25,0.28); }
      .login-form { display: grid; gap: 16px; margin-top: 16px; }
      .login-form mat-form-field, .login-form button { width: 100%; }
      .error-banner { display:flex; align-items:center; gap:10px; padding:12px 14px; margin-bottom:16px; border-radius: var(--app-border-radius); background:#fdecea; color:#9b1c1c; }
      button { height: 48px; border-radius: var(--app-border-radius); }
      mat-progress-spinner { display:inline-block; margin-right:10px; vertical-align: middle; }
    `
  ]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['']
  });

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const payload = this.form.getRawValue();

    // Use AuthService to call registration endpoint (keeps base URL centralized)
    this.authService.registerClient(payload).subscribe({
      next: () => {
        this.loading = false;
        void this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = err.status === 0 ? 'Impossible de contacter le serveur backend.' : (err.error?.message || 'Erreur lors de l inscription');
      }
    });
  }
}
