// no-quiz-available-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-no-quiz-available-dialog',
  templateUrl: './no-quiz-available-dialog.component.html',
  styleUrls: ['./no-quiz-available-dialog.component.scss']
})
export class NoQuizAvailableDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
