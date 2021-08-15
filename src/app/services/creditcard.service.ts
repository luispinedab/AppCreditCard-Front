import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { objectCreditCard } from '../models/objectCreditCard';
import { CreditCard } from '../models/CreditCard';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {
  API_URI = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get(`${this.API_URI}/users`);
  }
  getCreditCards(){
    return this.http.get(`${this.API_URI}/creditcards`);
  }
  saveCreditCards(infoCreditCard:objectCreditCard){
    return this.http.post(`${this.API_URI}/creditcard`,infoCreditCard);
  }
  getCreditCard(id:string|number){
    return this.http.get(`${this.API_URI}/creditcards/${id}`);
  }
  updateUser(id: string|number,updatedUser: User): Observable<User>{
    return this.http.put(`${this.API_URI}/users/${id}`,updatedUser);
  }
  updateCreditCard(id: string|number,updatedCreditCard: CreditCard): Observable<CreditCard>{
    return this.http.put(`${this.API_URI}/creditcards/${id}`,updatedCreditCard);
  }
  deleteCreditCard(id: string|number){
    return this.http.delete(`${this.API_URI}/creditcards/${id}`)
  }
  deleteUser(id: string|number){
    return this.http.delete(`${this.API_URI}/users/${id}`)
  }
}
