import { Injectable } from '@angular/core';
import { JobModel } from '../models/job.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  url = `${environment.baseUrl}/api/Job`;

  constructor(private http: HttpClient) { }
    getAllJobs() {
      
      let url = `${this.url}`;
       return this.http.get<JobModel[]>(url);
    }


    getAllJobById(jobId: number) {
      let url = `${this.url}/${jobId}`;
      return this.http.get<JobModel>(url);
    }
  
  
  
    addJob(job: JobModel) {
      let url = `${this.url}`;
      return this.http.post<JobModel>(url, job);
    }
   
  
    updateJob(jobId: number, job: JobModel) {
      let url = `${this.url}/${jobId}`;
      return this.http.put<JobModel>(url, job);
    }

    
  

    deleteJob(jobId: number) {
      let url = `${this.url}/${jobId}`;
      return this.http.delete<any>(url);
    }
  
}

