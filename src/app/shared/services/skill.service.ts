import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillModel } from '../models/skill-model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  url = `${environment.baseUrl}/api/Skill`;

  constructor(private http: HttpClient) { }
    getAllSkills() {
      
      let url = `${this.url}`;
       return this.http.get<SkillModel[]>(url);
    }


    getAllSkillById(skillId: number) {
      let url = `${this.url}/${skillId}`;
      return this.http.get<SkillModel>(url);
    }
  
  
  
    addSkill(skill: SkillModel) {
      let url = `${this.url}`;
      return this.http.post<SkillModel>(url, skill);
    }
   
  
    updateSkill(skillId: number, skill: SkillModel) {
      let url = `${this.url}/${skillId}`;
      return this.http.put<SkillModel>(url, skill);
    }

    
  

    deleteSkill(skillId: number) {
      let url = `${this.url}/${skillId}`;
      return this.http.delete<any>(url);
    }
  
    // getEducationsByCondidatId(condidatId: number): Observable<EducationModel[]> {
    //   return this.http.get<EducationModel[]>(`${this.url}/condidat/${condidatId}`);
    // }
}


