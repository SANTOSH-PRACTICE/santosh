import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
 categories=[{
  title:'',
  cid :'',
 }];
  constructor(
    private _cat:CategoryService,private _snack:MatSnackBar,
  ){}
ngOnInit():void{
  this._cat.categories().subscribe((data:any)=>
  {
     this.categories=data;
  },
  (error:any)=>
  {
     this._snack.open('Error in loading categorieds from server','',{
      duration:3000,
     })
  })

  
}
}
