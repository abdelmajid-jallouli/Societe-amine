import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  template: `
    <main class="tw-space-y-6">
      <section class="tw-grid tw-gap-4 sm:tw-grid-cols-2 xl:tw-grid-cols-4">
        @for (item of metrics; track item.label) {
          <article class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-5 tw-shadow-soft">
            <div class="tw-flex tw-items-center tw-justify-between tw-gap-4">
              <div>
                <p class="tw-text-sm tw-font-medium tw-text-slate-500">{{ item.label }}</p>
                <h2 class="tw-mt-2 tw-text-3xl tw-font-bold tw-text-navy-900">{{ item.value }}</h2>
              </div>
              <div class="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-2xl tw-bg-navy-50 tw-text-navy-700">
                <span class="tw-text-lg tw-font-semibold">{{ item.delta }}</span>
              </div>
            </div>
            <p class="tw-mt-4 tw-text-sm tw-text-slate-500">{{ item.description }}</p>
          </article>
        }
      </section>

      <section class="tw-grid tw-gap-6 xl:tw-grid-cols-3">
        <article class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-soft xl:tw-col-span-2">
          <div class="tw-flex tw-items-center tw-justify-between tw-gap-4">
            <div>
              <h2 class="tw-text-xl tw-font-semibold tw-text-navy-900">Flux de facturation</h2>
              <p class="tw-mt-1 tw-text-sm tw-text-slate-500">Vue synthétique des encaissements et des factures émises.</p>
            </div>
            <span class="tw-rounded-full tw-bg-navy-50 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-navy-700">Ce mois</span>
          </div>

          <div class="tw-mt-6 tw-grid tw-gap-4 lg:tw-grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
            <div class="tw-rounded-2xl tw-bg-gradient-to-br tw-from-navy-900 tw-to-navy-700 tw-p-6 tw-text-white tw-shadow-panel">
              <div class="tw-flex tw-items-end tw-justify-between tw-gap-4">
                <div>
                  <p class="tw-text-sm tw-text-white/70">Chiffre d'affaires</p>
                  <h3 class="tw-mt-2 tw-text-4xl tw-font-bold">128,4 k TND</h3>
                </div>
                <div class="tw-text-right">
                  <p class="tw-text-sm tw-text-white/70">+12,8%</p>
                  <p class="tw-text-sm tw-text-white/70">vs mois précédent</p>
                </div>
              </div>

              <svg viewBox="0 0 600 220" class="tw-mt-6 tw-h-52 tw-w-full">
                <defs>
                  <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stop-color="#93c5fd" />
                    <stop offset="100%" stop-color="#f8fafc" />
                  </linearGradient>
                </defs>
                <path d="M20 170 C 90 150, 120 80, 180 110 S 290 160, 340 92 S 460 55, 520 74 S 570 110, 580 52" fill="none" stroke="url(#lineGradient)" stroke-width="6" stroke-linecap="round" />
                <path d="M20 170 C 90 150, 120 80, 180 110 S 290 160, 340 92 S 460 55, 520 74 S 570 110, 580 52 L 580 200 L 20 200 Z" fill="rgba(255,255,255,0.08)" />
              </svg>
            </div>

            <div class="tw-space-y-4">
              <div class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-5">
                <p class="tw-text-sm tw-text-slate-500">Clients actifs</p>
                <p class="tw-mt-2 tw-text-2xl tw-font-bold tw-text-navy-900">286</p>
                <p class="tw-mt-1 tw-text-sm tw-text-emerald-600">+14 ce mois</p>
              </div>
              <div class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-5">
                <p class="tw-text-sm tw-text-slate-500">Comptes en retard</p>
                <p class="tw-mt-2 tw-text-2xl tw-font-bold tw-text-navy-900">18</p>
                <p class="tw-mt-1 tw-text-sm tw-text-amber-600">À relancer aujourd'hui</p>
              </div>
              <div class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-5">
                <p class="tw-text-sm tw-text-slate-500">Factures ouvertes</p>
                <p class="tw-mt-2 tw-text-2xl tw-font-bold tw-text-navy-900">44</p>
                <p class="tw-mt-1 tw-text-sm tw-text-slate-600">Montant total: 31,7 k TND</p>
              </div>
            </div>
          </div>
        </article>

        <aside class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-soft">
          <h2 class="tw-text-xl tw-font-semibold tw-text-navy-900">Raccourcis</h2>
          <p class="tw-mt-1 tw-text-sm tw-text-slate-500">Accès rapide aux modules du cabinet.</p>

          <div class="tw-mt-6 tw-space-y-3">
            @for (shortcut of shortcuts; track shortcut.label) {
              <a [routerLink]="shortcut.link" class="tw-flex tw-items-center tw-justify-between tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-slate-50 tw-px-4 tw-py-3 tw-transition hover:tw-border-navy-200 hover:tw-bg-navy-50">
                <span>
                  <span class="tw-block tw-font-medium tw-text-navy-900">{{ shortcut.label }}</span>
                  <span class="tw-block tw-text-sm tw-text-slate-500">{{ shortcut.description }}</span>
                </span>
                <span class="tw-text-navy-700">›</span>
              </a>
            }
          </div>
        </aside>
      </section>

      <section class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-soft">
        <div class="tw-flex tw-items-center tw-justify-between tw-gap-4">
          <div>
            <h2 class="tw-text-xl tw-font-semibold tw-text-navy-900">Factures récentes</h2>
            <p class="tw-mt-1 tw-text-sm tw-text-slate-500">Derniers mouvements suivis par le cabinet.</p>
          </div>
          <button mat-flat-button color="primary" type="button" (click)="logout()">Déconnexion</button>
        </div>

        <div class="tw-mt-6 tw-overflow-x-auto">
          <table class="tw-min-w-full tw-text-left">
            <thead>
              <tr class="tw-border-b tw-border-slate-200 tw-text-sm tw-text-slate-500">
                <th class="tw-pb-3 tw-font-medium">Client</th>
                <th class="tw-pb-3 tw-font-medium">Facture</th>
                <th class="tw-pb-3 tw-font-medium">Date</th>
                <th class="tw-pb-3 tw-font-medium">Montant</th>
                <th class="tw-pb-3 tw-font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              @for (row of recentInvoices; track row.number) {
                <tr class="tw-border-b tw-border-slate-100 last:tw-border-0">
                  <td class="tw-py-4">
                    <div class="tw-flex tw-items-center tw-gap-3">
                      <div class="tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-full tw-bg-navy-50 tw-text-sm tw-font-semibold tw-text-navy-700">
                        {{ row.initials }}
                      </div>
                      <div>
                        <p class="tw-font-medium tw-text-navy-900">{{ row.client }}</p>
                        <p class="tw-text-sm tw-text-slate-500">{{ row.reference }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="tw-py-4 tw-text-slate-700">{{ row.number }}</td>
                  <td class="tw-py-4 tw-text-slate-700">{{ row.date }}</td>
                  <td class="tw-py-4 tw-font-medium tw-text-navy-900">{{ row.amount }}</td>
                  <td class="tw-py-4">
                    <span class="tw-inline-flex tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-medium" [class.tw-bg-emerald-50]="row.status === 'Réglée'" [class.tw-text-emerald-700]="row.status === 'Réglée'" [class.tw-bg-amber-50]="row.status !== 'Réglée'" [class.tw-text-amber-700]="row.status !== 'Réglée'">
                      {{ row.status }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      :host ::ng-deep button[mat-flat-button] {
        border-radius: 9999px;
      }

      .metric-icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    `
  ]
})
export class AdminDashboardComponent {
  private readonly authService = inject(AuthService);

  readonly metrics = [
    { label: 'Total clients', value: '286', delta: '+14', description: 'Dossiers suivis sur les 30 derniers jours.' },
    { label: 'Factures ce mois', value: '124', delta: '+9', description: 'Factures émises par le cabinet.' },
    { label: 'Chiffre d’affaires', value: '128,4 k TND', delta: '+12%', description: 'Encaissements confirmés ce mois.' },
    { label: 'Comptes en retard', value: '18', delta: '!', description: 'Clients à relancer en priorité.' }
  ];

  readonly shortcuts = [
    { label: 'Clients', description: 'Ouvrir les dossiers clients', link: '/admin/clients' },
    { label: 'Factures', description: 'Consulter les factures', link: '/admin/invoices' },
    { label: 'Écritures comptables', description: 'Journal et pièces comptables', link: '/admin/entries' },
    { label: 'Utilisateurs', description: 'Gérer les accès', link: '/admin/users' },
    { label: 'Paramètres', description: 'Configurer le cabinet', link: '/admin/settings' }
  ];

  readonly recentInvoices = [
    { initials: 'MA', client: 'MediAvenir SARL', reference: 'Matricule fiscal: 1894523/A', number: 'F-2026-014', date: '07/07/2026', amount: '4 800 TND', status: 'Réglée' },
    { initials: 'BT', client: 'BTP Tunisie', reference: 'Matricule fiscal: 2251701/B', number: 'F-2026-018', date: '06/07/2026', amount: '11 250 TND', status: 'En attente' },
    { initials: 'AF', client: 'Amine Food Services', reference: 'Matricule fiscal: 3114876/C', number: 'F-2026-021', date: '05/07/2026', amount: '7 920 TND', status: 'Réglée' }
  ];

  logout(): void {
    this.authService.logout();
  }
}
