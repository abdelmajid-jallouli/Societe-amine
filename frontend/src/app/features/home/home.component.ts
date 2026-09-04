import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CompanyProfileService, CompanyProfileResponse } from '../../core/services/company-profile.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
  template: `
    <main class="home-shell">
      <header class="topbar">
        <div class="brand" routerLink="/home" aria-label="Accueil client">
          <div class="brand-mark">SA</div>
          <div class="brand-copy">
            <span class="brand-name">Société Amine</span>
            <span class="brand-subtitle">Gestion des entreprises</span>
          </div>
        </div>

        <div class="topbar-meta">
          <span class="welcome-chip">Bonjour, {{ firstName }}</span>
          <button mat-stroked-button type="button" class="logout-btn" (click)="logout()">Se déconnecter</button>
        </div>
      </header>

      <section class="hero-card">
        <div class="hero-content">
          <span class="eyebrow">Bienvenue</span>
          <h1>Bonjour, {{ firstName }}</h1>
          <p>
            Voici votre espace client dédié à la gestion et au suivi de votre entreprise.
            Vous pouvez consulter votre fiche entreprise, mettre à jour les informations clés et garder un œil sur l'état de vos dossiers.
          </p>
          <div class="hero-actions">
            <button mat-flat-button color="primary" class="primary-btn" type="button" routerLink="/client/company-profile">
              {{ profile ? 'Voir / Modifier ma fiche' : 'Créer ma fiche entreprise' }}
            </button>
          </div>
        </div>
        <div class="hero-panel">
          <span class="panel-label">Cabinet</span>
          <strong>Société Amine</strong>
          <p>Comptabilité, fiscalité, paie et accompagnement de gestion pour les entreprises en Tunisie.</p>
        </div>
      </section>

      <section class="about-section">
        <div class="section-heading">
          <span class="eyebrow">À propos</span>
          <h2>Un cabinet pensé pour les besoins des entreprises</h2>
        </div>
        <div class="about-grid">
          <div class="about-card card">
            <p>
              Société Amine de Gestion des Entreprises accompagne les sociétés tunisiennes sur la comptabilité générale,
              les déclarations fiscales, la gestion de paie et le conseil opérationnel.
            </p>
            <p>
              Le positionnement du cabinet est centré sur la rigueur, la proximité et la lecture claire des chiffres pour aider les dirigeants à prendre des décisions rapides.
            </p>
          </div>

          <div class="info-card card highlight">
            <span class="mini-label">Nos services</span>
            <ul>
              <li>Comptabilité générale</li>
              <li>Déclarations fiscales</li>
              <li>Gestion de paie</li>
              <li>Conseil & tableaux de bord</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="company-section">
        <div class="section-heading compact">
          <span class="eyebrow">Mon Entreprise</span>
          <h2>Fiche de votre société</h2>
        </div>

        <ng-container *ngIf="profile === null; else hasProfile">
          <div class="card empty-state">
            <div class="empty-copy">
              <h3>Votre fiche entreprise n'est pas encore créée.</h3>
              <p>
                Renseignez les informations clés de votre société pour compléter votre profil comptable, votre gestion et vos documents associés.
              </p>
            </div>
            <button mat-flat-button color="primary" class="primary-btn" type="button" routerLink="/client/company-profile">
              Créer ma fiche entreprise
            </button>
          </div>
        </ng-container>

        <ng-template #hasProfile>
          <div class="card profile-card" *ngIf="profile">
            <div class="profile-main">
              <div>
                <span class="mini-label">Entreprise</span>
                <h3>{{ profile.raisonSociale || 'Entreprise non renseignée' }}</h3>
              </div>
              <span class="status-pill" [class.complete]="completionRatio >= 70" [class.pending]="completionRatio < 70">
                {{ completionRatio >= 70 ? 'Complète' : 'En cours' }}
              </span>
            </div>

            <div class="profile-grid">
              <div>
                <span class="meta-label">Ville</span>
                <strong>{{ profile.ville || '—' }}</strong>
              </div>
              <div>
                <span class="meta-label">Matricule fiscal</span>
                <strong>{{ profile.matriculeFiscal || '—' }}</strong>
              </div>
              <div>
                <span class="meta-label">Activité</span>
                <strong>{{ profile.activite || '—' }}</strong>
              </div>
              <div>
                <span class="meta-label">Progression</span>
                <strong>{{ completionRatio }}%</strong>
              </div>
            </div>

            <div class="progress-bar" aria-label="Progression de la fiche entreprise">
              <span [style.width.%]="completionRatio"></span>
            </div>

            <div class="profile-actions">
              <button mat-flat-button color="primary" class="primary-btn" type="button" routerLink="/client/company-profile">
                Voir / Modifier
              </button>
            </div>
          </div>
        </ng-template>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: linear-gradient(180deg, #f5f8fc 0%, #edf4ff 100%);
        padding: 24px 16px 48px;
      }

      .home-shell {
        width: min(100%, 1100px);
        margin: 0 auto;
        display: grid;
        gap: 24px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 18px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(11, 31, 58, 0.08);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06);
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: inherit;
        cursor: pointer;
      }

      .brand-mark {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: linear-gradient(135deg, #2f6fbd, #0b1f3a);
        color: #fff;
        font-weight: 700;
        font-size: 0.85rem;
      }

      .brand-copy {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }

      .brand-name {
        font-size: 1rem;
        font-weight: 700;
        color: #0b1f3a;
      }

      .brand-subtitle {
        font-size: 0.72rem;
        color: #64748b;
      }

      .topbar-meta {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .welcome-chip {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 999px;
        background: #edf4ff;
        color: #0b1f3a;
        font-size: 0.85rem;
        font-weight: 700;
      }

      .logout-btn {
        border-radius: 999px;
        font-weight: 700;
        color: #0b1f3a;
      }

      .hero-card {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(220px, 0.8fr);
        gap: 20px;
        padding: 28px;
        border-radius: 24px;
        background: linear-gradient(135deg, rgba(7, 17, 31, 0.98), rgba(11, 31, 58, 0.9));
        box-shadow: 0 18px 42px rgba(11, 31, 58, 0.15);
        color: #fff;
      }

      .hero-content {
        display: grid;
        gap: 12px;
      }

      .eyebrow {
        display: inline-block;
        font-size: 0.76rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #93c5fd;
        font-weight: 700;
      }

      .hero-content h1 {
        margin: 0;
        font-size: clamp(2.1rem, 4vw, 3.4rem);
        line-height: 1.02;
        letter-spacing: -0.05em;
      }

      .hero-content p {
        margin: 0;
        max-width: 660px;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.82);
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 8px;
      }

      .primary-btn {
        height: 46px;
        border-radius: 999px;
        font-weight: 700;
        letter-spacing: 0.01em;
        background: linear-gradient(135deg, #2f6fbd, #0b1f3a) !important;
        color: #fff !important;
        box-shadow: 0 18px 40px rgba(11, 31, 58, 0.18);
      }

      .hero-panel {
        display: grid;
        align-content: center;
        gap: 12px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        padding: 22px;
        backdrop-filter: blur(12px);
      }

      .panel-label,
      .mini-label,
      .meta-label {
        display: inline-block;
        font-size: 0.72rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #9bb8dd;
        font-weight: 700;
      }

      .hero-panel strong {
        font-size: 1.4rem;
        color: #ffffff;
      }

      .hero-panel p {
        margin: 0;
        color: rgba(255, 255, 255, 0.82);
        line-height: 1.7;
      }

      .about-section,
      .company-section {
        display: grid;
        gap: 18px;
      }

      .section-heading {
        display: grid;
        gap: 6px;
      }

      .section-heading h2 {
        margin: 0;
        font-size: clamp(1.7rem, 3vw, 2.5rem);
        line-height: 1.14;
        color: #0b1f3a;
        letter-spacing: -0.04em;
      }

      .about-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
        gap: 18px;
      }

      .card {
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.96);
        border: 1px solid rgba(11, 31, 58, 0.08);
        box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);
      }

      .about-card,
      .info-card,
      .empty-state,
      .profile-card {
        padding: 24px;
      }

      .about-card p {
        margin: 0 0 16px;
        line-height: 1.8;
        color: #334155;
      }

      .about-card p:last-child {
        margin-bottom: 0;
      }

      .highlight {
        background: linear-gradient(180deg, #f7fbff, #edf4ff);
      }

      .info-card ul {
        margin: 14px 0 0;
        padding-left: 18px;
        line-height: 2;
        color: #334155;
      }

      .empty-state {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
      }

      .empty-copy {
        display: grid;
        gap: 8px;
      }

      .empty-copy h3,
      .profile-main h3 {
        margin: 0;
        color: #0b1f3a;
        font-size: 1.7rem;
      }

      .empty-copy p {
        margin: 0;
        color: #475569;
        line-height: 1.7;
      }

      .profile-card {
        display: grid;
        gap: 18px;
      }

      .profile-main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 0.8rem;
        font-weight: 700;
      }

      .status-pill.complete {
        background: #eafaf1;
        color: #0f8a52;
      }

      .status-pill.pending {
        background: #eef2f7;
        color: #475569;
      }

      .profile-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
      }

      .profile-grid > div {
        display: grid;
        gap: 6px;
        padding: 14px 16px;
        border-radius: 16px;
        background: #f8fbff;
        border: 1px solid rgba(11, 31, 58, 0.06);
      }

      .profile-grid strong {
        color: #0b1f3a;
        font-size: 1.02rem;
      }

      .progress-bar {
        width: 100%;
        height: 10px;
        background: #edf2f7;
        border-radius: 999px;
        overflow: hidden;
      }

      .progress-bar span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, #2f6fbd, #0b1f3a);
      }

      .profile-actions {
        display: flex;
        justify-content: flex-end;
      }

      @media (max-width: 900px) {
        .hero-card,
        .about-grid {
          grid-template-columns: 1fr;
        }

        .profile-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 768px) {
        .topbar,
        .empty-state,
        .profile-main {
          flex-direction: column;
          align-items: flex-start;
        }

        .topbar-meta {
          width: 100%;
          justify-content: space-between;
        }

        .logout-btn,
        .primary-btn {
          width: 100%;
        }

        .empty-state,
        .profile-actions {
          display: grid;
          width: 100%;
        }

        .profile-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly profileSvc = inject(CompanyProfileService);

  profile: CompanyProfileResponse | null | undefined = undefined;

  constructor() {
    this.loadProfile();
  }

  get firstName(): string {
    const name = this.authService.getFullName();
    if (!name) return 'Client';
    return name.split(' ')[0];
  }

  get completionRatio(): number {
    if (!this.profile) return 0;

    const fields = [
      this.profile.raisonSociale,
      this.profile.enseigne,
      this.profile.email,
      this.profile.adresse,
      this.profile.ville,
      this.profile.activite,
      this.profile.matriculeFiscal,
      this.profile.telephoneFax
    ];

    const completed = fields.filter((value) => !!value && String(value).trim().length > 0).length;
    return Math.min(100, Math.round((completed / fields.length) * 100));
  }

  private loadProfile(): void {
    this.profileSvc.getMyProfile().subscribe({
      next: (res) => {
        this.profile = res ?? null;
      },
      error: (err) => {
        if (err.status === 404 || err.status === 204) {
          this.profile = null;
        } else {
          console.error(err);
          this.profile = null;
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
