import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { JobApplicationModel, JobWithApplicationCount } from '../models/job-application-model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  url = `${environment.baseUrl}/api/JobApplication`;

  constructor(private http: HttpClient) { }
    // getAllJobApplications() {
      
    //   let url = `${this.url}`;
    //    return this.http.get<JobApplicationModel[]>(url);
    // }
    // Méthode pour obtenir toutes les candidatures
  // getAllJobApplications(): Observable<JobApplicationModel[]> {
  //   return this.http.get<JobApplicationModel[]>(`${this.url}`);
  // }

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
  
    // updateJobApplication(jobApplicationId: number, jobApplication: JobApplicationModel) {
    //   let url = `${this.url}/${jobApplicationId}`;
    //   return this.http.put<JobApplicationModel>(url, jobApplication);
    // }
    // updateJobApplication(jobApplicationId: number, jobApplication: JobApplicationModel) {
    //   let url = `${this.url}/${jobApplicationId}`;
    //   return this.http.put<JobApplicationModel>(url, jobApplication);
    // }
    // updateJobApplication(id: number, meetingDate: Date): Observable<JobApplicationModel> {
    //   return this.http.patch<JobApplicationModel>(`${this.url}/job-applications/${id}`, { meetingDate });
    // }
    
  

    deleteJobApplication(jobApplicationId: number) {
      let url = `${this.url}/${jobApplicationId}`;
      return this.http.delete<any>(url);
    }
  
}


