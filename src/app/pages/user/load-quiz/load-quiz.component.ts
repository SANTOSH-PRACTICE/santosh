import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent  implements OnInit{
  catId=null;
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
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
  ){}
  ngOnInit():void{
    // this.catId=this._route.snapshot.params['catId'];
    this._route.params.subscribe((params)=>
    {
      console.log(params);
      this.catId=params['catId'];
      if(this.catId==0)
    {
    // console.log('load all the quiz')
    this._quiz.getActiveQuizzess().subscribe(
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
    else{
      console.log('load specifuc quiz')
       this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
        (data:any)=>
        {
          this.quizzes=data;
        },(error:any)=>
        {
          alert("Error in loading quiz dataS");
        }
       );
    }
    })
    //console.log(this.catId);
    
  }

}
