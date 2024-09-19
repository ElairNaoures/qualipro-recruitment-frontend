import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../../../shared/services/quiz.service';
import { QuizEvaluationService } from '../../../shared/services/quiz-evaluation.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { QuizModel } from '../../../shared/models/quiz-model';
import { QuizEvaluationModel } from '../../../shared/models/quiz-evaluation.model';

@Component({
  selector: 'app-candidate-quiz',
  templateUrl: './candidate-quiz.component.html',
  styleUrls: ['./candidate-quiz.component.scss']
})
export class CandidateQuizComponent implements OnInit, OnDestroy {
  score = 0;
  minutes = 10;
  seconds = 0;
  interval: any;
  quizzes: QuizModel[] = [];
  currentQuizIndex = 0;
  currentQuestionIndex = 0;
  selectedAnswers: { [questionId: number]: number } = {}; // Object to store selected answers
  isLastQuestion = false;
  jobApplicationId!: number;

  constructor(
    private quizService: QuizService,
    private quizEvaluationService: QuizEvaluationService,
    private route: ActivatedRoute,
    private router: Router // Inject the Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobApplicationId = Number(params.get('jobApplicationId'));
      if (this.jobApplicationId) {
        this.loadQuizzes(this.jobApplicationId);
      }
    });
    this.startTimer();
  }

  loadQuizzes(jobApplicationId: number): void {
    this.quizService.getQuizzesByJobApplication(jobApplicationId).subscribe(quizzes => {
      this.quizzes = quizzes || [];
      this.updateIsLastQuestion();
    }, error => {
      console.error('Error loading quizzes', error);
    });
  }

  updateIsLastQuestion(): void {
    const currentQuiz = this.quizzes[this.currentQuizIndex];
    if (currentQuiz?.questions) {
      this.isLastQuestion = this.currentQuestionIndex === currentQuiz.questions.length - 1;
    }
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.endQuiz();
          return;
        }
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  endQuiz(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    const currentQuiz = this.quizzes[this.currentQuizIndex];
    if (currentQuiz?.questions) {
      this.currentQuestionIndex = currentQuiz.questions.length;
    }
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.currentQuizIndex = 0;
    this.score = 0;
    this.selectedAnswers = {}; // Reset selected answers
    this.updateIsLastQuestion();

    this.minutes = 10;
    this.seconds = 0;
    this.startTimer();
  }

  nextQuestion(): void {
    const currentQuiz = this.quizzes[this.currentQuizIndex];
    if (currentQuiz?.questions && this.currentQuestionIndex < currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateIsLastQuestion();
    } else {
      this.endQuiz();
    }
  }

  selectAnswer(questionId: number, optionId: number): void {
    this.selectedAnswers[questionId] = optionId; // Store the selected answer for the question
  }

  confirmQuiz(): void {
    if (this.isLastQuestion) {
      const currentQuiz = this.quizzes[this.currentQuizIndex];
  
      // Boucle sur chaque question du quiz
      currentQuiz?.questions?.forEach(question => {
        const selectedAnswerId = this.selectedAnswers[question.id]; // Récupère la réponse sélectionnée
        if (selectedAnswerId) {
          // Créer une évaluation de quiz pour chaque question et sa réponse sélectionnée
          const quizEvaluation: QuizEvaluationModel = {
            JobApplicationId: this.jobApplicationId,
            QuizId: currentQuiz.id,
            QuestionId: question.id,
            QuestionOptionId: selectedAnswerId, // Utilise uniquement l'option sélectionnée
            IdReponse: selectedAnswerId // C'est l'ID de l'option choisie par l'utilisateur
          };
  
          // Soumettre l'évaluation une seule fois pour chaque question
          this.quizEvaluationService.addQuizEvaluation(quizEvaluation).subscribe({
            next: () => console.log('Quiz evaluation submitted successfully for question', question.id),
            error: (err) => console.error('Error submitting quiz evaluation for question', question.id, err)
          });
        }
      });
      
      // Redirection vers la page FinQuizComponent après la confirmation du quiz
      this.router.navigate(['jobs/fin-quiz']);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
