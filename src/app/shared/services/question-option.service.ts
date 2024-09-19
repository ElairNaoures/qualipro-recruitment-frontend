import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { QuestionOptionModel } from '../models/question-option-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionOptionService {

  url = `${environment.baseUrl}/api/QuestionOption`;
  

  constructor(private http: HttpClient) { }

  getAllQuestionOptions() {
    let url = `${this.url}`;
    return this.http.get<QuestionOptionModel[]>(url);
  }
  getOptionsByQuestionId(questionId: number): Observable<QuestionOptionModel[]> {
    return this.http.get<QuestionOptionModel[]>(`${this.url}/question/${questionId}`);
  }
  


  addQuestionOption(questionOption: QuestionOptionModel) {
    let url = `${this.url}`;
    return this.http.post<QuestionOptionModel>(url, questionOption);
  }

  getQuestionOptionsByQuestionId(questionId: number): Observable<QuestionOptionModel[]> {
    return this.http.get<QuestionOptionModel[]>(`${this.url}?questionId=${questionId}`);
  }
  
  updateQuestionOption(questionOptionId: number, questionOption: QuestionOptionModel) {
    let url = `${this.url}/${questionOptionId}`;
    return this.http.put<QuestionOptionModel>(url, questionOption);
  }

  deleteQuestionOption(questionOptionId: number) {
    let url = `${this.url}/${questionOptionId}`;
    return this.http.delete<any>(url);
  }

  
}


