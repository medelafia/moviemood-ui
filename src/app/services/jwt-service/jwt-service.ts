import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode"
@Injectable({
  providedIn: 'root',
})
export class JwtService {


  loadToken() : string | null { 
    return localStorage.getItem("token")
  }
  is_token_expired() : boolean {
    const token = this.loadToken() 
    if(token == null) return true   
    const decoded = jwtDecode(token! )

    return decoded.exp! * 1000 < Date.now() 
  }
  removeToken() { 
    localStorage.removeItem("token")
  }
}
