


import { Component, OnInit } from '@angular/core';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
imports: [MatSnackBar];

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrl: './admin-sign-up.component.css'
})
export class AdminSignUpComponent implements OnInit{
  constructor(private usersService:UsersService,private _snackBar: MatSnackBar){}
  public user={  
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };
    ngOnInit():void{}
    formSubmit(){
      console.log(this.user)
      if(this.user.username==''||this.user.username==null)
      {
      //  alert('User is required !!')
      this._snackBar.open("User name is requied!!",'',{
        duration:3000,
        // verticalPosition:'top',
        // horizontalPosition:'right',
      })
        return;
      }
      //validation

// alert("Submit")
//add user userservice

this.usersService.addUser(this.user).subscribe(
  (data :any)=>{
  //sucess
  console.log(data);
 // alert('sucess');
 
 Swal.fire('Success done !!','User id is '+data.id ,'success');
 this.user={  
  username:'',
  password:'',
  firstName:'',
  lastName:'',
  email:'',
  phone:'',
};
 
  },
(error:any)=>{
  //error
  console.log(error);
 // alert('Something went wrong');
 this._snackBar.open('Something went wrong !!','',{
  duration:3000,
 });
}
);

    }
    clear()
    {
      this.user={  
        username:'',
        password:'',
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
      };
    }
    

}
