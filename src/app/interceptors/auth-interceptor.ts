import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt-service/jwt-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const jwtService : JwtService = inject(JwtService)

  if(
    req.url.includes("/login") || 
    req.url.includes("/api/content/?") || 
    req.url.includes("/register") || 
    req.url.includes("/reviews/classify")
  ) 
    return next(req)

  const modifiedRequest = req.clone({
    setHeaders : { 
      Authorization : `Bearer ${jwtService.loadToken()}`
    }
  })
  return next(modifiedRequest);
};
