import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from '../../../shared/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-module-dialog',
  templateUrl: './add-module-dialog.component.html',
  styleUrl: './add-module-dialog.component.scss'
})
export class AddModuleDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AddModuleDialogComponent>,
    private moduleService: ModuleService,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {}

  addModule(moduleName: string): void {
    if (moduleName) {
      this.moduleService.addModule({ moduleName }).subscribe({
        next: (response) => {
          console.log('Nouveau module ajouté avec succès:', response);
          this.dialogRef.close(true); // Fermer le dialogue avec un indicateur de succès
          this.snackBar.open('Le module a été ajouté avec succès', 'Fermer', {
            duration: 3000 // Durée pendant laquelle le message sera affiché (en ms)
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du module:', error);
          // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Fermer le dialogue sans ajouter de rôle
  }
}