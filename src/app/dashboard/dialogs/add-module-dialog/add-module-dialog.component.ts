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

  visible: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddModuleDialogComponent>,
    private moduleService: ModuleService,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {}

  ngOnInit(): void {
    this.visible  = false; // Initialisation de la visibilité du dialogue
  }
  addModule(moduleName: string): void {
    if (moduleName) {
      this.moduleService.addModule({ moduleName }).subscribe({
        next: (response) => {
          console.log('Nouveau module ajouté avec succès:', response);
          this.dialogRef.close(true); // Fermer le dialogue avec un indicateur de succès
          // Afficher un message de succès à l'utilisateur
          this.snackBar.open('Le module a été ajouté avec succès', 'Fermer', {
            duration: 3000 // Durée pendant laquelle le message sera affiché (en ms)
          });
          location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du module:', error);
          // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
        }
      });
    }
    this.visible = true; // Afficher le dialogue après l'ajout du module

  }


  closeDialog(): void {
    this.dialogRef.close(false); // Fermer le dialogue sans ajouter de module
  }
}