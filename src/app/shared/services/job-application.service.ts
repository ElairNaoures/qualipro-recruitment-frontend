import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { JobApplicationModel, JobWithApplicationCount } from '../models/job-application-model';
import { catchError, Observable, throwError } from 'rxjs';
import { CondidatModel } from '../models/Condidat.model';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  url = `${environment.baseUrl}/api/JobApplication`;

  constructor(private http: HttpClient) { }
  

  getAllJobApplications(): Observable<JobApplicationModel[]> {
    return this.http.get<JobApplicationModel[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error('Error loading job applications:', error);
        return throwError(error);
      })
    );
  }

    // Méthode pour obtenir le nombre de candidatures par job ID
  getApplicationCountByJobId(jobId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/count/${jobId}`);
  }

  // Méthode pour obtenir les jobs avec le nombre de candidatures
  getJobsWithApplicationCount(): Observable<JobWithApplicationCount[]> {
    return this.http.get<JobWithApplicationCount[]>(`${this.url}/jobs-with-application-count`);
  }
// Add this method to get candidates with score above threshold
getCandidatesWithScoreAboveThreshold(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/candidates-with-score-above-threshold`).pipe(
    catchError(error => {
      console.error('Error loading candidates with score above threshold:', error);
      return throwError(error);
    })
  );
}

    getAllJobApplicationById(jobApplicationId: number) {
      let url = `${this.url}/${jobApplicationId}`;
      return this.http.get<JobApplicationModel>(url);
    }
  
    getJobApplicationDetailsByJobId(jobId: number): Observable<JobApplicationModel> {
      return this.http.get<JobApplicationModel>(`${this.url}/job/${jobId}`);
    }
   
 
    addJobApplication(jobApplication: JobApplicationModel) {
      let url = `${this.url}`;
      return this.http.post<JobApplicationModel>(url, jobApplication);
    }
    // updateJobApplication(jobApplicationId: number, jobApplication: JobApplicationModel) {
    //   let url = `${this.url}/${jobApplicationId}`;
    //   return this.http.put<JobApplicationModel>(url, jobApplication);
    // }
    updateJobApplication(jobApplicationId: number, jobApplication: JobApplicationModel): Observable<JobApplicationModel> {
      const endpoint = `${this.url}/${jobApplicationId}`;
      return this.http.put<JobApplicationModel>(endpoint, jobApplication).pipe(
        catchError(error => {
          console.error('Error updating job application:', error);
          return throwError(error);
        })
      );
    }
  
   
    
    GetAllJobApplicationsByJobId(jobId: number): Observable<JobApplicationModel[]> {
      return this.http.get<JobApplicationModel[]>(`${this.url}/jobinfo/${jobId}`);
    }
    // getCandidatesByJobApplicationId(jobApplicationId: number): Observable<any> {
    //   return this.http.get(`${this.url}/job-application/${jobApplicationId}/candidates`);
    // }
    getCandidatesByJobApplicationId(jobApplicationId: number): Observable<CondidatModel[]> {
      return this.http.get<CondidatModel[]>(`${this.url}/job-application/${jobApplicationId}/candidates`);
    }
   
  
    deleteJobApplication(jobApplicationId: number) {
      let url = `${this.url}/${jobApplicationId}`;
      return this.http.delete<any>(url);
    }

    getCondidatInfo(condidatId: number, jobId: number): Observable<CondidatModel> {
      const url = `${this.url}/condidat/${condidatId}/job/${jobId}`; // Adjust the URL as needed
      return this.http.get<CondidatModel>(url);
    }
  
  
}


