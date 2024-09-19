import { Component, OnInit } from '@angular/core';
import { JobModel } from '../../../shared/models/job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-job-details-page',
  templateUrl: './job-details-page.component.html',
  styleUrls: ['./job-details-page.component.scss']
})
export class JobDetailsPageComponent implements OnInit {
  job: JobModel | undefined;
  jobProfileId!: number;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const jobId = Number(params.get('id'));
      this.jobProfileId = Number(params.get('jobProfileId'));
      this.getAllJobById(jobId);
    });
  }
  

  getAllJobById(jobId: number) {
    this.jobService.getAllJobById(jobId).subscribe(
      (data: JobModel) => {
        this.job = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du emploi', error);
      }
    );
  }

  apply() {
    if (this.authService.isAuthenticated()) {
      const condidatId = this.getCondidatId();
      const jobId = this.job?.id; // Récupérer le jobId de l'emploi actuel
  
      if (condidatId !== null && jobId !== undefined && this.jobProfileId !== undefined) {
        // Naviguer vers la page d'application avec le jobId, condidatId, et jobProfileId
        this.router.navigate([`/jobs/apply/${condidatId}/${jobId}/${this.jobProfileId}`]);
      } else {
        console.error('Candidate ID, Job ID, or Job Profile ID is not available.');
        this.router.navigate(['/auth/sign-in']);
      }
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }
  
        // apply() {
        //   if (this.authService.isAuthenticated()) {
        //     const condidatId = this.getCondidatId();
        //     const jobId = this.job?.id; // Récupérer le jobId de l'emploi actuel

        //     if (condidatId !== null && jobId !== undefined) {
        //       // Naviguer vers la page d'application avec le jobId et le condidatId
        //       this.router.navigate([`/jobs/apply/${condidatId}/${jobId}`]);
        //     } else {
        //       console.error('Candidate ID or Job ID is not available.');
        //       this.router.navigate(['/auth/sign-in']);
        //     }
        //   } else {
        //     this.router.navigate(['/auth/sign-in']);
        //   }
        // }


      private getCondidatId(): number | null {
        // Retrieve candidate ID from local storage
        const id = localStorage.getItem('condidatId');
        return id ? Number(id) : null;
      }

      logout() {
        this.authService.logout(); // Assurez-vous que cette méthode existe pour gérer la déconnexion
        this.router.navigate(['/auth/sign-in']); // Rediriger vers la page de connexion après déconnexion
      }
}

