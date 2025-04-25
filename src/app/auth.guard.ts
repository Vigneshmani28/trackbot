import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import {inject} from '@angular/core'
import { AuthService } from './services/auth-service/auth.service';
import { Role } from './model/user';
import { MenuService } from './services/menu/menu.service';
import { MenuEnum } from './model/tracker';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const menuService = inject(MenuService);
  const router = inject(Router);

  const userRoles: Role[] = authService.user?.role || [];
  const requiredRoles: Role[] = route.data?.['roles'] || [];
  

  const hasAccess = requiredRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    router.navigate(['/dashboard']);
    menuService.setMenu(MenuEnum.DASHBOARD);
    return false;
  }

  return true;
};
