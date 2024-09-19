import { Component, OnInit, ViewChild } from '@angular/core';
import { JobApplicationModel } from '../../../shared/models/job-application-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JobApplicationService } from '../../../shared/services/job-application.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CondidatService } from '../../../shared/services/condidat.service';
import { JobService } from '../../../shared/services/job.service';
import { catchError, forkJoin, Observable, of, switchMap, throwError } from 'rxjs';
import { AddDateJobapplicationDialogComponent } from '../../dialogs/add-date-jobapplication-dialog/add-date-jobapplication-dialog.component';
import { DeleteJobApplicationDialogComponent } from '../../dialogs/delete-job-application-dialog/delete-job-application-dialog.component';
import { QuizEvaluationService } from '../../../shared/services/quiz-evaluation.service';
import { QuizEvaluationModel } from '../../../shared/models/quiz-evaluation.model';
import { NoQuizAvailableDialogComponent } from '../../dialogs/no-quiz-available-dialog/no-quiz-available-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-job-application',
  templateUrl: './list-job-application.component.html',
  styleUrls: ['./list-job-application.component.scss']
})
export class ListJobApplicationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'condidat', 'emploi demander', 'date entretien', 'ajouterNote', 'ajouter Date', 'actions'];
  dataSource: MatTableDataSource<JobApplicationModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private jobApplicationService: JobApplicationService,
    private router: Router,
    private dialog: MatDialog,
    private condidatService: CondidatService,
    private jobService: JobService,
    private snackBar: MatSnackBar, // Inject MatSnackBar

    private quizEvaluationService: QuizEvaluationService // Add this line

  ) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadJobApplications();
  }
  
  // checkAndAddNote(jobApplicationId: number): void {
  //   this.quizEvaluationService.getQuizEvaluationsByJobApplicationId(jobApplicationId).subscribe(
  //     (evaluations: QuizEvaluationModel[]) => {
  //       if (evaluations.length > 0) {
  //         this.router.navigate(['dashboard/QuizEvaluation', jobApplicationId]);
  //       } else {
  //         this.showNoQuizAvailableNotification();
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching quiz evaluations:', error);
  //       this.showNoQuizAvailableNotification();
  //     }
  //   );
  // }

  // showNoQuizAvailableNotification(): void {
  //   this.dialog.open(NoQuizAvailableDialogComponent, {
  //     width: '300px',
  //     data: { message: 'Aucun quiz disponible pour cet emploi.' }
  //   });
  // }



  loadJobApplications(): void {
    this.jobApplicationService.getAllJobApplications().pipe(
      switchMap((data: JobApplicationModel[]) => {
        const requests: Observable<any>[] = data.map(application => {
          const condidatRequest = application.condidatId
            ? this.condidatService.getCondidatById(application.condidatId).pipe(
                catchError(err => {
                  if (err.status === 404) {
                    console.warn(`Condidat with ID ${application.condidatId} not found, skipping.`);
                    return of(null);
                  } else {
                    return throwError(err);
                  }
                })
              )
            : of(null);
    
          const jobRequest = application.jobId
            ? this.jobService.getAllJobById(application.jobId).pipe(
                catchError(err => {
                  if (err.status === 404) {
                    console.warn(`Job with ID ${application.jobId} not found, skipping.`);
                    return of(null);
                  } else {
                    return throwError(err);
                  }
                })
              )
            : of(null);
    
          return forkJoin([condidatRequest, jobRequest]).pipe(
            switchMap(([condidat, job]) => {
              return of({ ...application, condidat, job });
            })
          );
        });
    
        return forkJoin(requests);
      })
    ).subscribe(
      (applications) => {
        // Filter out applications marked as deleted
        this.dataSource.data = applications.filter(app => !app.deleted && app.condidat !== null);
      },
      (error) => {
        console.error('Error loading job applications:', error);
      }
    );
  }
    

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDateDialog(jobApplicationId: number): void {
    const dialogRef = this.dialog.open(AddDateJobapplicationDialogComponent, {
      width: '400px',
      data: { jobApplicationId } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadJobApplications();
      }
    });
  }
  openDeleteJobApplication(jobApplicationId: number): void {
    const dialogRef = this.dialog.open(DeleteJobApplicationDialogComponent, {
      width: '500px',
      data: { jobApplicationId: jobApplicationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the data if a skill was deleted
        this.loadJobApplications();
      }
    });
  }
  
  // list-job-application.component.ts
  addNote(jobApplicationId: number): void {
    this.quizEvaluationService.getQuizEvaluationsByJobApplicationId(jobApplicationId).subscribe(
      quizEvaluations => {
        if (quizEvaluations.length === 0) {
          this.snackBar.open('Aucun quiz disponible pour cet emploi', 'OK', {
            duration: 3000, // Display duration in milliseconds
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['custom-snack-bar']
          });
        } else {
          this.router.navigate(['dashboard/QuizEvaluation', jobApplicationId]);
        }
      },
      error => {
        console.error('Error fetching quiz evaluations:', error);
        this.snackBar.open('Aucune évaluation passée pour cet emploi', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['custom-snack-bar']
        });
      }
    );
  }

}
