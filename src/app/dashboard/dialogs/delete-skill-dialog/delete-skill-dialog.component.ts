import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../shared/services/skill.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-skill-dialog',
  templateUrl: './delete-skill-dialog.component.html',
  styleUrl: './delete-skill-dialog.component.scss'
})
export class DeleteSkillDialogComponent {

  skillId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { skillId: number },
    private skillService: SkillService,
    private snackBar: MatSnackBar
  ) {
    this.skillId = data.skillId;
  }

  deleteSkill(): void {
    this.skillService.deleteSkill(this.skillId).subscribe(
      () => {
        console.log('competence supprimer ');
        this.dialogRef.close(true);
        this.snackBar.open('Cet competence a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
        
      },
      (error: any) => {
        console.error('Error deleting compte:', error);
        console.log('Full error object:', error); 
        if (error.status === 404) {
          this.snackBar.open('La competence que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('La competence a été supprimé avec succès', 'Fermer', {
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



