import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizModel } from '../../../shared/models/quiz-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuizService } from '../../../shared/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz-dialog',
  templateUrl: './update-quiz-dialog.component.html',
  styleUrl: './update-quiz-dialog.component.scss'
})
export class UpdateQuizDialogComponent  implements OnInit {
  quizForm!: FormGroup;
  quizToUpdate: QuizModel = { id:0, quizName:'',questions: []};

  constructor(
    public dialogRef: MatDialogRef<UpdateQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuizModel,
    private quizService: QuizService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.quizForm = this.fb.group({
      quizName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.quizToUpdate = { ...this.data };
      this.quizForm.patchValue(this.quizToUpdate);
    }
    console.log("quizToUpdate",this.quizToUpdate)
    }

  updateQuiz(): void {
    this.quizToUpdate.quizName= this.quizForm?.get('quizName')?.value;

    if (this.quizToUpdate && this.quizToUpdate.id !== undefined) {
      this.quizService.updateQuiz(this.quizToUpdate.id, this.quizToUpdate).subscribe({
        next: (updatedQuiz: QuizModel) => {
          console.log('Updated Quiz:', updatedQuiz);
          this.dialogRef.close(true);
          this.snackBar.open('Le quiz a été mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du quiz:', error);
        }
      });
    } else {
      console.error('Le quiz ou son ID est indéfini.');
    }
  }

  

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
