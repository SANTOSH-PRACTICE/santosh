import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  public getQuestionsOfQuiz(qid: any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid: any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }
  public addQuestion(question: any)
  {
      return this._http.post(`${baseUrl}/question/`,question);
  }
  public deleteQuetion(questionId:any)
  {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions:any)
  {
       return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
  //Get one question by question id

  public getOneQuestion(qid: any)
  {
    return this._http.get(`${baseUrl}/question/${qid}`);
  }

  //UPDATE the question 
  public updateQuestion(questions:any)
  {
    return this._http.put(`${baseUrl}/question/`,questions);
  }

}
