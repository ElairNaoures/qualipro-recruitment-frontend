import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobApplicationService } from '../../../shared/services/job-application.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-job-application-dialog',
  templateUrl: './delete-job-application-dialog.component.html',
  styleUrl: './delete-job-application-dialog.component.scss'
})
export class DeleteJobApplicationDialogComponent {

  jobApplicationId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteJobApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobApplicationId: number },
    private jobApplicationService: JobApplicationService,
    private snackBar: MatSnackBar
  ) {
    this.jobApplicationId = data.jobApplicationId;
  }

  deleteJobApplication(): void {
    this.jobApplicationService.deleteJobApplication(this.jobApplicationId).subscribe(
      () => {
        console.log('jobApplication deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le emploi a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
        
      },
      (error: any) => {
        console.error('Error deleting compte:', error);
        console.log('Full error object:', error); 
        if (error.status === 404) {
          this.snackBar.open('Le job que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Le job a été supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          location.reload();
        }
      }
    );
  }


  closeDialog(): void {
    this.dialogRef.close(false);
  }
}  



