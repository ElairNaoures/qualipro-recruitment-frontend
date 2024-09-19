import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../../shared/services/question.service';
import { QuestionModel } from '../../../shared/models/question-model';
import { AddQuestionOptionDialogComponent } from '../../dialogs/add-question-option-dialog/add-question-option-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  quizId!: number;  // Declare quizId

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute  
  ) {
    this.questionForm = this.fb.group({
      questions: this.fb.array([this.createQuestion()])
    });
  }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      this.quizId = Number(params.get('quizId'));
    });
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      questionName: ['', Validators.required],
      coefficient: ['']
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeLastQuestion(): void {
    if (this.questions.length > 1) {
      this.questions.removeAt(this.questions.length - 1);
    }
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const questions: Partial<QuestionModel>[] = this.questionForm.value.questions.map((question: any) => ({
        ...question,
        quizId: this.quizId  // Add quizId to each question
      }));

      questions.forEach(question => {
        this.questionService.addQuestion(question as QuestionModel).subscribe(
          (response: QuestionModel) => {
            console.log('Question added successfully', response);
            this.snackBar.open('Question added successfully', 'Close', {
              duration: 3000
            });
            this.openAddQuestionOptionDialog(response);
          },
          error => console.error('Error adding question', error)
        );
      });
    }
  }

  openAddQuestionOptionDialog(question: QuestionModel) {
    const dialogRef = this.dialog.open(AddQuestionOptionDialogComponent, {
      width: '500px',
      data: {
        questionId: question.id,
        question: question
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue a été fermé');
    });
  }
}
