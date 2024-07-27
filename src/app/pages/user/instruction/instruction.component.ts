import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css'
})
export class InstructionComponent implements OnInit{
  qid='';
  quiz={
    title:'',
    description:'',
    maxMarks:0,
    numberOfQuestions:0,
    active:true,
    category:{
      cid :'',
    },
  
   }
  constructor(
    private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router,
  ){}
  ngOnInit():void{
   this.qid= this._route.snapshot.params['qid'];
   console.log(this.qid);
   this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>
    {
     // console.log(data);
      this.quiz=data;
    },
    (error:any)=>
    {
      console.log(error);
      alert("Error in loading quiz data")
    }
   )

  }
  StartQuiz()
  {
    Swal.fire({
      title: "Do you want to Start the quiz?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Start",
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this._router.navigate(['/start/'+this.qid])
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
   
  }
  

}
