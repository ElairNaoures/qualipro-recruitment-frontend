import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ModuleModel } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  url = `${environment.baseUrl}/api/Module`;

  constructor(private http: HttpClient) { }
    getAllModules() {
      
      let url = `${this.url}`;
       return this.http.get<ModuleModel[]>(url);
    }

    getAllModuleById(moduleId: number) {
      let url = `${this.url}/${moduleId}`;
      return this.http.get<ModuleModel>(url);
    }
  
  
    addModule(module: ModuleModel) {
      let url = `${this.url}`;
      return this.http.post<ModuleModel>(url, module);
    }
  
  
    updateModule(moduleId: number, module: ModuleModel) {
      let url = `${this.url}/${moduleId}`;
      return this.http.put<ModuleModel>(url, module);
    }

    
  

    deleteModule(moduleId: number) {
      let url = `${this.url}/${moduleId}`;
      return this.http.delete<any>(url);
    }
  
}
