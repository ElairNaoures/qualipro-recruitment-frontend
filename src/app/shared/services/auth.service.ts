import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginInputModel, LoginResponseModel, UserAccountRoleModel } from '../models/user-account-role.model';
import { CondidatModel } from '../models/Condidat.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7058/api/Auth'; 

  constructor(private http: HttpClient) {}

  register(userData: UserAccountRoleModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-up`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur : ${error.error.message}`;
        } else if (error.status === 400) {
          errorMessage = `Erreur 400 (Bad Request) : Vérifiez les données envoyées.`;
        } else {
          errorMessage = `Code d'erreur : ${error.status}, Message : ${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  signIn(loginInput: LoginInputModel): Observable<any> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/sign-in`, loginInput).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur : ${error.error.message}`;
        } else if (error.status === 400) {
          errorMessage = `Erreur 400 (Bad Request) : Vérifiez les données envoyées.`;
        } else {
          errorMessage = `Code d'erreur : ${error.status}, Message : ${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  signInCondidat(loginInput: LoginInputModel): Observable<any> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/condidat/sign-in`, loginInput).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur : ${error.error.message}`;
        } else if (error.status === 400) {
          errorMessage = `Erreur 400 (Bad Request) : Vérifiez les données envoyées.`;
        } else {
          errorMessage = `Code d'erreur : ${error.status}, Message : ${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }


  registerCondidat(condidatData: CondidatModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/condidat/sign-up`, condidatData).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur : ${error.error.message}`;
        } else if (error.status === 400) {
          errorMessage = `Erreur 400 (Bad Request) : Vérifiez les données envoyées.`;
        } else {
          errorMessage = `Code d'erreur : ${error.status}, Message : ${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}