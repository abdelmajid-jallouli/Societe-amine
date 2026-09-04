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
  selector: 'app-login',
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
        <p class="subtitle">Accès sécurisé à la plateforme de gestion comptable</p>

        <mat-card class="login-card">
          <mat-card-header>
            <mat-card-title>Connexion</mat-card-title>
            <mat-card-subtitle>Entrez vos identifiants pour continuer</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div *ngIf="errorMessage" class="error-banner" role="alert">
              <mat-icon>error</mat-icon>
              <span>{{ errorMessage }}</span>
            </div>

            <form [formGroup]="form" (ngSubmit)="submit()" class="login-form">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" autocomplete="email" />
                <mat-error *ngIf="form.controls.email.hasError('required')">Email requis</mat-error>
                <mat-error *ngIf="form.controls.email.hasError('email')">Format email invalide</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mot de passe</mat-label>
                <input matInput type="password" formControlName="password" autocomplete="current-password" />
                <mat-error *ngIf="form.controls.password.hasError('required')">Mot de passe requis</mat-error>
                <mat-error *ngIf="form.controls.password.hasError('minlength')">8 caractères minimum</mat-error>
              </mat-form-field>

              <button mat-flat-button color="primary" type="submit" [disabled]="loading || form.invalid">
                <mat-progress-spinner *ngIf="loading" mode="indeterminate" diameter="18"></mat-progress-spinner>
                <span>{{ loading ? 'Connexion...' : 'Se connecter' }}</span>
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      .login-page {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: linear-gradient(135deg, #07111f 0%, #0b1f3a 45%, #123c6b 100%);
      }

      .login-panel {
        width: min(100%, 440px);
      }

      .brand {
        color: #ffffff;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      .subtitle {
        margin: 8px 0 24px;
        color: rgba(255, 255, 255, 0.8);
      }

      .login-card {
        border-radius: var(--app-border-radius);
        box-shadow: 0 24px 60px rgba(3, 12, 25, 0.28);
      }

      mat-card-header {
        padding-bottom: 8px;
      }

      .login-form {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }

      .login-form mat-form-field,
      .login-form button {
        width: 100%;
      }

      .error-banner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        margin-bottom: 16px;
        border-radius: var(--app-border-radius);
        background: #fdecea;
        color: #9b1c1c;
      }

      button {
        height: 48px;
        border-radius: var(--app-border-radius);
      }

      mat-progress-spinner {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
      }
    `
  ]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        const destination = response.role === 'ADMIN' ? '/admin/dashboard' : '/home';
        void this.router.navigateByUrl(destination);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.status === 0
          ? 'Impossible de contacter le serveur backend.'
          : 'Email ou mot de passe incorrect.';
      }
    });
  }
}
