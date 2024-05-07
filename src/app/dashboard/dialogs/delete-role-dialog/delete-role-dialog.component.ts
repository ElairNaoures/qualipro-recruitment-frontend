import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../shared/services/role.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-role-dialog',
  templateUrl: './delete-role-dialog.component.html',
  styleUrls: ['./delete-role-dialog.component.scss'] 
})



export class DeleteRoleDialogComponent {

  roleId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roleId: number },
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.roleId = data.roleId;
  }

  deleteRole(): void {
    this.roleService.deleteRole(this.roleId).subscribe(
      () => {
        console.log('Role deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le rôle a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error: any) => {
        console.error('Error deleting role:', error);
        console.log('Full error object:', error); // Ajout d'une console.log pour afficher l'objet error complet
        if (error.status === 404) {
          this.snackBar.open('Le rôle que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Le rôle a été supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          location.reload();
        }
      }
    );
  }
}  