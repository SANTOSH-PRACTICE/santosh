import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit{
  
   qid='';
   questions=[{
    content:'',
    answer:'',
    givenAnswer:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    quesid:'',
    quiz: {
      title:'',
      maxMarks:0,
    }
  }];
  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;
  timer: any;
  
  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    
    ){
  }
  ngOnInit():void{
    this.preventBackButton();
    this.qid= this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestion();

    
  }
  loadQuestion()
  { 
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>
    {
      
      console.log(data);

     this.questions=data;
     this.timer=this.questions.length * 2 * 60;
    //  this.questions.forEach(q=>{
    //   q['givenAnswer']='';
    //  });

     console.log(this.questions);
     this.startTimer();
      
    },
    (error:any)=>
    {
      console.log(error);
      Swal.fire("Error","Error in loading question of quiz",'error')
    })
  }
  preventBackButton()
{
  history.pushState(null,location.href);
  this.locationSt.onPopState(()=>{
    history.pushState(null,location.href);
  })
}
submitQuiz()
{
  Swal.fire({
    title: "Do you want to submit the quiz?",
    // showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Submit",
    
    icon:'info'
  }).then((e)=>
  {
    if(e.isConfirmed)
    {
      this.evalQuiz();

        // console.log("correct answers:- "+this.correctAnswer)
        //   console.log(" marks Got:- "+this.marksGot)
        //   console.log(this.questions);
        //   console.log(this.attempted);


    }
  });
}
startTimer()
{
let t =  window.setInterval(()=>{
    if(this.timer<=0)
    {   this.evalQuiz();
     // this.submitQuiz();
      clearInterval(t);
    }
    else
    {
      this.timer--;
    }
  },1000)
}

getFormatedTime()
{
  let mm=Math.floor(this.timer/60)
  let ss=this.timer-mm*60;
  return `${mm} min : ${ss} sec`
}

evalQuiz()
{
//calculation

//call to server to check question
this._question.evalQuiz(this.questions).subscribe((data:any)=>
{
  console.log(data);
  this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
  this.correctAnswer=data.correctAnswer;
  this.attempted=data.attempted;
  this.isSubmit=true;
},
(error)=>
{
console.log(error);
Swal.fire("Error","Error in loading question of quiz",'error')
}
);


// this.isSubmit=true;
// this.questions.forEach(q=>
//   {
//     if(q.givenAnswer==q.answer)
//     {
//       this.correctAnswer++
//      let marksSingle= this.questions[0].quiz.maxMarks / this.questions.length
//      this.marksGot+=marksSingle;
//     }
//     if(q.givenAnswer.trim() !='')
//     {
// this.attempted++;
//     }

//   });
}

printPage()
{
  window.print();
}
}
