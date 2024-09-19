import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.baseUrl}/api/user`;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserModel[]> { 
    let url = `${this.url}`;
    return this.http.get<UserModel[]>(url); 
  }

  
  getAllUserById(userIds: number[]): Observable<UserModel[]> {
    // Filtrer les userIds définis pour éviter les undefined
    const filteredUserIds = userIds.filter(id => id !== undefined);

    // Construction de l'URL pour récupérer plusieurs utilisateurs par leurs IDs
    const url = `${this.url}?userIds=${filteredUserIds.join(',')}`;
    return this.http.get<UserModel[]>(url);
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/${userId}`);
  }
  
  addUser(user: UserModel): Observable<UserModel> {
    let url = `${this.url}`;
    return this.http.post<UserModel>(url, user);
  }

 

  // updateUser(userId: number, user: UserModel) {
  //   let url = `${this.url}/${userId}`;
  //   return this.http.put<UserModel>(url, user);
  // }

  updateUser(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${id}`, formData);
  }

  deleteUser(userId: number) {
    let url = `${this.url}/${userId}`;
    return this.http.delete<any>(url);
  }
}
