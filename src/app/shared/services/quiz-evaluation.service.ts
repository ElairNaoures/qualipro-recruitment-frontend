import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { QuizEvaluationModel } from '../models/quiz-evaluation.model';
import { catchError, Observable, throwError } from 'rxjs';
import { QuizModel } from '../models/quiz-model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class QuizEvaluationService {

  url = `${environment.baseUrl}/api/QuizEvaluation`;
  

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAllQuizEvaluations() {
    let url = `${this.url}`;
    return this.http.get<QuizEvaluationModel[]>(url);
  }
  getAllQuizEvaluationById(jobApplicationId: number): Observable<QuizEvaluationModel> {
    let url = `${this.url}/job-application/${jobApplicationId}`;
    return this.http.get<QuizEvaluationModel>(url).pipe(
      catchError(error => {
        console.error('Error fetching quiz evaluation:', error);
        return throwError(() => new Error('Error fetching quiz evaluation'));
      })
    );
  }
  

  // getAllQuizEvaluationById(quizEvaluationId: number) {
  //   let url = `${this.url}/${quizEvaluationId}`;

  //   return this.http.get<QuizEvaluationModel>(url);
  // }
  // getAllQuizEvaluationsByJobApplicationId(jobApplicationId: number): Observable<QuizEvaluationModel[]> {
  //   const url = `${this.url}/job-application/${jobApplicationId}`;
  //   return this.http.get<QuizEvaluationModel[]>(url);
  // }

  
  
  // getAllQuizEvaluationsByJobApplicationId(jobApplicationId: number): Observable<QuizEvaluationModel[]> {
  //   const url = `${this.url}/job-application/${jobApplicationId}`;
  //   return this.http.get<QuizEvaluationModel[]>(url);
  // }
  // getQuizEvaluationsByJobApplicationId(jobApplicationId: number): Observable<QuizEvaluationModel[]> {
  //   return this.http.get<QuizEvaluationModel[]>(`${this.url}/job-application/${jobApplicationId}`);
  // }
  // getQuizEvaluationsByJobApplicationId(jobApplicationId: number): Observable<QuizEvaluationModel[]> {
  //   return this.http.get<QuizEvaluationModel[]>(`${this.url}/job-application/${jobApplicationId}`).pipe(
  //     catchError(error => {
  //       console.error('Error fetching quiz evaluations:', error);
  //       return throwError(() => new Error('Error fetching quiz evaluations'));
  //     })
  //   );
  // }
  getQuizEvaluationsByJobApplicationId(jobApplicationId: number): Observable<QuizEvaluationModel[]> {
    return this.http.get<QuizEvaluationModel[]>(`${this.url}/job-application/${jobApplicationId}`).pipe(
      catchError(error => {
        console.error('Error fetching quiz evaluations:', error);
        this.openSnackBar('Error fetching quiz evaluations', 'Close');
        return throwError(() => new Error('Error fetching quiz evaluations'));
      })
    );
  }
  
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  // addQuizEvaluation(quizEvaluation: QuizEvaluationModel) {
  //   let url = `${this.url}`;
  //   return this.http.post<QuizEvaluationModel>(url, quizEvaluation);
  // }
  addQuizEvaluation(quizEvaluation: QuizEvaluationModel): Observable<QuizEvaluationModel> {
    return this.http.post<QuizEvaluationModel>(this.url, quizEvaluation);
  }
  
  
  updateQuizEvaluation(quizEvaluationId: number, quizEvaluation: QuizEvaluationModel) {
    let url = `${this.url}/${quizEvaluationId}`;
    return this.http.put<QuizEvaluationModel>(url, quizEvaluation);
  }

  deleteQuizEvaluation(quizEvaluationId: number) {
    let url = `${this.url}/${quizEvaluationId}`;
    return this.http.delete<any>(url);
  }
 

}

