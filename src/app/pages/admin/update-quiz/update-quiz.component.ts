import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent  implements OnInit{
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router){}
  qId=0;
  categories=null;
 quiz={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:true,
  category:{
    cid :'',
  },

 }

//"category": { "cid": 8, "title": "Programming Practice", "description": "This quiz category contain related to Programming Practice" }

  ngOnInit():void{
   this.qId= this._route.snapshot.params['qid'];
  // alert(this.qId)
  this._quiz.getQuiz(this.qId).subscribe(
    (data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
    },
    (error)=>
    {
      console.log(error);
    }
  );
  this._cat.categories().subscribe((data:any)=>{
    this.categories=data;
  },
  (error:any)=>
  {
    alert("error in loading category");
  })

  }

  //update form submit
  public updateData()
  {
    //alert('test')

    //validate 
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>
    {
      Swal.fire('Success!!','quiz updated','success').then((e)=>
      {
          this._router.navigate(['/admin/quizzes']);
      });
    },
    (error)=>
    {
      Swal.fire('Error !!','error in updating quiz','error');
      console.log(error);
    });
  }

}
