import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../../models/login-request';
import { UserServices } from '../../services/user-service/user-services';

@Component({
  selector: 'app-login',
  imports: [ButtonModule , FormsModule , InputTextModule , ReactiveFormsModule  , MessageModule ,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  readonly userService : UserServices = inject(UserServices)
  readonly router : Router = inject(Router)

  loginFormGroup : FormGroup = new FormGroup({ 
    username : new FormControl("" , [Validators.required ]  ) , 
    password : new FormControl("" , [Validators.required , Validators.minLength(5)])
  })
  isLoading: boolean = false 
  error : string | null = null 


  getFormControl(name : string ) { 
    return this.loginFormGroup.get(name) ; 
  }
  submitLogin() { 
    if(this.getFormControl("username")?.valid && this.getFormControl("password")?.valid )  { 
      this.isLoading = true 
      const loginRequst :LoginRequest = { 
        username : this.getFormControl("username")?.value , 
        password  : this.getFormControl("password")?.value
      }
      console.log(loginRequst)
      this.userService.login(loginRequst).subscribe(
        (response : any ) => { 
          console.log(response)
          this.isLoading= false 
          localStorage.setItem("token" , response.accessToken)
          this.router.navigate(['/'])
        } , 
        (err : HttpErrorResponse) => { 
          console.log(err)
          this.isLoading = false 
          this.error = err.error.message
        }
      )
    }
  }
}
