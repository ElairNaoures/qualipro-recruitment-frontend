import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';  // Import Router
import { QuestionOptionService } from '../../../shared/services/question-option.service';
import { QuestionOptionModel } from '../../../shared/models/question-option-model';
import { QuestionModel } from '../../../shared/models/question-model';
import { QuestionService } from '../../../shared/services/question.service'; // Import the question service

@Component({
  selector: 'app-add-question-option-dialog',
  templateUrl: './add-question-option-dialog.component.html',
  styleUrls: ['./add-question-option-dialog.component.scss']
})
export class AddQuestionOptionDialogComponent {
  optionForm: FormGroup;
  selectedCorrectOptionIndex: number | null = null; // Manage correct option index

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionOptionDialogComponent>,
    private questionOptionService: QuestionOptionService,
    private questionService: QuestionService, // Inject the question service
    private router: Router,  // Inject Router
    @Inject(MAT_DIALOG_DATA) public data: { questionId: number, quizId: number, question: QuestionModel } // Add QuestionModel object
  ) {
    // Check if this.data.question is defined, if not initialize it
    if (!this.data.question) {
      this.data.question = {
        id: this.data.questionId,
        questionName: '',
        quizId: this.data.quizId,
        coefficient: undefined,
        correctQuestionOptionId: undefined,
        questionOptions: []
      };
    }

    this.optionForm = this.fb.group({
      options: this.fb.array([this.createOption()])
    });
  }

  get options(): FormArray {
    return this.optionForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      optionName: ['', Validators.required],
      isCorrect: [false] // Add a field to indicate if the option is correct
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeLastOption(): void {
    if (this.options.length > 1) {
      this.options.removeAt(this.options.length - 1);
      if (this.selectedCorrectOptionIndex === this.options.length) {
        this.selectedCorrectOptionIndex = null;
      }
    }
  }

  onCorrectOptionChange(index: number): void {
    // Allow only one correct option at a time
    if (this.selectedCorrectOptionIndex !== null && this.selectedCorrectOptionIndex !== index) {
      this.options.at(this.selectedCorrectOptionIndex).get('isCorrect')?.setValue(false);
    }
    this.selectedCorrectOptionIndex = index;
  }

  // saveOptions(): void {
  //   if (this.optionForm.valid) {
  //     const questionOptions: QuestionOptionModel[] = this.optionForm.value.options.map((option: any) => ({
  //       id: 0,
  //       questionOptionName: option.optionName,
  //       questionId: this.data.questionId,
  //       isCorrect: option.isCorrect // Add the field to indicate if the option is correct
  //     }));

  //     // Add all options one by one
  //     questionOptions.forEach(option => {
  //       this.questionOptionService.addQuestionOption(option).subscribe((savedOption) => {
  //         if (option.isCorrect) {
  //           // Update the correctQuestionOptionId column with the ID of the correct option
  //           this.data.question.correctQuestionOptionId = savedOption.id;

  //           // Save the updated question
  //           this.questionService.updateQuestion(this.data.question.id, this.data.question).subscribe(() => {
  //             this.closeDialogAndNavigate();  // Close the dialog and navigate
  //           });
  //         }
  //       });
  //     });

  //     // If no correct option is selected, just close the dialog and navigate
  //     if (this.selectedCorrectOptionIndex === null) {
  //       this.closeDialogAndNavigate();  // Close the dialog and navigate
  //     }
  //   }
  // }

  // closeDialogAndNavigate(): void {
  //   this.dialogRef.close();
  //   this.router.navigate(['dashboard/quizs']);  // Navigate to the quizs route after closing the dialog
  // }
  // closeDialogAndNavigate(): void {
  //   this.dialogRef.close();
  //   if (this.data.quizId) {
  //     this.router.navigate(['dashboard/addQuestion', this.data.quizId]); // Navigate with quizId
  //   } else {
  //     console.error('quizId is undefined');
  //     // Handle the case where quizId is undefined, maybe navigate to a different route or show an error
  //   }
  // }
  saveOptions(): void {
    if (this.optionForm.valid) {
      const questionOptions: QuestionOptionModel[] = this.optionForm.value.options.map((option: any) => ({
        id: 0,
        questionOptionName: option.optionName,
        questionId: this.data.questionId,
        isCorrect: option.isCorrect
      }));
  
      // Ajoutez toutes les options une par une
      questionOptions.forEach(option => {
        this.questionOptionService.addQuestionOption(option).subscribe((savedOption) => {
          if (option.isCorrect) {
            // Mettre à jour l'ID de l'option correcte
            this.data.question.correctQuestionOptionId = savedOption.id;
  
            // Sauvegarder la question mise à jour
            this.questionService.updateQuestion(this.data.question.id, this.data.question).subscribe(() => {
              this.closeDialogAndNavigate(true); // Passer true pour indiquer un rafraîchissement
            });
          }
        });
      });
  
      // Si aucune option correcte n'est sélectionnée, fermez simplement la boîte de dialogue
      if (this.selectedCorrectOptionIndex === null) {
        this.closeDialogAndNavigate(true);
      }
    }
  }
  
  closeDialogAndNavigate(refresh: boolean = false): void {
    this.dialogRef.close();
    if (refresh) {
      this.router.navigate(['dashboard/addQuestion', this.data.quizId], { queryParams: { refresh: true } });
    } else {
      this.router.navigate(['dashboard/addQuestion', this.data.quizId]);
    }
  }
  
}
