import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing.component').then((m) => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES)
  },
  {
    path: 'client/company-profile',
    canActivate: [authGuard, roleGuard],
    data: { role: 'CLIENT' },
    loadComponent: () => import('./features/client/company-profile.component').then((m) => m.CompanyProfileComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
