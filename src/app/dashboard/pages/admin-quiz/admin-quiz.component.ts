import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuestionModel } from '../../../shared/models/question-model';

@Component({
  selector: 'app-admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.scss']
})
export class AdminQuizComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([this.createOption()], Validators.required),
      correctAnswer: this.fb.array([], Validators.required)
    });
  }

  get options() {
    return this.quizForm.get('options') as FormArray;
  }

  get correctAnswer() {
    return this.quizForm.get('correctAnswer') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      value: ['', Validators.required]
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
    this.correctAnswer.removeAt(index);
  }

  toggleCorrectAnswer(optionValue: string): void {
    if (this.correctAnswer.value.includes(optionValue)) {
      const index = this.correctAnswer.value.indexOf(optionValue);
      this.correctAnswer.removeAt(index);
    } else {
      this.correctAnswer.push(this.fb.control(optionValue));
    }
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const formValue = this.quizForm.value;
     // const question: QuestionModel = {
       // question: formValue.question,
        //options: formValue.options.map((o: { value: string }) => o.value),
        //correctAnswer: formValue.correctAnswer
      };
     // console.log('Question submitted:', question);
      // Handle the submission of the question (e.g., send to server)
    }
  }

