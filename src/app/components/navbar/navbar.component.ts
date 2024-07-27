import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  user=null;
  constructor(public login: LoginService){}
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser().username;
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser().username;
  });
  }
  public logout()
  {
    console.log("in logout");
    this.login.logout();
     this.isLoggedIn=false;
    this.login.loginStatusSubject.next(false);
    this.user=null;
    window.location.reload();
  }
  

}
