import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProfessionalExperCondModel } from '../models/professional-exper-cond-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalExperCondService {

  url = `${environment.baseUrl}/api/ProfessionalExperience`;

  constructor(private http: HttpClient) { }
    getAllProfessionalExperiences() {
      
      let url = `${this.url}`;
       return this.http.get<ProfessionalExperCondModel[]>(url);
    }


    getAllProfessionalExperienceById(professionalExperienceId: number) {
      let url = `${this.url}/${professionalExperienceId}`;
      return this.http.get<ProfessionalExperCondModel>(url);
    }
  
  
  
    addProfessionalExperience(professionalExperience: ProfessionalExperCondModel) {
      let url = `${this.url}`;
      return this.http.post<ProfessionalExperCondModel>(url, professionalExperience);
    }
   
  
    updateProfessionalExperience(professionalExperienceId: number, professionalExperience: ProfessionalExperCondModel) {
      let url = `${this.url}/${professionalExperienceId}`;
      return this.http.put<ProfessionalExperCondModel>(url, professionalExperience);
    }

    
  

    deleteProfessionalExperience(professionalExperienceId: number) {
      let url = `${this.url}/${professionalExperienceId}`;
      return this.http.delete<any>(url);
    }
  
    getProfessionalExperienceByCondidatId(condidatId: number): Observable<ProfessionalExperCondModel[]> {
      return this.http.get<ProfessionalExperCondModel[]>(`${this.url}/condidat/${condidatId}`);
    }
}

