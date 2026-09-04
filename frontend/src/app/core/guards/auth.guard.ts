import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Private routes redirect unauthenticated users to login instead of rendering partial content.
  return authService.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
