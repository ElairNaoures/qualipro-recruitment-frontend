import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort'; // Importer MatSort
import { QuestionService } from '../../../shared/services/question.service';
import { QuestionModel } from '../../../shared/models/question-model';
import { AddQuestionOptionDialogComponent } from '../../dialogs/add-question-option-dialog/add-question-option-dialog.component';
import { DeleteQuestionDialogComponent } from '../../dialogs/delete-question-dialog/delete-question-dialog.component';
import { UpdateQuestionDialogComponent } from '../../dialogs/update-question-dialog/update-question-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit, AfterViewInit { // Ajouter AfterViewInit

  questionForm: FormGroup;
  quizId!: number;  
  questionsList: QuestionModel[] = [];

  @ViewChild(MatSort) sort!: MatSort; // Déclarer MatSort

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
    this.route.params.subscribe(params => {
      this.quizId = +params['quizId'];
      this.loadQuestions(); // Load questions for the quiz
    });

    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['refresh']) {
        this.loadQuestions(); // Refresh questions if query param is present
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadQuestions(); // Assurez-vous que le tableau est chargé après la vue
  }

  loadQuestions(): void {
    this.questionService.getQuestionsByQuizId(this.quizId).subscribe(questions => {
      this.questionsList = questions;
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
            this.loadQuestions();
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
        quizId: this.quizId,
        question: question
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue a été fermé');
    });
  }
  
  openDeleteQuestion(questionId: number): void {
    const dialogRef = this.dialog.open(DeleteQuestionDialogComponent, {
      width: '400px',
      data: { questionId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuestions();
      }
    });
  }

  openUpdateQuestion(question: QuestionModel): void {
    const dialogRef = this.dialog.open(UpdateQuestionDialogComponent, {
      width: '500px',
      data: question
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuestions(); // Reload questions after updating
      }
    });
  }
}
