import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProfileJobModel } from '../models/profile-job-model';
import { Observable } from 'rxjs';
import { JobModel } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileJobService {

  url = `${environment.baseUrl}/api/ProfileJob`;

  constructor(private http: HttpClient) { }
    getAllProfileJobs() {
      
      let url = `${this.url}`;
       return this.http.get<ProfileJobModel[]>(url);
    }


    // getAllProfileJobById(profileJobId: number) {
    //   let url = `${this.url}/${profileJobId}`;
    //   return this.http.get<ProfileJobModel>(url);
    // }

    getProfileJobById(profileJobId: number): Observable<ProfileJobModel> {
      return this.http.get<ProfileJobModel>(`${this.url}/${profileJobId}`);
    }

    

    getJobsByProfile(profileName: string): Observable<any> {
      const params = new HttpParams().set('profileName', profileName);
      return this.http.get<any>(`${this.url}/jobs`, { params });
    }
  
  
    addProfileJob(profileJob: ProfileJobModel) {
      let url = `${this.url}`;
      return this.http.post<ProfileJobModel>(url, profileJob);
    }
   
  
    updateProfileJob(profileJobId: number, profileJob: ProfileJobModel) {
      let url = `${this.url}/${profileJobId}`;
      return this.http.put<ProfileJobModel>(url, profileJob);
    }

    
  

    deleteProfileJob(profileJobId: number) {
      let url = `${this.url}/${profileJobId}`;
      return this.http.delete<any>(url);
    }
  
}

