// src/app/services/quiz.service.ts
import { Injectable } from '@angular/core';
import { QuestionModel } from '../models/question-model';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { QuizModel } from '../models/quiz-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = `${environment.baseUrl}/api/Quiz`;
  

  constructor(private http: HttpClient) { }

  getAllQuizs() {
    let url = `${this.url}`;
    return this.http.get<QuizModel[]>(url);
  }


  getAllQuizById(quizId: number) {
    let url = `${this.url}/${quizId}`;

    return this.http.get<QuizModel>(url);
  }


  addQuiz(quiz: QuizModel) {
    let url = `${this.url}`;
    return this.http.post<QuizModel>(url, quiz);
  }

  // updateProfileJobWithQuiz(profileJobId: number, quizId: number) {
  //   const url = `${this.url}/updateProfileJobWithQuiz/${profileJobId}`;
  //   return this.http.put(url, { quizId });
  // }
  
  updateQuiz(quizId: number, quiz: QuizModel) {
    let url = `${this.url}/${quizId}`;
    return this.http.put<QuizModel>(url, quiz);
  }

  deleteQuiz(quizId: number) {
    let url = `${this.url}/${quizId}`;
    return this.http.delete<any>(url);
  }
  getQuizzesByJobApplication(jobApplicationId: number) {
    let url = `${this.url}/job-application/${jobApplicationId}`;
    return this.http.get<QuizModel[]>(url);
  }

  getQuizzesByJobApplicationId(jobApplicationId: number): Observable<QuizModel[]> {
    const url = `${this.url}/job-application/${jobApplicationId}`;
    return this.http.get<QuizModel[]>(url);
  }
  
}
