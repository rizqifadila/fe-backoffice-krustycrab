import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('BACKOFFICE_USERLOGIN');

  if (token) {
    return true;
  } else {
    // Arahkan ke halaman login
    localStorage.setItem('BACKOFFICE_INVALID_SESSION', 'Your session is invalid, Please log in again.');
    router.navigate(['/auth/login']);
    return false;
  }
};
