import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CondidatService } from '../../../shared/services/condidat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-condidat-dialog',
  templateUrl: './delete-condidat-dialog.component.html',
  styleUrl: './delete-condidat-dialog.component.scss'
})
export class DeleteCondidatDialogComponent {

  condidatId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteCondidatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { condidatId: number },
    private condidatService: CondidatService,
    private snackBar: MatSnackBar
  ) {
    this.condidatId = data.condidatId;
  }

  deleteCondidat(): void {
    this.condidatService.deleteCondidat(this.condidatId).subscribe(
      () => {
        console.log('condidat deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le condidat a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
        
      },
      (error: any) => {
        console.error('Error deleting compte:', error);
        console.log('Full error object:', error); 
        if (error.status === 404) {
          this.snackBar.open('L condidat que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Le condidat a été supprimé avec succès', 'Fermer', {
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



