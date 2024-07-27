import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{
primary: string|undefined;
 categories=null;
 quizData={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:true,
  category:{
    cid :'',
  },

 }
 //[
//   {
//     cid:23,
//     title:'Programming'
//   }

// ]
constructor(private _cat:CategoryService ,private _snack:MatSnackBar,private _quiz:QuizService){}
ngOnInit():void
{
  this._cat.categories().subscribe(
    (data:any)=>
    {
      //category load
      this.categories=data;
     // console.log(this.categories);
    },
    (error:any)=>{
      console.log(error);
      Swal.fire('Error !!','error in loading data from server','error');
    }
    );
  
}

addQuiz()
{
  //console.log(this.quizData);
  if(this.quizData.title.trim()=='' ||this.quizData.title==null)
  {
   this._snack.open("Title is Required !!",'',{
    duration:3000,
   })
   return;
  }
  //Validation

  //call server
  this._quiz.addQuiz(this.quizData).subscribe(
    (data)=>
    {
      Swal.fire('Sucess','quiz is added','success')
      this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
          cid :'',
        }

    };
  },
  (error:any)=>
  {
    Swal.fire('Error!!','Error While adding quiz','error')
    console.log(error);
  }
     
  )


}

}
