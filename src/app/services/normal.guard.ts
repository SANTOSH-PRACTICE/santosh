import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const normalGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);
  
 
  if(loginService.isLoggedIn()&&loginService.getUserRole()=='NORMAL' )
  {
    return true;

  }
  router.navigate(['login']);
  return false;
};
