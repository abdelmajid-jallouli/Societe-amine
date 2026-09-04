import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  template: `
    <div class="admin-shell tw-min-h-screen tw-bg-slate-50 tw-text-slate-900">
      <div class="tw-flex tw-min-h-screen tw-bg-slate-50">
        <aside
          class="tw-fixed tw-inset-y-0 tw-left-0 tw-z-50 tw-flex tw-w-[290px] tw-flex-col tw-border-r tw-border-slate-200 tw-bg-white tw-transition-transform tw-duration-300 lg:tw-static lg:tw-translate-x-0"
          [class.-tw-translate-x-full]="!sidebarOpen()"
          [class.tw-translate-x-0]="sidebarOpen()"
        >
          <div class="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-slate-100 tw-px-6 tw-py-5">
            <a routerLink="/admin/dashboard" class="tw-flex tw-items-center tw-gap-3">
              <img src="/assets/admin/logo/logo-icon.svg" alt="Société Amine" class="tw-h-10 tw-w-10" />
              <span class="tw-flex tw-flex-col">
                <span class="tw-text-base tw-font-semibold tw-leading-tight tw-text-navy-900">Société Amine</span>
                <span class="tw-text-xs tw-text-slate-500">Gestion des entreprises</span>
              </span>
            </a>

            <button
              type="button"
              class="tw-inline-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-slate-200 tw-text-slate-600 lg:tw-hidden"
              (click)="sidebarOpen.set(false)"
              aria-label="Fermer le menu"
            >
              ✕
            </button>
          </div>

          <nav class="tw-flex-1 tw-space-y-1 tw-overflow-y-auto tw-p-4">
            <p class="tw-px-3 tw-pb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-slate-400">Menu</p>
            @for (item of navigation; track item.link) {
              <a
                [routerLink]="item.link"
                routerLinkActive="tw-bg-navy-50 tw-text-navy-900"
                [routerLinkActiveOptions]="{ exact: item.exact }"
                class="tw-flex tw-items-center tw-gap-3 tw-rounded-2xl tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-text-slate-600 tw-transition hover:tw-bg-slate-50 hover:tw-text-navy-900"
              >
                <span class="tw-inline-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-xl tw-bg-slate-100 tw-text-slate-600">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </a>
            }
          </nav>

          <div class="tw-border-t tw-border-slate-100 tw-p-4">
            <div class="tw-rounded-2xl tw-bg-gradient-to-br tw-from-navy-900 tw-to-navy-700 tw-p-4 tw-text-white tw-shadow-panel">
              <p class="tw-text-sm tw-font-medium tw-text-white/70">Connecté en tant que</p>
              <p class="tw-mt-1 tw-font-semibold">{{ authService.getFullName() || 'ADMIN' }}</p>
              <p class="tw-text-sm tw-text-white/70">{{ authService.getRole() || 'ADMIN' }}</p>
              <button type="button" class="tw-mt-4 tw-inline-flex tw-w-full tw-items-center tw-justify-center tw-rounded-xl tw-bg-white/10 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-transition hover:tw-bg-white/20" (click)="authService.logout()">Déconnexion</button>
            </div>
          </div>
        </aside>

        <div class="tw-flex tw-min-h-screen tw-flex-1 tw-flex-col">
          <header class="tw-sticky tw-top-0 tw-z-40 tw-border-b tw-border-slate-200 tw-bg-white/95 tw-backdrop-blur">
            <div class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-px-4 tw-py-4 lg:tw-px-6">
              <div class="tw-flex tw-items-center tw-gap-3">
                <button
                  type="button"
                  class="tw-inline-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-slate-200 tw-text-slate-700 lg:tw-hidden"
                  (click)="sidebarOpen.set(!sidebarOpen())"
                  aria-label="Ouvrir le menu"
                >
                  ☰
                </button>

                <div>
                  <p class="tw-text-sm tw-font-medium tw-text-slate-500">Société Amine de gestion des entreprises</p>
                  <h1 class="tw-text-xl tw-font-semibold tw-text-navy-900">{{ pageTitle() }}</h1>
                </div>
              </div>

              <div class="tw-flex tw-items-center tw-gap-3">
                <div class="tw-hidden tw-items-center tw-gap-2 tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-slate-50 tw-px-4 tw-py-2 md:tw-flex">
                  <span class="tw-text-slate-400">⌕</span>
                  <input class="tw-w-72 tw-border-0 tw-bg-transparent tw-text-sm tw-text-slate-700 tw-outline-none" placeholder="Rechercher un client, une facture..." />
                </div>

                <button type="button" class="tw-inline-flex tw-h-11 tw-items-center tw-gap-2 tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-px-4 tw-text-sm tw-font-medium tw-text-slate-700 tw-shadow-sm" (click)="profileMenuOpen.set(!profileMenuOpen())">
                  <span class="tw-inline-flex tw-h-8 tw-w-8 tw-items-center tw-justify-center tw-rounded-full tw-bg-navy-900 tw-text-white">SA</span>
                  <span class="tw-hidden sm:tw-inline">Admin</span>
                </button>
              </div>
            </div>

            @if (profileMenuOpen()) {
              <div class="tw-absolute tw-right-4 tw-top-[72px] tw-w-72 tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-3 tw-shadow-soft lg:tw-right-6">
                <p class="tw-px-3 tw-pb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-slate-400">Compte</p>
                <button type="button" class="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-xl tw-px-3 tw-py-3 tw-text-left tw-text-sm tw-font-medium hover:tw-bg-slate-50" (click)="authService.logout()">
                  <span>Déconnexion</span>
                  <span>↗</span>
                </button>
              </div>
            }
          </header>

          <main class="tw-flex-1 tw-p-4 lg:tw-p-6">
            <router-outlet />
          </main>
        </div>
      </div>

      @if (sidebarOpen()) {
        <button type="button" class="tw-fixed tw-inset-0 tw-z-40 tw-bg-slate-900/40 lg:tw-hidden" (click)="sidebarOpen.set(false)" aria-label="Fermer l’overlay"></button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      :host,
      :host * {
        box-sizing: border-box;
      }

      :host {
        font-family: Inter, 'Segoe UI', Arial, sans-serif;
      }

      .admin-shell {
        background: linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
      }
    `
  ]
})
export class AdminLayoutComponent {
  readonly sidebarOpen = signal(true);
  readonly profileMenuOpen = signal(false);

  readonly navigation = [
    { label: 'Tableau de bord', link: '/admin/dashboard', icon: '▦', exact: true },
    { label: 'Clients', link: '/admin/clients', icon: '◫', exact: false },
    { label: 'Factures', link: '/admin/invoices', icon: '₪', exact: false },
    { label: 'Écritures comptables', link: '/admin/entries', icon: '≋', exact: false },
    { label: 'Utilisateurs', link: '/admin/users', icon: '◉', exact: false },
    { label: 'Paramètres', link: '/admin/settings', icon: '⚙', exact: false }
  ];

  constructor(public readonly authService: AuthService) {}

  pageTitle(): string {
    const currentUrl = location.pathname;
    if (currentUrl.includes('/clients')) return 'Clients';
    if (currentUrl.includes('/invoices')) return 'Factures';
    if (currentUrl.includes('/entries')) return 'Écritures comptables';
    if (currentUrl.includes('/users')) return 'Utilisateurs';
    if (currentUrl.includes('/settings')) return 'Paramètres';
    return 'Tableau de bord';
  }
}