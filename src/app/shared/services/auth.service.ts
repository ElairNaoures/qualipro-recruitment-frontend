import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginInputModel, LoginResponseModel, UserAccountRoleModel } from '../models/user-account-role.model';
import { CondidatModel, LoginInputModelCondidat, LoginResponseModelCondidat } from '../models/Condidat.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7058/api/Auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  // register(userData: UserAccountRoleModel): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/sign-up`, userData).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
  //       if (error.error instanceof ErrorEvent) {
  //         errorMessage = `Erreur : ${error.error.message}`;
  //       } else if (error.status === 400) {
  //         errorMessage = `Erreur 400 (Bad Request) : Vérifiez les données envoyées.`;
  //       } else {
  //         errorMessage = `Code d'erreur : ${error.status}, Message : ${error.error.message}`;
  //       }
  //       console.error(errorMessage);
  //       return throwError(errorMessage);
  //     })
  //   );
  // }
  register(userData: UserAccountRoleModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-up`, userData).pipe(
      tap(response => console.log('Register response:', response)),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur : ${error.error.message}`;
        } else if (error.status === 400) {
          errorMessage = `Erreur 400 (Bad Request) : Vérifiez les données envoyées. Détails : ${JSON.stringify(error.error)}`;
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

  signIn(loginInputModel: LoginInputModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/sign-in`, loginInputModel).pipe(
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
      }),
      tap((response: LoginResponseModel) => {
        if (response.success) {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
          if (response.userInfo?.userId !== undefined && response.userInfo?.firstName !== undefined && response.userInfo?.lastName !== undefined) {
            localStorage.setItem('userId', response.userInfo.userId.toString());
            localStorage.setItem('firstName', response.userInfo.firstName);
            localStorage.setItem('lastName', response.userInfo.lastName);
          }
        }
      })
    );
  }
  
  // signInCondidat(loginInputModelCondidat: LoginInputModelCondidat): Observable<LoginResponseModelCondidat> {
  //   return this.http.post<LoginResponseModelCondidat>(`${this.apiUrl}/condidat/sign-in`, loginInputModelCondidat).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = 'An error occurred. Please try again later.';
  //       if (error.error instanceof ErrorEvent) {
  //         errorMessage = `Error: ${error.error.message}`;
  //       } else if (error.status === 400) {
  //         errorMessage = 'Bad Request: Please check the submitted data.';
  //       } else {
  //         errorMessage = `Error Code: ${error.status}, Message: ${error.error.message}`;
  //       }
  //       console.error(errorMessage);
  //       return throwError(errorMessage);
  //     }),
  //     tap((response: LoginResponseModelCondidat) => {
  //       console.log('Sign-in response:', response);
        
  //     })
  //   );
  // }
  
  signInCondidat(loginInputModelCondidat: LoginInputModelCondidat): Observable<LoginResponseModelCondidat> {
    return this.http.post<LoginResponseModelCondidat>(`${this.apiUrl}/condidat/sign-in`, loginInputModelCondidat).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check the submitted data.';
        } else {
          errorMessage = `Error Code: ${error.status}, Message: ${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }),
      tap((response: LoginResponseModelCondidat) => {
        console.log('Sign-in response:', response);
        if (response.success) {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
          if (response.condidatInfo?.condidatId !== undefined) {
            localStorage.setItem('condidatId', response.condidatInfo.condidatId.toString());
          }
        }
      })
    );
  }
  

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
    
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('condidatId');
    this.router.navigate(['/auth/sign-in']);
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/admin/sign-in']);
  }
  getUserInfo(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }
}