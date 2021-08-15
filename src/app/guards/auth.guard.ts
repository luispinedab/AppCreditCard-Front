import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private router : Router, private auth:LoginService){
  }
  canActivate():boolean{
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);      
      return false;
    }
    else{
      console.log("administrador");
      return true;
    }
  }
  
}
