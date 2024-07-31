import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {

  userId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userId = data.userId;
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userId).subscribe(
      () => {
        console.log('utilisateur deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le utilisateur a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
        
      },
      (error: any) => {
        console.error('Error deleting compte:', error);
        console.log('Full error object:', error); 
        if (error.status === 404) {
          this.snackBar.open('L utilisateur que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Le utilisateur a été supprimé avec succès', 'Fermer', {
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


