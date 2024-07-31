import { Component, OnInit } from '@angular/core';
import { JobModel } from '../../../shared/models/job.model';
import { JobService } from '../../../shared/services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-jobs-lien',
  templateUrl: './list-jobs-lien.component.html',
  styleUrl: './list-jobs-lien.component.scss'
})
export class ListJobsLienComponent implements OnInit{
  jobs: JobModel[] = [];

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des emplois', error);
      }
    );
  }

  viewJobDetails(jobId: number | undefined): void {
    if (jobId !== undefined) {
      this.router.navigate(['jobs/job-detail', jobId]);
    } else {
      console.error('Invalid job ID');
    }
  }
}
