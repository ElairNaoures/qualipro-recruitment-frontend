import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RoleModel } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  url = `${environment.baseUrl}/api/Role`;
  

  constructor(private http: HttpClient) { }

  getAllRoles() {
    let url = `${this.url}`;
    return this.http.get<RoleModel[]>(url);
  }


  getAllRoleById(roleId: number) {
    let url = `${this.url}/${roleId}`;

    return this.http.get<RoleModel>(url);
  }


  addRole(role: RoleModel) {
    let url = `${this.url}`;
    return this.http.post<RoleModel>(url, role);
  }


  updateRole(roleId: number, role: RoleModel) {
    let url = `${this.url}/${roleId}`;
    return this.http.put<RoleModel>(url, role);
  }

  deleteRole(roleId: number) {
    let url = `${this.url}/${roleId}`;
    return this.http.delete<any>(url);
  }

  
}
