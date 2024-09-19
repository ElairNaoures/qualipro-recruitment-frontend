import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JobModel } from '../../../shared/models/job.model';
import { JobService } from '../../../shared/services/job.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { ContractTypeService } from '../../../shared/services/contract-type.service';
import { ContractTypeModel } from '../../../shared/models/ContractType.model';
import { ProfileJobService } from '../../../shared/services/profile-job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-jobs-lien',
  templateUrl: './list-jobs-lien.component.html',
  styleUrls: ['./list-jobs-lien.component.scss']
})
export class ListJobsLienComponent implements OnInit, AfterViewInit {
  jobs: JobModel[] = [];
  paginatedJobs: JobModel[] = [];
  contractTypes: ContractTypeModel[] = [];
  totalJobs: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  profileList: { id: number; profileName: string }[] = [];
    letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  noJobsMessage: string | null = null;
  noProfileJobsMessage: string | null = null; // Ajouté

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jobService: JobService,
    private router: Router,
    private contractTypeService: ContractTypeService,
    private profileJobService: ProfileJobService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadContractTypes(); // Load contract types on initialization
    this.loadJobs();
    this.loadProfileNames();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadJobs());
  }

filterJobsByProfile(profileId: number) {
  this.jobService.getJobsByProfileId(profileId).subscribe(
    (data) => {
      this.jobs = data;
      this.totalJobs = data.length;
      this.paginatedJobs = this.jobs.slice(this.paginator.pageIndex * this.pageSize, (this.paginator.pageIndex + 1) * this.pageSize);
      
      // Afficher le message de notification
      if (this.totalJobs === 0) {
        this.openSnackBar('Aucun emploi trouvé pour le profil sélectionné.', 'Fermer');
      }
    },
    (error) => {
      this.openSnackBar('Aucun emploi trouvé pour le profil sélectionné.', 'Fermer');
    }
  );
}


  

loadProfileNames() {
  this.profileJobService.getAllProfileJobs().subscribe(
    (data) => {
      this.profileList = data.map(profile => ({
        id: profile.id ?? 0,
        profileName: profile.profileName ?? 'Nom de profil non disponible'
      }));
    },
    (error) => {
      this.openSnackBar('Erreur lors de la récupération des profils.', 'Fermer');
    }
  );
}

  

loadJobs(jobProfileId?: number) {
  if (jobProfileId) {
    this.filterJobsByProfile(jobProfileId);
  } else {
    this.jobService.getAllJobs().subscribe(
      (data) => {
        data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        this.totalJobs = data.length;
        this.paginatedJobs = data.slice(this.paginator.pageIndex * this.pageSize, (this.paginator.pageIndex + 1) * this.pageSize);

        this.paginatedJobs.forEach(job => {
          if (job.contractTypeId) {
            const contractType = this.contractTypes.find(ct => ct.id === job.contractTypeId);
            job.designation = contractType ? contractType.designation : 'Unknown';
          }
        });
      },
      (error) => {
        this.openSnackBar('Erreur lors de la récupération des emplois.', 'Fermer');
      }
    );
  }
}

  
  
  
  

loadContractTypes() {
  this.contractTypeService.getAllContractTypes().subscribe(
    (data) => {
      this.contractTypes = data;
    },
    (error) => {
      this.openSnackBar('Erreur lors de la récupération des types de contrat.', 'Fermer');
    }
  );
}
  updatePagination() {
    this.paginatedJobs = this.jobs.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  filterJobs(letter: string): void {
    this.jobService.getJobsByLetter(letter).subscribe(response => {
      this.jobs = response.jobs;
      this.totalJobs = response.total;
      this.noJobsMessage = this.totalJobs === 0 ? 'Aucun emploi trouvé pour la lettre ' + letter : '';
      this.updatePagination();
    }, error => {
      console.error('Erreur lors du filtrage des emplois', error);
    });
  }
  onProfileClick(profileId: number) {
    console.log('Profile ID Clicked:', profileId);
    this.filterJobsByProfile(profileId);
  }
  
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadJobs();
  }

// list-jobs-lien.component.ts
viewJobDetails(jobId: number | undefined, jobProfileId: number | null | undefined): void {
  if (jobId !== undefined && jobProfileId !== undefined) {
    this.router.navigate(['jobs/job-detail', jobId, jobProfileId]);
  } else {
    console.error('Invalid job ID or jobProfileId');
  }
}


  isJobExpired(expirationDate?: Date): boolean {
    if (!expirationDate) return false;
    const today = new Date();
    return new Date(expirationDate) < today;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Durée d'affichage en millisecondes
      verticalPosition: 'top', // Afficher en haut
      horizontalPosition: 'center', // Centrer horizontalement
    });
  }
 
}
