import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'] as 'ADMIN' | 'CLIENT' | undefined;
  const currentRole = authService.getRole();

  // Route data keeps the authorization rule close to the route definition and avoids hard-coding it in the component.
  if (!requiredRole || currentRole === requiredRole) {
    return true;
  }

  return authService.isLoggedIn() ? router.createUrlTree(['/home']) : router.createUrlTree(['/login']);
};
