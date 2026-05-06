import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const isLogged = sessionStorage.getItem('admin') === 'true';

  if (!isLogged) {
    router.navigate(['/admin/login']);
    return false;
  }

  return true;
};