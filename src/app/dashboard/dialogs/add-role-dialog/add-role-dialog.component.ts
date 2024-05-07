import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { RoleService } from '../../../shared/services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrl: './add-role-dialog.component.scss',
  // standalone: false,
  // imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class AddRoleDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AddRoleDialogComponent>,
    private roleService: RoleService,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {}

  addRole(roleName: string): void {
    if (roleName) {
      this.roleService.addRole({ roleName }).subscribe({
        next: (response) => {
          console.log('Nouveau rôle ajouté avec succès:', response);
          this.dialogRef.close(true); // Fermer le dialogue avec un indicateur de succès
          
          this.snackBar.open('Le rôle a été ajouté avec succès', 'Fermer', {
            duration: 3000 // Durée pendant laquelle le message sera affiché (en ms)
          });
          location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du rôle:', error);
          // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Fermer le dialogue sans ajouter de rôle
  }
}