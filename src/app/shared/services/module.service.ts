import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ModuleModel } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }
    getAllModules() {
      let url = `${environment.baseUrl}/api/Module`;
      return this.http.get<ModuleModel[]>(url);
    }

    getAllModuleById(moduleId: number) {
      let url = `${environment.baseUrl}/api/api/Mdule/${moduleId}`;
      return this.http.get<ModuleModel>(url);
    }
  
  
    addModule(module: ModuleModel) {
      let url = `${environment.baseUrl}/api/api/Module`;
      return this.http.post<ModuleModel>(url, module);
    }
  
  
    updateModule(moduleId: number, module: ModuleModel) {
      let url = `${environment.baseUrl}/api/Module/${moduleId}`;
      return this.http.put<ModuleModel>(url, module);
    }
  
}
