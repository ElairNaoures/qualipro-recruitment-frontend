import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizEvaluationService } from '../../../shared/services/quiz-evaluation.service';
import { JobApplicationService } from '../../../shared/services/job-application.service';
import { QuizEvaluationModel } from '../../../shared/models/quiz-evaluation.model';
import { JobApplicationModel } from '../../../shared/models/job-application-model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-quiz-evaluation',
  templateUrl: './quiz-evaluation.component.html',
  styleUrls: ['./quiz-evaluation.component.scss']
})
export class QuizEvaluationComponent implements OnInit {
  quizEvaluations: QuizEvaluationModel[] = [];
  pagedEvaluations: QuizEvaluationModel[] = [];
  jobApplicationId!: number;
  errorMessage: string = '';
  headToHeadInterviewNote: number | null = null;  // Ensure it's a number type
  score: number | null = null;  // Ensure it's a number type

  totalScore: number = 0;

  // Pagination properties
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private quizEvaluationService: QuizEvaluationService,
    private jobApplicationService: JobApplicationService
  ) {}

  ngOnInit(): void {
    this.jobApplicationId = +this.route.snapshot.paramMap.get('jobApplicationId')!;
    this.loadQuizEvaluations();
    this.loadJobApplicationData();  // Load headToHeadInterviewNote
  }

  loadQuizEvaluations(): void {
    this.quizEvaluations = []; // Reset evaluations
    this.quizEvaluationService.getQuizEvaluationsByJobApplicationId(this.jobApplicationId)
      .subscribe(
        (data: QuizEvaluationModel[]) => {
          this.quizEvaluations = data;
          this.calculateScores();
          this.calculateTotalScore();
          this.updatePagedEvaluations();
          this.saveTotalScore(); // Save total score after calculation
        },
        (error) => {
          this.errorMessage = 'Unable to load quiz evaluations. Please try again later.';
        }
      );
  }

  loadJobApplicationData(): void {
    this.jobApplicationService.getAllJobApplicationById(this.jobApplicationId)
      .subscribe(
        (data: JobApplicationModel) => {
          this.headToHeadInterviewNote = data.headToHeadInterviewNote ?? 0; // Default to 0 if null
          this.calculateTotalScore(); // Recalculate total score with interview note
        },
        (error) => {
          this.errorMessage = 'Unable to load job application data.';
        }
      );
  }

  calculateScores(): void {
    this.quizEvaluations.forEach(evaluation => {
      evaluation.score = evaluation.reponseOptionName === evaluation.correctQuestionOptionName
        ? evaluation.coefficient
        : 0;
    });
  }

  calculateTotalScore(): void {
    const correctAnswers = this.quizEvaluations.filter(evaluation => evaluation.reponseOptionName === evaluation.correctQuestionOptionName);
    const correctScoreSum = correctAnswers.reduce((sum, evaluation) => sum + (evaluation.coefficient || 0), 0);
    
    const numberOfQuestions = this.quizEvaluations.length;
    
    let score = 0;
    if (numberOfQuestions > 0) {
      score = correctScoreSum / numberOfQuestions;
    }
  
    score += (this.headToHeadInterviewNote || 0);
    this.totalScore = parseFloat(score.toFixed(2)); // Ensure score is rounded to 2 decimal places
  }

  saveTotalScore(): void {
    const jobApplication: JobApplicationModel = {
      id: this.jobApplicationId,
      score: this.totalScore !== undefined ? Math.round(this.totalScore) : null,
      headToHeadInterviewNote: this.headToHeadInterviewNote !== undefined ? this.headToHeadInterviewNote : null
    };

    this.jobApplicationService.updateJobApplication(this.jobApplicationId, jobApplication)
      .subscribe(
        () => {
          console.log('Total score saved successfully.');
          this.errorMessage = ''; // Clear any previous errors
        },
        (error) => {
          console.error('Error details:', error);
          if (error.error && error.error.errors) {
            this.errorMessage = 'Unable to save total score. Validation errors: ' + JSON.stringify(error.error.errors);
          } else {
            this.errorMessage = 'Unable to save total score. Please check the console for more details.';
          }
        }
      );
}

  
  

  updateHeadToHeadInterviewNote(): void {
    if (this.headToHeadInterviewNote === null || isNaN(this.headToHeadInterviewNote)) {
      this.errorMessage = 'Please enter a valid number.';
      return;
    }
  
    const jobApplication: JobApplicationModel = {
      id: this.jobApplicationId,
      headToHeadInterviewNote: this.headToHeadInterviewNote
    };
  
    this.jobApplicationService.updateJobApplication(this.jobApplicationId, jobApplication)
      .subscribe(
        () => {
          this.errorMessage = ''; // Clear any previous errors
          this.calculateTotalScore(); // Update total score after saving the new note
        },
        (error) => {
          console.error('Error details:', error);
          this.errorMessage = 'Unable to update job application. Check the console for details.';
        }
      );
  }
  

  updatePagedEvaluations(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEvaluations = this.quizEvaluations.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedEvaluations();
  }

  getScoreStyle(evaluation: QuizEvaluationModel): any {
    let color = 'gray';
    if (evaluation.score && evaluation.score > 0) {
      color = 'green';
    } else {
      color = 'red';
    }
    return {
      'background-color': color,
      'color': 'white',
      'padding': '10px',
      'border-radius': '5px'
    };
  }
}
