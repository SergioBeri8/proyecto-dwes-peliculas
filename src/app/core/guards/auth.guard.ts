import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si la señal currentUser tiene un usuario, permite el acceso
  if (authService.currentUser()) {
    return true;
  }

  // Si no, redirige a la página de login
  return router.createUrlTree(['/auth/login']);
};
