import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { QuestionModel } from '../models/question-model';
import { catchError, EMPTY, forkJoin, map, Observable, switchMap } from 'rxjs';
import { QuestionOptionModel } from '../models/question-option-model';
import { QuestionOptionService } from './question-option.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url = `${environment.baseUrl}/api/Question`;
  

  constructor(private http: HttpClient,  private questionOptionService: QuestionOptionService) { }

  // getAllQuestions() {
  //   let url = `${this.url}`;
  //   return this.http.get<QuestionModel[]>(url);
  // }

  getAllQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.url);
  }
 

  // getAllQuestionsWithOptions(): Observable<{ question: QuestionModel, options: QuestionOptionModel[] }[]> {
  //   return this.http.get<{ question: QuestionModel, options: QuestionOptionModel[] }[]>(this.url);
  // }
  
  getAllQuestionsWithOptions(): Observable<{ question: QuestionModel, options: QuestionOptionModel[] }[]> {
    return this.http.get<{ question: QuestionModel, options: QuestionOptionModel[] }[]>(this.url);
  }
  
  // getAllQuestionById(questionId: number) {
  //   let url = `${this.url}/${questionId}`;

  //   return this.http.get<QuestionModel>(url);
  // }
  
  getQuestionById(questionId: number): Observable<QuestionModel> {
    const endpoint = `${this.url}/${questionId}`;
    return this.http.get<QuestionModel>(endpoint);
  }
  
  // getQuestionsByQuizId(quizId: number): Observable<QuestionModel[]> {
  //   return this.http.get<QuestionModel[]>(`${this.url}/quiz/${quizId}`);
  // }
  getQuestionsByQuizId(quizId: number): Observable<QuestionModel[]> {
    const apiUrl = `${this.url}/quiz/${quizId}`;
    console.log(`Requête GET à: ${apiUrl}`); // Pour débogage
    return this.http.get<QuestionModel[]>(apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des questions:', error);
        return EMPTY; // Remplacez par une gestion d'erreur appropriée
      })
    );
  }
  
  
  
  
// Méthode pour récupérer les options d'une question spécifique
getOptionsForQuestion(questionId: number): Observable<QuestionOptionModel[]> {
  return this.http.get<QuestionOptionModel[]>(`${this.url}/${questionId}/options`);
}

  // addQuestion(question: QuestionModel) {
  //   let url = `${this.url}`;
  //   return this.http.post<QuestionModel>(url, question);
  // }

  addQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(this.url, question);
  }
  updateQuestion(questionId: number, question: QuestionModel) {
    let url = `${this.url}/${questionId}`;
    return this.http.put<QuestionModel>(url, question);
  }

  deleteQuestion(questionId: number) {
    let url = `${this.url}/${questionId}`;
    return this.http.delete<any>(url);
  }

  
}

