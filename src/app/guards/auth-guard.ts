import { CanActivateFn, Route, Router } from '@angular/router';
import { UserServices } from '../services/user-service/user-services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userServices : UserServices = inject(UserServices) 
  const router : Router = inject(Router)
  if(userServices.authenticated() ) return true 


  router.navigate(['/login'])
  return false;
};
