import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {
  constructor(private _route:ActivatedRoute,private _router:Router,private _questionService:QuestionService){}
  public Editor:any =ClassicEditor;

  quesid=0;
  qTitle="";
  //question=null;
  question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  ngOnInit():void{

    this.quesid=this._route.snapshot.params['quesid'];
    this.qTitle=this._route.snapshot.params['title']
    this._questionService.getOneQuestion(this.quesid).subscribe((data:any)=>
    {
      this.question=data;
      console.log(this.question);
    },(error:any)=>
    {
      console.log(error);
    });
  
    
  }
  public updateData()
  {
    //alert('test')

    //validate 
    this._questionService.updateQuestion(this.question).subscribe((data)=>
    {
      Swal.fire('Success!!','question updated','success').then((e)=>
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
