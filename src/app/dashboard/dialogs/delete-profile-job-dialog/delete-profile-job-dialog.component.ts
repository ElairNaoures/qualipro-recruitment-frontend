import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileJobService } from '../../../shared/services/profile-job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-profile-job-dialog',
  templateUrl: './delete-profile-job-dialog.component.html',
  styleUrl: './delete-profile-job-dialog.component.scss'
})
export class DeleteProfileJobDialogComponent {
  profileJobId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteProfileJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { profileJobId: number },
    private profileJobService: ProfileJobService,
    private snackBar: MatSnackBar
  ) {
    this.profileJobId = data.profileJobId;
  }

  deleteProfileJob(): void {
    console.log('Attempting to delete profile with ID:', this.profileJobId); // Ajoutez ce log pour vérifier l'ID
    this.profileJobService.deleteProfileJob(this.profileJobId).subscribe(
      () => {
        console.log('Profile deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le profile a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error: any) => {
        console.error('Error deleting profile:', error);
        if (error.status === 404) {
          this.snackBar.open('Le profile que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Erreur lors de la suppression du profile', 'Fermer', {
            duration: 3000
          });
        }
      }
    );
  }
  

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
