import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from '../../../shared/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-module-dialog',
  templateUrl: './delete-module-dialog.component.html',
  styleUrl: './delete-module-dialog.component.scss'
})
export class DeleteModuleDialogComponent {

  moduleId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteModuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { moduleId: number },
    private moduleService: ModuleService,
    private snackBar: MatSnackBar
  ) {
    this.moduleId = data.moduleId;
  }

  deleteModule(): void {
    this.moduleService.deleteModule(this.moduleId).subscribe(
      () => {
        console.log('Module deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le module a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
        
      },
      (error: any) => {
        console.error('Error deleting module:', error);
        console.log('Full error object:', error); 
        if (error.status === 404) {
          this.snackBar.open('Le module que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Le module a été supprimé avec succès', 'Fermer', {
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
