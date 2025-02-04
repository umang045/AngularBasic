import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let router = inject(Router);
  const localData: any = localStorage.getItem('userDetail');

  if (!localData) {
    router.navigateByUrl('/login');
    return false;
  }

  const jsonData = JSON.parse(localData);
  const role = jsonData?.role;

  // if (role === 'seller') {
  //   router.navigateByUrl('/seller');
  //   return false;
  // } else if (role === 'superadmin') {
  //   router.navigateByUrl('/superadmin');
  //   return false;
  // } else if (role) {
  //   router.navigateByUrl(`/${role}`);
  //   return false;
  // }

  return true;
};
