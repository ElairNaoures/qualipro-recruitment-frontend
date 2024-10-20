import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplicationService } from '../../../shared/services/job-application.service';
import { JobApplicationModel } from '../../../shared/models/job-application-model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CondidatModel } from '../../../shared/models/Condidat.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-informationjob',
  templateUrl: './informationjob.component.html',
  styleUrls: ['./informationjob.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class InformationjobComponent implements OnInit {
  jobId!: number;
  condidatId!: number;

  jobTitle: string = '';
  applicationCount: number = 0;
  bestCandidate: { candidateName: string; score: number } | null = null;
  candidates: (JobApplicationModel & { isSelected?: boolean })[] = []; // Add 'isSelected' here
  expandedElement: JobApplicationModel | null = null;
  candidateDetails: CondidatModel | null = null;
  columnsToDisplayWithExpand = [
    'candidateName',
    'headToHeadInterviewNote',
    'score',
    'expand',
    'action',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobApplicationService: JobApplicationService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = +params['id'];
      this.loadJobDetails(this.jobId);
      this.loadCandidates(this.jobId);
      //this.loadCandidateDetails(this.condidatId , this.jobId);
    });
  }

  // Accept the candidate (call AcceptCandidate method)
  // Accept the candidate
  
//   selectCandidate(element: JobApplicationModel, event: MouseEvent): void {
//     event.stopPropagation();

//     // Ensure the job application ID is defined
//     if (element.id !== undefined) {
//         this.jobApplicationService.acceptCandidate(element.id).subscribe(
//             () => {
//                 this.snackBar.open('Candidature acceptée avec succès', 'Fermer', { duration: 3000 });
//                 element.isSelected = true; // Update UI to reflect selection
//             },
//             (error) => {
//                 console.error("Erreur lors de l'acceptation de la candidature:", error);
//                 this.snackBar.open("Erreur lors de l'acceptation de la candidature", 'Fermer', { duration: 3000 });
//             }
//         );
//     } else {
//         console.error('ID de la candidature est indéfini pour le candidat:', element);
//     }
// }
selectCandidate(element: JobApplicationModel, event: MouseEvent): void {
  event.stopPropagation();

  if (element.id !== undefined) {
      this.jobApplicationService.acceptCandidate(element.id).subscribe(
          (response) => {
              this.snackBar.open(response.message || 'Candidature acceptée avec succès', 'Fermer', { duration: 3000 });
              element.isSelected = true; // Update UI to reflect selection
          },
          (error) => {
              console.error("Erreur lors de l'acceptation de la candidature:", error);
              this.snackBar.open("Erreur lors de l'acceptation de la candidature", 'Fermer', { duration: 3000 });
          }
      );
  } else {
      console.error('ID de la candidature est indéfini pour le candidat:', element);
  }
}


deselectCandidate(element: JobApplicationModel, event: MouseEvent): void {
    event.stopPropagation();

    if (element.id !== undefined) {
        this.jobApplicationService.rejectCandidate(element.id).subscribe(
            () => {
                this.snackBar.open('Candidature rejetée avec succès', 'Fermer', { duration: 3000 });
                element.isSelected = false; // Update UI to reflect rejection
            },
            (error) => {
                console.error('Erreur lors du rejet de la candidature:', error);
                this.snackBar.open("Erreur lors du rejet de la candidature", 'Fermer', { duration: 3000 });
            }
        );
    } else {
        console.error('ID de la candidature est indéfini pour le candidat:', element);
    }
}



  loadJobDetails(jobId: number) {
    this.jobApplicationService.getJobApplicationDetailsByJobId(jobId).subscribe(
      (data: any) => {
        this.jobTitle = data.jobTitle;
        this.applicationCount = data.applicationCount;
        this.bestCandidate = data.bestCandidate
          ? {
              candidateName: data.bestCandidate.candidateName,
              score: data.bestCandidate.score ?? 0,
            }
          : null;
      },
      (error) => console.error('Error loading job details:', error)
    );
  }

  // loadCandidates(jobId: number) {
  //   this.jobApplicationService.GetAllJobApplicationsByJobId(jobId).subscribe(
  //     (data: JobApplicationModel[]) => {
  //       this.candidates = data;
  //       this.candidates.forEach((candidate) => {
  //         if (!candidate.condidatId) {
  //           console.warn(
  //             'Avertissement : condidatId est indéfini pour le candidat:',
  //             candidate
  //           );
  //         }
  //       });
  //     },
  //     (error) => console.error('Error loading candidates:', error)
  //   );
  // }

  // toggleCandidateDetails(candidate: JobApplicationModel) {
  //   console.log('Candidate clicked:', candidate); // Log pour débogage

  //   // Vérifiez si l'élément est déjà développé
  //   if (this.expandedElement === candidate) {
  //       this.expandedElement = null;
  //       this.candidateDetails = null; // Réinitialiser les détails
  //   } else {
  //       this.expandedElement = candidate; // Développer l'élément

  //       // Assurez-vous que condidatId est défini
  //       const condidatId = candidate.condidatId;
  //       if (condidatId) {
  //           console.log('Chargement des détails du candidat avec ID:', condidatId);
  //           this.loadCandidateDetails(condidatId, this.jobId); // Charger les détails du candidat
  //       } else {
  //           console.error('condidatId est indéfini pour le candidat:', candidate);
  //           // Affichez un message ou gérez cette erreur comme vous le souhaitez
  //       }
  //   }
  // }
  loadCandidates(jobId: number) {
    this.jobApplicationService.GetAllJobApplicationsByJobId(jobId).subscribe(
        (data: JobApplicationModel[]) => {
            console.log('Loaded candidates:', data); // Log the loaded candidates
            this.candidates = data;
            this.candidates.forEach((candidate) => {
                if (!candidate.condidatId) {
                    console.warn('Avertissement : condidatId est indéfini pour le candidat:', candidate);
                }
                if (!candidate.id) { // Check if id is undefined
                    console.warn('Avertissement : id est indéfini pour le candidat:', candidate);
                }
            });
        },
        (error) => console.error('Error loading candidates:', error)
    );
}


  toggleCandidateDetails(candidate: JobApplicationModel, event?: MouseEvent) {
    if (event && event.target !== event.currentTarget) {
      return;
    }

    console.log('Candidate clicked:', candidate); // Log pour débogage

    // Vérifiez si l'élément est déjà développé
    if (this.expandedElement === candidate) {
      this.expandedElement = null;
      this.candidateDetails = null; // Réinitialiser les détails
    } else {
      this.expandedElement = candidate; // Développer l'élément

      // Assurez-vous que condidatId est défini
      const condidatId = candidate.condidatId;
      if (condidatId) {
        console.log('Chargement des détails du candidat avec ID:', condidatId);
        this.loadCandidateDetails(condidatId, this.jobId); // Charger les détails du candidat
      } else {
        console.error('condidatId est indéfini pour le candidat:', candidate);
        // Affichez un message ou gérez cette erreur comme vous le souhaitez
      }
    }
  }

  // loadCandidateDetails(condidatId: number, jobId: number) {
  //   this.jobApplicationService.getCondidatInfo(condidatId, jobId).subscribe(
  //       (data: CondidatModel) => {
  //           this.candidateDetails = data;
  //           console.log('Détails du candidat chargés:', this.candidateDetails);
  //           this.cdr.detectChanges(); // Forcer la détection des changements
  //       },
  //       error => console.error('Error loading candidate details:', error)
  //   );
  // }

  loadCandidateDetails(condidatId: number, jobId: number) {
    this.jobApplicationService.getCondidatInfo(condidatId, jobId).subscribe(
      (data: CondidatModel) => {
        this.candidateDetails = data;
        console.log('Détails du candidat chargés:', this.candidateDetails);
        this.cdr.detectChanges(); // Forcer la détection des changements
      },
      (error) =>
        console.error(
          'Erreur lors du chargement des détails du candidat:',
          error
        )
    );
  }
} 