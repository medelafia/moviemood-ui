import { Routes } from '@angular/router';
import { Recommendation } from './pages/recommendation/recommendation';
import { Discover } from './pages/discover/discover';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Details } from './pages/details/details';
import { History } from './pages/history/history';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path : "" , component : Home  } , 
    { path : "recommendation",  component : Recommendation , canActivate :[authGuard]} , 
    { path : "discover" , component : Discover} , 
    { path : "login" , component : Login} , 
    { path : "register" , component : Register} , 
    { path : ":id/details" , component : Details , canActivate :[authGuard]} , 
    { path : "history" , component : History , canActivate :[authGuard]}
];
