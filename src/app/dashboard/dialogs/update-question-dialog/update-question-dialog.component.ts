import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionModel } from '../../../shared/models/question-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../shared/services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-question-dialog',
  templateUrl: './update-question-dialog.component.html',
  styleUrls: ['./update-question-dialog.component.scss']
})
export class UpdateQuestionDialogComponent implements OnInit {

  questionForm!: FormGroup;
  questionToUpdate: QuestionModel;

  constructor(
    public dialogRef: MatDialogRef<UpdateQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionModel,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.questionForm = this.fb.group({
      questionName: ['', Validators.required],
      correctQuestionOptionName: ['', Validators.required],
    });

    this.questionToUpdate = { id: 0, questionName: '', correctQuestionOptionName: '', questionOptions: [] }; // Initialize the model
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.questionToUpdate = { ...this.data };
      this.questionForm.patchValue({
        questionName: this.questionToUpdate.questionName,
        correctQuestionOptionName: this.questionToUpdate.correctQuestionOptionName
      });
    } else {
      console.error('Les données du question sont indéfinies ou l\'ID du question est manquant.');
    }
  }

  updateQuestion(): void {
    if (this.questionForm.valid) {
      this.questionToUpdate = { ...this.questionToUpdate, ...this.questionForm.value };
      console.log('Question à mettre à jour:', this.questionToUpdate);
      
      this.questionService.updateQuestion(this.questionToUpdate.id, this.questionToUpdate).subscribe({
        next: (updatedQuestion: QuestionModel) => {
          console.log('Updated Question:', updatedQuestion);
          this.dialogRef.close(true);
          this.snackBar.open('La question a été mise à jour avec succès', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la question:', error);
          this.snackBar.open('Une erreur s\'est produite lors de la mise à jour de la question. Veuillez réessayer.', 'Fermer', { duration: 3000 });
        }
      });
    } else {
      console.error('Le formulaire est invalide.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
