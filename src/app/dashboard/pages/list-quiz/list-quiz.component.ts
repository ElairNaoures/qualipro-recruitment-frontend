import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizModel } from '../../../shared/models/quiz-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QuizService } from '../../../shared/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuizComponent } from '../../components/add-quiz/add-quiz.component';
import { Router } from '@angular/router';
import { DeleteQuizDialogComponent } from '../../dialogs/delete-quiz-dialog/delete-quiz-dialog.component';
import { UpdateQuizDialogComponent } from '../../dialogs/update-quiz-dialog/update-quiz-dialog.component';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {
  displayedColumns: string[] = ['id', 'quizName', 'ajouterQuestion', 'actions'];
  dataSource: MatTableDataSource<QuizModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private quizservice: QuizService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizservice.getAllQuizs().subscribe(
      (data: QuizModel[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error loading quizzes:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddQuiz(): void {
    this.router.navigate(['dashboard/addQuiz']);
  }

  openDeleteQuiz(quizId: number): void {
    const dialogRef = this.dialog.open(DeleteQuizDialogComponent, {
      width: '400px',
      data: { quizId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuizzes();
      }
    });
  }

  openUpdateQuiz(quiz: QuizModel) {
    const dialog = this.dialog.open(UpdateQuizDialogComponent, {
      data: quiz,
    });

    dialog.afterClosed().subscribe(() => {
      this.loadQuizzes();
    });
  }

  addQuestion(quizId: number): void {
    this.router.navigate(['dashboard/addQuestion', quizId]);
  }
}
