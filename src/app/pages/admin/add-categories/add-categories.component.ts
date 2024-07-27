import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit{
  category={
    title:"",
    description:"",

  };
  constructor( private _catgory:CategoryService,private _snack:MatSnackBar)
  {}
  ngOnInit():void{
    
  }
  formSubmit()
  {
    if(this.category.title.trim()==''|| this.category.title==null)
    {
      this._snack.open("Title Required !!","",{
        duration:3000
      })
   return;
    }
    //all save
    this._catgory.addCategory(this.category).subscribe
    (
      (data:any)=>
      {
        this.category.title=''
        this.category.description
        Swal.fire('Sucess !!','Category is Added Successfully','success');
      },
      (error:any)=>
      {
        console.log(error)
        Swal.fire("Error !!",'Server error !!','error')
      }
    );
  }

 
  

}
