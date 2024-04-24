import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RoleModel } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRoles() {
    let url = `${environment.baseUrl}/api/Role`;
    return this.http.get<RoleModel[]>(url);
  }

  getAllRoleById(roleId: number) {
    let url = `${environment.baseUrl}/api/api/Role/${roleId}`;
    return this.http.get<RoleModel>(url);
  }


  addRole(role: RoleModel) {
    let url = `${environment.baseUrl}/api/api/Role`;
    return this.http.post<RoleModel>(url, role);
  }


  updateRole(roleId: number, role: RoleModel) {
    let url = `${environment.baseUrl}/api/Role/${roleId}`;
    return this.http.put<RoleModel>(url, role);
  }
}
