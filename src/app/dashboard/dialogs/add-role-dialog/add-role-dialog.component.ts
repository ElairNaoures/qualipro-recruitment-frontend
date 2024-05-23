import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../shared/services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})
export class AddRoleDialogComponent implements OnInit {
  visible: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddRoleDialogComponent>,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.visible = false; // Initialisation de la visibilité du dialogue
  }

  addRole(roleName: string): void {
    if (roleName) {
      this.roleService.addRole({ roleName }).subscribe({
        next: (response) => {
          console.log('Nouveau rôle ajouté avec succès:', response);
          this.dialogRef.close(true);
          this.snackBar.open('Le rôle a été ajouté avec succès', 'Fermer', {
            duration: 3000
          });
          location.reload(); // Recharge la page après la fermeture du dialogue
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du rôle:', error);
        }
      });
    }
    this.visible = true; // Afficher le dialogue après l'ajout du rôle
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
