import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.baseUrl}/api/user`;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    let url = `${this.url}`;
    return this.http.get<UserModel[]>(url);
  }
  getAllUserById(userId: number) {
    let url = `${this.url}/${userId}`;
    return this.http.get<UserModel>(this.url);
  }

  addUser(user: UserModel) {
    let url = `${this.url}`;
    return this.http.post<UserModel>(url, user);
  }

  updateUser(userId: number, user: UserModel) {
    let url = `${this.url}/${userId}`;
    return this.http.put<UserModel>(url, user);
  }

  deleteUser(userId: number) {
    let url = `${this.url}/${userId}`;
    return this.http.delete<any>(url);
  }
}
