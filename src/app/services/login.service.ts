import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();
  static isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  [x: string]: any;

  constructor(private http: HttpClient) { }
  // current user :which is loggedin
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }
//Genrate token
public genrateToken(loginData :any)
{
  return this.http.post(`${baseUrl}/genrate-token`,loginData);
}
//Login user :set token in local Storage
public loginUser(token: string)
{
  localStorage.setItem('token',token);
  //this.loginStatusSubject.next(true);
  return true;
}
//islogin :user is login or not
public isLoggedIn()
{
  let tokenStr=localStorage.getItem("token")
  if(tokenStr == undefined ||tokenStr==''||tokenStr == null)
  {
    return false;
  }else{
    return true;
  }
}
//logout :remove token from local storage

public logout(){
  localStorage.removeItem('token');
  return true;
}
//get token
public getToken()
{
  return localStorage.getItem('token');
}
//set user detail
public setUser(user: any)
{
  localStorage.setItem("user",JSON.stringify(user));
}
//get user
public getUser()
{
  let userStr=localStorage.getItem("user");
  if(userStr!=null){
    return JSON.parse(userStr);
  }
  else{
    this.logout();
    return null;
  }
}

//get user role
public getUserRole(){
  let user=this.getUser();
  return user.authorities[0].authority;
}

}
