import { Injectable } from '@angular/core';
import { login } from '../models/login';
import {HttpClient} from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  API_URI = 'http://localhost:3000';
  helper = new JwtHelperService();
  constructor(private http:HttpClient) { }

  authentication(Login:login){
    return this.http.post(`${this.API_URI}/login`,Login);
  }
  logout()
  {
    return this.http.get(`${this.API_URI}/logout`);
  }
  public isAuthenticated(): boolean {
    
    const token = localStorage.getItem('usuario');
    if(token!="null"){
    return !this.helper.isTokenExpired(token);
    }
    else 
    return false;
  }
}
