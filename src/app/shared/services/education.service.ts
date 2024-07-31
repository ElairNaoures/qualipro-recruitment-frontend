import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EducationModel } from '../models/education.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  url = `${environment.baseUrl}/api/Education`;

  constructor(private http: HttpClient) { }
    getAllEducations() {
      
      let url = `${this.url}`;
       return this.http.get<EducationModel[]>(url);
    }


    getAllEducationById(educationId: number) {
      let url = `${this.url}/${educationId}`;
      return this.http.get<EducationModel>(url);
    }
  
  
  
    addEducation(education: EducationModel) {
      let url = `${this.url}`;
      return this.http.post<EducationModel>(url, education);
    }
   
  
    updateEducation(educationId: number, education: EducationModel) {
      let url = `${this.url}/${educationId}`;
      return this.http.put<EducationModel>(url, education);
    }

    
  

    deleteEducation(educationId: number) {
      let url = `${this.url}/${educationId}`;
      return this.http.delete<any>(url);
    }
  
    getEducationsByCondidatId(condidatId: number): Observable<EducationModel[]> {
      return this.http.get<EducationModel[]>(`${this.url}/condidat/${condidatId}`);
    }
}


