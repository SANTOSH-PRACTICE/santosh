import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId='';
  qTitle='';
  
  quetions=[{
    content:'',
    answer:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    quesid:''
  }];
  constructor(private  _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar){}
  ngOnInit():void
  {
   this.qId= this._route.snapshot.params['qid'];
   this.qTitle=this._route.snapshot.params['title'];
  //  console.log(this.qId)
  //  console.log(this.qTitle)
  this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>
  {
    console.log(data);
    this.quetions=data;
  },
  (error)=>
  {console.log(error);

  })
  }
  deleteQuestion(qid: any)
  {
Swal.fire({
  icon:'info',
  showCancelButton:true,
  confirmButtonText:'Delete',
  title:'Are you sure ,want yo delete this question ?'
}).then((result)=>
{
  if(result.isConfirmed)
  {
    //confirm
    this._question.deleteQuetion(qid).subscribe(
      (data)=>{
           this._snack.open('Question Deleted','',{
            duration:3000,
           })  ;
           this.quetions=this.quetions.filter((q)=>q.quesid!=qid);
    },
    (error)=>
    {
      this._snack.open('Error in deleting question','',{
        duration:3000,
      })
    });
  }
})
  }

}
