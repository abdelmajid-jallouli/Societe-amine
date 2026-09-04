import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-soft">
      <p class="tw-text-sm tw-font-medium tw-text-slate-500">{{ title }}</p>
      <h2 class="tw-mt-2 tw-text-3xl tw-font-bold tw-text-navy-900">{{ title }}</h2>
      <p class="tw-mt-3 tw-max-w-2xl tw-text-slate-600">{{ subtitle }}</p>

      <div class="tw-mt-6 tw-rounded-2xl tw-border tw-border-dashed tw-border-slate-200 tw-bg-slate-50 tw-p-6">
        <p class="tw-font-medium tw-text-navy-900">Section en cours de migration depuis TailAdmin.</p>
        <p class="tw-mt-2 tw-text-sm tw-text-slate-500">Le squelette de navigation est opérationnel, mais le contenu détaillé de cette page n’a pas encore été porté.</p>
        <a routerLink="/admin/dashboard" class="tw-mt-4 tw-inline-flex tw-items-center tw-rounded-xl tw-bg-navy-900 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white">Retour au tableau de bord</a>
      </div>
    </section>
  `
})
export class AdminSectionComponent {
  private readonly route = inject(ActivatedRoute);

  get title(): string {
    return (this.route.snapshot.data['title'] as string) || 'Section';
  }

  get subtitle(): string {
    return (this.route.snapshot.data['subtitle'] as string) || '';
  }
}