import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractTypeService } from '../../../shared/services/contract-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-contact-type-dialog',
  templateUrl: './delete-contact-type-dialog.component.html',
  styleUrl: './delete-contact-type-dialog.component.scss'
})
export class DeleteContactTypeDialogComponent {

  contractTypeId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteContactTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contractTypeId: number },
    private contractTypeService: ContractTypeService,
    private snackBar: MatSnackBar
  ) {
    this.contractTypeId = data.contractTypeId;
  }

  deleteContractType(): void {
    this.contractTypeService.deleteContractType(this.contractTypeId).subscribe(
      () => {
        console.log('contract deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le contract a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
        
      },
      (error: any) => {
        console.error('Error deleting contrat:', error);
        console.log('Full error object:', error); 
        if (error.status === 404) {
          this.snackBar.open('Le contrat que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Le contrat a été supprimé avec succès', 'Fermer', {
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



