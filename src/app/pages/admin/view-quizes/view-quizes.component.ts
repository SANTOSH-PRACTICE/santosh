import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrl: './view-quizes.component.css'
})
export class ViewQuizesComponent implements OnInit{
//   quizzes=[ {qId:'',
// }];
  quizzes=[
    {
    qId:'',
    title: '',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'',
    category:{
      title:'',
    },
  },

  ]
qId: any;
  constructor(private _quiz:QuizService )
  {}
  ngOnInit():void{
    
    this._quiz.quizzes().subscribe(
      (data:any)=>
      {
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error:any)=>
      {
        console.log(error);
        Swal.fire('Error !',"Error in loading data !",'error')
      }
    )
  }
  deleteQuiz(qId: any)
  {

    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
         this._quiz.deleteQuiz(qId).subscribe(
    (data)=>{
    this.quizzes=  this.quizzes.filter((quiz:any) => quiz.qId != qId);
      Swal.fire('Success!!','Quiz Deleted','success');

    },
    (error)=>
    {
      Swal.fire('Error!!','Error in Deleting Quiz','error');
    }
   );
      }
    })
   // alert(qid);
  //  this._quiz.deleteQuiz(qId).subscribe(
  //   (data)=>{
  //   this.quizzes=  this.quizzes.filter((quiz:any) => quiz.qId != qId);
  //     Swal.fire('Success!!','Quiz Deleted','success');

  //   },
  //   (error)=>
  //   {
  //     Swal.fire('Error!!','Error in Deleting Quiz','error');
  //   }
  //  );

  }

}
