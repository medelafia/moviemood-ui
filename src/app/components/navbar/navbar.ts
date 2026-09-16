import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserServices } from '../../services/user-service/user-services';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule , RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit { 
  authenticated : boolean = false 
  readonly userService : UserServices = inject(UserServices)
  readonly router : Router = inject(Router) 


  ngOnInit(): void {
    this.authenticated = this.userService.authenticated()
  
  }
  
  logout() { 
    this.userService.logout()
    this.authenticated = !this.authenticated
    this.router.navigate(['/login'])
  }

}