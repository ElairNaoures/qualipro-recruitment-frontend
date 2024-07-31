import { Component, OnInit } from '@angular/core';
import { JobModel } from '../../../shared/models/job.model';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';


@Component({
  selector: 'app-job-details-page',
  templateUrl: './job-details-page.component.html',
  styleUrl: './job-details-page.component.scss'
})
export class JobDetailsPageComponent implements OnInit {
  job: JobModel | undefined;
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'actions'];

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const jobId = Number(params.get('id'));
      this.getAllJobById(jobId);
    });
  }

  getAllJobById(jobId: number) {
    this.jobService.getAllJobById(jobId).subscribe(
      (data: JobModel) => {
        this.job = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du emplois', error);
      }
    );
  }
}