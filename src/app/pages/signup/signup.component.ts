import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {
   
  }
  
    
    formSubmituser(){
console.log("user");
      this.router.navigate(['user-signup']);
       
      }

      formSubmitadmin(){
        console.log("admin");

        this.router.navigate(['admin-signup']);
        
        }
        
      

}



