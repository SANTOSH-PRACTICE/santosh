import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
   categories=null;
    
  //     {
  //       cid:23,
  //       title:'programming',
  //       description:"this is testing category",
  //     },
    
  //     {
  //       cid:23,
  //       title:'GK',
  //       description:"this is testing category",
  //     }
  // ,
  //     {
  //       cid:23,
  //       title:'Maths',
  //       description:"this is testing category",
  //     },
    
  // ]

  constructor(private _category:CategoryService){}

  ngOnInit():void{
    this._category.categories().subscribe((data:any)=>
    {
      this.categories=data;
      console.log(this.categories);
    },(error:any)=>
    {
   console.log(error)
    Swal.fire("Error !!","error in loading data",'error')
  });
    
  }

}
