import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="landing-shell">
      <header class="landing-header">
        <a routerLink="/" class="brand" aria-label="Société Amine de Comptabilité">
          <img src="/assets/landing/images/pixova-lite-img-logo.png" alt="Société Amine" class="brand-mark" />
          <span class="brand-copy">
            <span class="brand-name">Société Amine</span>
            <span class="brand-subtitle">de gestion des entreprises</span>
          </span>
        </a>

        <nav class="desktop-nav" aria-label="Navigation principale">
          @for (item of navigation; track item.label) {
            <a [href]="item.href">{{ item.label }}</a>
          }
          <a routerLink="/register" class="register-link">Créer un compte</a>
          <a routerLink="/login" class="login-link">Se connecter</a>
        </nav>

        <button type="button" class="menu-button" (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()" aria-label="Ouvrir le menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      @if (menuOpen()) {
        <div class="mobile-menu">
          @for (item of navigation; track item.label) {
            <a [href]="item.href" (click)="closeMenu()">{{ item.label }}</a>
          }
          <a routerLink="/register" class="mobile-register" (click)="closeMenu()">Créer un compte</a>
          <a routerLink="/login" class="mobile-login" (click)="closeMenu()">Se connecter</a>
        </div>
      }

      <section id="hero" class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="hero-kicker">Comptabilité &amp; Gestion des Entreprises</p>
          <h1>Société Amine de Gestion des Entreprises</h1>
          <p class="hero-text">
            Expertise-comptable, fiscalité, paie et accompagnement de gestion pour les entreprises en Tunisie.
            Un espace professionnel, clair et fiable pour suivre vos données comptables.
          </p>

          <div class="hero-actions">
            <a routerLink="/register" class="primary-action">Créer un compte</a>
            <a routerLink="/login" class="secondary-action">Se connecter</a>
            <a href="#services" class="secondary-action">Découvrir nos services</a>
          </div>

          <div class="hero-stats">
            <article>
              <strong>120 Rue</strong>
              <span>des Jasmins, 8050 Hammamet</span>
            </article>
            <article>
              <strong>72 278 831</strong>
              <span>numéro de téléphone</span>
            </article>
            <article>
              <strong>s-amine&#64;gnet.tn</strong>
              <span>adresse mail</span>
            </article>
          </div>
        </div>
      </section>

      <section id="about" class="content-section about-section">
        <div class="section-heading">
          <p class="eyebrow">À propos</p>
          <h2>Un cabinet pensé pour les besoins des entreprises</h2>
        </div>

        <div class="about-grid">
          <div class="about-copy">
            <p>
              Société Amine de Gestion des Entreprises accompagne les sociétés tunisiennes sur la comptabilité générale,
              les déclarations fiscales, la gestion de paie et le conseil opérationnel.
            </p>
            <p>
              Le positionnement du cabinet est centré sur la rigueur, la proximité et la lecture claire des chiffres
              pour aider les dirigeants à prendre des décisions rapides.
            </p>
          </div>

          <div class="about-panel">
            <div class="about-badge">Cabinet</div>
            <h3>Service, méthode et confidentialité</h3>
            <ul>
              <li>Comptabilité générale et tenue des dossiers</li>
              <li>Déclarations fiscales et obligations légales</li>
              <li>Gestion de paie et suivi social</li>
              <li>Conseil aux entreprises et tableaux de bord</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="services" class="content-section services-section">
        <div class="section-heading">
          <p class="eyebrow">Services</p>
          <h2>Les prestations principales du cabinet</h2>
        </div>

        <div class="services-grid">
          @for (service of services; track service.title) {
            <article class="service-card">
              <img [src]="service.image" [alt]="service.title" />
              <div class="service-body">
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
              </div>
            </article>
          }
        </div>
      </section>

      <section id="team" class="content-section team-section">
        <div class="section-heading">
          <p class="eyebrow">Équipe</p>
          <h2>Direction et réalisation du site web</h2>
        </div>

        <div class="team-grid">
          <article class="team-card">
          <img src="/assets/landing/images/jallouli.jpg" alt="Portrait du PDG Jallouli" />
          <div>
            <h3>Said Jallouli</h3>
            <p>
              Fondateur et PDG de Société Amine de Gestion des Entreprises. consultant en gestion des entreprises avec plus de 35 ans
              d'expérience.
            </p>
          </div>
          </article>

          <article class="team-card">
            <img src="/assets/landing/images/majdou.jpg" alt="Portrait de Majdou" />
            <div>
              <h3>Abdelmajid Jallouli</h3>
              <p>
                Développeur du site web et intégrateur de la présence en ligne du cabinet.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="contact" class="content-section contact-section">
        <div class="section-heading">
          <p class="eyebrow">Contact</p>
          <h2>Restons en contact</h2>
        </div>

        <div class="contact-grid">
          <article>
            <span>Adresse</span>
            <strong>120 Rue des Jasmins, 8050 Hammamet</strong>
          </article>
          <article>
            <span>Téléphone</span>
            <strong>72 278 831</strong>
          </article>
          <article>
            <span>Email</span>
            <strong>s-amine&#64;gnet.tn</strong>
          </article>
        </div>
        <div class="contact-grid single">
          <article>
            <span>Domaine d'activité</span>
            <strong>Comptabilité &amp; Gestion des Entreprises</strong>
          </article>
        </div>
      </section>

      <footer class="landing-footer">
        <div>
          <strong>Société Amine de Gestion des Entreprises</strong>
          <p>Comptabilité, fiscalité, paie et accompagnement des entreprises en Tunisie.</p>
        </div>
        <div>
          <p>© 2026 Société Amine. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Inter, 'Segoe UI', Arial, sans-serif;
        color: #0f172a;
      }

      .landing-shell {
        min-height: 100vh;
        background: #f6f9fd;
        scroll-behavior: smooth;
      }

      .landing-header {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem clamp(1rem, 3vw, 2rem);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(15, 23, 42, 0.06);
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
        text-decoration: none;
        color: inherit;
      }

      .brand-mark {
        width: 42px;
        height: 42px;
      }

      .brand-copy {
        display: flex;
        flex-direction: column;
        line-height: 1.05;
      }

      .brand-name {
        font-size: 1rem;
        font-weight: 700;
        color: #0b1f3a;
      }

      .brand-subtitle {
        font-size: 0.78rem;
        color: #64748b;
      }

      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 1.15rem;
      }

      .desktop-nav a {
        text-decoration: none;
        color: #334155;
        font-size: 0.95rem;
        font-weight: 500;
      }

      .register-link,
      .login-link,
      .primary-action,
      .mobile-register,
      .mobile-login {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 700;
      }

      .register-link,
      .login-link,
      .mobile-register,
      .mobile-login {
        padding: 0.8rem 1.25rem;
        background: linear-gradient(135deg, #0b1f3a, #1f4478);
        color: #fff;
        box-shadow: 0 18px 40px rgba(11, 31, 58, 0.18);
      }

      .menu-button {
        display: none;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(15, 23, 42, 0.14);
        border-radius: 14px;
        background: #fff;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 0;
      }

      .menu-button span {
        display: block;
        width: 18px;
        height: 2px;
        border-radius: 999px;
        background: #0b1f3a;
      }

      .mobile-menu {
        display: none;
        position: sticky;
        top: 73px;
        z-index: 19;
        margin: 0 1rem 1rem;
        padding: 1rem;
        background: #fff;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 24px;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
      }

      .mobile-menu a {
        display: block;
        padding: 0.85rem 0.25rem;
        text-decoration: none;
        color: #334155;
        font-weight: 600;
      }

      .hero-section {
        position: relative;
        min-height: calc(100vh - 77px);
        display: grid;
        place-items: center;
        padding: 5rem 1rem;
        background: url('/assets/landing/images/header-bg.jpg') center/cover no-repeat;
        overflow: hidden;
      }

      .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(7, 17, 31, 0.86), rgba(11, 31, 58, 0.78));
      }

      .hero-content {
        position: relative;
        z-index: 1;
        width: min(100%, 1100px);
        color: #fff;
        text-align: left;
      }

      .hero-kicker,
      .eyebrow {
        margin: 0 0 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        font-size: 0.78rem;
        color: #93c5fd;
        font-weight: 700;
      }

      .hero-content h1 {
        margin: 0;
        max-width: 11ch;
        font-size: clamp(2.8rem, 7vw, 5.75rem);
        line-height: 0.95;
        letter-spacing: -0.05em;
      }

      .hero-text {
        max-width: 680px;
        margin: 1.4rem 0 0;
        font-size: clamp(1rem, 1.8vw, 1.25rem);
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.86);
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.9rem;
        margin-top: 2rem;
      }

      .primary-action,
      .secondary-action {
        padding: 0.95rem 1.35rem;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 700;
      }

      .primary-action {
        background: linear-gradient(135deg, #2f6fbd, #0b1f3a);
        color: #fff;
        box-shadow: 0 18px 40px rgba(11, 31, 58, 0.28);
      }

      .secondary-action {
        border: 1px solid rgba(255, 255, 255, 0.24);
        color: #fff;
        background: rgba(255, 255, 255, 0.08);
      }

      .hero-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 2.5rem;
        max-width: 720px;
      }

      .hero-stats article {
        padding: 1rem 1.1rem;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(10px);
      }

      .hero-stats strong {
        display: block;
        font-size: 1.3rem;
      }

      .hero-stats span {
        color: rgba(255, 255, 255, 0.76);
        font-size: 0.92rem;
      }

      .content-section {
        width: min(100%, 1150px);
        margin: 0 auto;
        padding: 5rem 1rem;
      }

      .section-heading h2 {
        margin: 0;
        font-size: clamp(1.7rem, 4vw, 3rem);
        line-height: 1.1;
        color: #0b1f3a;
      }

      .about-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .about-copy,
      .about-panel,
      .service-card,
      .team-card,
      .contact-grid article {
        border-radius: 24px;
        background: #fff;
        border: 1px solid rgba(15, 23, 42, 0.08);
        box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
      }

      .about-copy {
        padding: 1.5rem;
        color: #334155;
        line-height: 1.85;
      }

      .about-panel {
        padding: 1.5rem;
        background: linear-gradient(180deg, #f8fbff, #eef4fb);
      }

      .about-badge {
        display: inline-flex;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: #dbeafe;
        color: #1d4f91;
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .about-panel h3,
      .service-body h3,
      .team-card h3 {
        margin: 1rem 0 0.75rem;
        color: #0b1f3a;
      }

      .about-panel ul {
        margin: 0;
        padding-left: 1.2rem;
        color: #334155;
        line-height: 1.9;
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 2rem;
      }

      .service-card {
        overflow: hidden;
      }

      .service-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
      }

      .service-body {
        padding: 1.25rem;
      }

      .service-body p {
        margin: 0;
        color: #475569;
        line-height: 1.7;
      }

      .team-card {
        display: grid;
        grid-template-columns: 96px 1fr;
        gap: 1.2rem;
        align-items: center;
        padding: 1.5rem;
        width: 100%;
        max-width: 720px;
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 2rem;
      }

      .team-card img {
        width: 96px;
        height: 96px;
        border-radius: 999px;
        object-fit: cover;
      }

      .team-card p {
        margin: 0;
        line-height: 1.75;
        color: #475569;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 2rem;
      }

      .contact-grid article {
        padding: 1.5rem;
      }

      .contact-grid span {
        display: block;
        font-size: 0.82rem;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-weight: 700;
      }

      .contact-grid strong {
        display: block;
        margin-top: 0.65rem;
        color: #0b1f3a;
      }

      .landing-footer {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 2rem 1rem 3rem;
        width: min(100%, 1150px);
        margin: 0 auto;
        color: #475569;
      }

      .landing-footer strong {
        color: #0b1f3a;
      }

      .landing-footer p {
        margin: 0.35rem 0 0;
      }

      @media (max-width: 1024px) {
        .services-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .about-grid,
        .team-grid,
        .contact-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .desktop-nav {
          display: none;
        }

        .menu-button {
          display: inline-flex;
        }

        .mobile-menu {
          display: block;
        }

        .hero-section {
          min-height: auto;
          padding: 4.5rem 1rem;
        }

        .hero-stats {
          grid-template-columns: 1fr;
        }

        .landing-footer {
          flex-direction: column;
        }
      }
    `
  ]
})
export class LandingComponent {
  readonly menuOpen = signal(false);

  readonly navigation = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Réalisé par', href: '#team' },
    { label: 'Contact', href: '#contact' }
  ];

  readonly services = [
    {
      title: 'Comptabilité générale',
      description: 'Tenue comptable, suivi des pièces et préparation des états utiles à la gestion.',
      image: '/assets/landing/images/recent-works-1-270x426.jpg'
    },
    {
      title: 'Déclarations fiscales',
      description: 'Déclarations périodiques et suivi des obligations fiscales des entreprises.',
      image: '/assets/landing/images/recent-works-2-270x426.jpg'
    },
    {
      title: 'Gestion de paie',
      description: 'Bulletins, charges sociales et gestion administrative du personnel.',
      image: '/assets/landing/images/recent-works-3-270x426.jpg'
    },
    {
      title: 'Conseil aux entreprises',
      description: 'Appui à la décision, tableaux de bord et accompagnement opérationnel.',
      image: '/assets/landing/images/recent-works-4-270x426.jpg'
    }
  ];

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
