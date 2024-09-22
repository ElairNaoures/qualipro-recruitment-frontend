import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../shared/services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-question-dialog',
  templateUrl: './delete-question-dialog.component.html',
  styleUrl: './delete-question-dialog.component.scss'
})
export class DeleteQuestionDialogComponent {

  questionId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { questionId: number },
    private questionService: QuestionService,
    private snackBar: MatSnackBar
  ) {
    this.questionId = data.questionId;
  }

  deleteQuestion(): void {
    console.log('Attempting to delete question with ID:', this.questionId); // Ajoutez ce log pour vérifier l'ID
    this.questionService.deleteQuestion(this.questionId).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le Question a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error: any) => {
        console.error('Error deleting Question:', error);
        if (error.status === 404) {
          this.snackBar.open('Le Question que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Erreur lors de la suppression du Question', 'Fermer', {
            duration: 3000
          });
        }
      }
    );
  }
  

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}

