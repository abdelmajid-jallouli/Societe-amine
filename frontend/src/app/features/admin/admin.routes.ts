import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminSectionComponent } from './admin-section.component';
import { AdminListComponent } from './admin-list.component';
import { AdminCreateComponent } from './admin-create.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'clients',
        component: AdminSectionComponent,
        data: {
          title: 'Clients',
          subtitle: 'Gestion des dossiers clients, coordonnées et affectation des comptables.'
        }
      },
      {
        path: 'invoices',
        component: AdminSectionComponent,
        data: {
          title: 'Factures',
          subtitle: 'Suivi des factures, statuts de paiement et échéances.'
        }
      },
      {
        path: 'entries',
        component: AdminSectionComponent,
        data: {
          title: 'Écritures comptables',
          subtitle: 'Journal des écritures, débits, crédits et comptes.'
        }
      },
      {
        path: 'users',
        component: AdminSectionComponent,
        data: {
          title: 'Utilisateurs',
          subtitle: 'Administration des comptes du cabinet et des accès clients.'
        }
      },
      {
        path: 'admins',
        component: AdminListComponent,
        data: { title: 'Admins', subtitle: 'Liste des comptes administrateurs' }
      },
      {
        path: 'admins/create',
        component: AdminCreateComponent,
        data: { title: 'Créer Admin', subtitle: 'Créer un nouvel administrateur du cabinet' }
      },
      {
        path: 'settings',
        component: AdminSectionComponent,
        data: {
          title: 'Paramètres',
          subtitle: 'Préférences de l’application, sécurité et configuration du cabinet.'
        }
      }
    ]
  }
];
