import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }

  //add user
  public addUser(user :any){
   //return this.http.post(`${baseUrl}/user/`,user)
   return this.http.post(`${baseUrl}/user/`,user)

  }
}
