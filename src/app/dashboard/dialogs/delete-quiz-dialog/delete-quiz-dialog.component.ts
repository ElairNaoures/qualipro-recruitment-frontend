// delete-quiz-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuizService } from '../../../shared/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-quiz-dialog',
  templateUrl: './delete-quiz-dialog.component.html',
  styleUrls: ['./delete-quiz-dialog.component.scss']
})
export class DeleteQuizDialogComponent {
  quizId: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quizId: number },
    private quizService: QuizService,
    private snackBar: MatSnackBar
  ) {
    this.quizId = data.quizId;
  }

  deleteQuiz(): void {
    console.log('Attempting to delete quiz with ID:', this.quizId); // Ajoutez ce log pour vérifier l'ID
    this.quizService.deleteQuiz(this.quizId).subscribe(
      () => {
        console.log('Quiz deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Le quiz a été supprimé avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error: any) => {
        console.error('Error deleting quiz:', error);
        if (error.status === 404) {
          this.snackBar.open('Le quiz que vous essayez de supprimer n\'a pas été trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Erreur lors de la suppression du quiz', 'Fermer', {
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
