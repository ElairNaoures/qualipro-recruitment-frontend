import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../shared/services/quiz.service';
import { QuizModel } from '../../../shared/models/quiz-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar
import { ProfileJobModel } from '../../../shared/models/profile-job-model';
import { ProfileJobService } from '../../../shared/services/profile-job.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  quizForm: FormGroup;
  profileJobId: number;  // Ajoutez une variable pour stocker le profileJobId


  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,  // Injecter ActivatedRoute pour accéder aux paramètres de l'URL
    private profileJobService: ProfileJobService,

  ) {
    this.quizForm = this.fb.group({
      quizzes: this.fb.array([this.createQuiz()])
    });
    this.profileJobId = 0;
  }

  ngOnInit(): void {
    this.profileJobId = this.route.snapshot.params['profileJobId'];

  }

  createQuiz(): FormGroup {
    return this.fb.group({
      quizName: ['', Validators.required]
    });
  }

  get quizzes(): FormArray {
    return this.quizForm.get('quizzes') as FormArray;
  }

  addQuiz(): void {
    this.quizzes.push(this.createQuiz());
  }

  removeLastQuiz(): void {
    if (this.quizzes.length > 1) {
      this.quizzes.removeAt(this.quizzes.length - 1);
    }
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const quizzes: QuizModel[] = this.quizzes.value;
      quizzes.forEach(quiz => {
        this.quizService.addQuiz(quiz).subscribe(
          response => {
            console.log('Quiz ajouté avec succès:', response);

            // Récupérer le profil existant avant de mettre à jour
            this.profileJobService.getProfileJobById(this.profileJobId).subscribe(
              existingProfileJob => {
                // Mettre à jour uniquement le quizId et conserver le profileName existant
                const updatedProfileJob: ProfileJobModel = {
                  id: existingProfileJob.id,
                  profileName: existingProfileJob.profileName, // Garder le nom de profil existant
                  quizId: response.id
                };

                this.profileJobService.updateProfileJob(this.profileJobId, updatedProfileJob).subscribe(
                  () => {
                    this.snackBar.open('Quiz ajouté et profil mis à jour avec succès!', 'Fermer', {
                      duration: 3000,
                    });
                    this.router.navigate(['dashboard/quizs']);
                  },
                  error => {
                    console.error('Erreur lors de la mise à jour du profil:', error);
                    this.snackBar.open('Erreur lors de la mise à jour du profil.', 'Fermer', {
                      duration: 3000,
                    });
                  }
                );
              },
              error => {
                console.error('Erreur lors de la récupération du profil:', error);
                this.snackBar.open('Erreur lors de la récupération du profil.', 'Fermer', {
                  duration: 3000,
                });
              }
            );
          },
          error => {
            console.error('Erreur lors de l\'ajout du quiz:', error);
            this.snackBar.open('Erreur lors de l\'ajout du quiz.', 'Fermer', {
              duration: 3000,
            });
          }
        );
      });
    }
  }
}

  
  

