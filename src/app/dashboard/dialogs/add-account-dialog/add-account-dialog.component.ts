import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from '../../../shared/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountModel } from '../../../shared/models/account.model';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrl: './add-account-dialog.component.scss'
})
export class AddAccountDialogComponent {

  visible: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddAccountDialogComponent>,
    private accountService: AccountService,
    private snackBar: MatSnackBar 
  ) {}
  ngOnInit(): void {
    this.visible  = false; 
  }


  addAccount(email: string, password: string, blocked: boolean): void {
    if (email && password) {
      const newAccount: AccountModel = { id: 0, email, password, blocked };
      this.accountService.addAccount(newAccount).subscribe({
        next: (response) => {
          console.log('Nouveau compte ajouté avec succès:', response);
          this.dialogRef.close(true); // Fermer le dialogue avec un indicateur de succès
          this.snackBar.open('Le compte a été ajouté avec succès', 'Fermer', {
            duration: 3000 // Durée pendant laquelle le message sera affiché (en ms)
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du compte:', error);
          this.snackBar.open('Erreur lors de l\'ajout du compte', 'Fermer', {
            duration: 3000 // Durée pendant laquelle le message sera affiché (en ms)
          });
          location.reload();
        }
      });
    }
  } 

  closeDialog(): void {
    this.dialogRef.close(false); // Fermer le dialogue sans ajouter de module
  }
}
