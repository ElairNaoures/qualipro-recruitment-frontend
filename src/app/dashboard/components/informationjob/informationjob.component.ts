import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplicationService } from '../../../shared/services/job-application.service';


@Component({
  selector: 'app-informationjob',
  templateUrl: './informationjob.component.html',
  styleUrls: ['./informationjob.component.scss']
})
export class InformationjobComponent implements OnInit {
  jobId!: number;
  jobTitle: string = '';
  applicationCount: number = 0;
  bestCandidate: { candidateName: string; score: number } | null = null;
    constructor(
      private router: Router,
        private route: ActivatedRoute,
        private jobApplicationService: JobApplicationService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.jobId = +params['id'];
            this.loadJobDetails(this.jobId);
        });
    }

    loadJobDetails(jobId: number) {
      this.jobApplicationService.getJobApplicationDetailsByJobId(jobId)
        .subscribe(
          (data: any) => {
            console.log('API Response:', data); // Log de la réponse
            this.jobTitle = data.jobTitle; // Assurez-vous que le nom est correct
            this.applicationCount = data.applicationCount;
  
            const bestCandidate = data.bestCandidate;
            if (bestCandidate) {
              this.bestCandidate = {
                candidateName: bestCandidate.candidateName,
                score: bestCandidate.score
              };
            } else {
              this.bestCandidate = null;
            }
          },
          error => {
            console.error('Error loading job details:', error);
          }
        );
    }
    goBack(): void {
      this.router.navigate(['previous-route']); // Remplacez 'previous-route' par la route vers laquelle vous souhaitez naviguer
    }
  }
  
  
  
  
