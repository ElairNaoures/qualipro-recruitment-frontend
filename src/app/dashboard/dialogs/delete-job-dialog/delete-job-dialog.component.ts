import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../../shared/services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-job-dialog',
  templateUrl: './delete-job-dialog.component.html',
  styleUrl: './delete-job-dialog.component.scss'
})
export class DeleteJobDialogComponent {

  jobId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number },
    private jobService: JobService,
    private snackBar: MatSnackBar
  ) {
    this.jobId = data.jobId;
  }

  deleteJob(): void {
    this.jobService.deleteJob(this.jobId).subscribe(
      () => {
        console.log('job deleted successfully');
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



