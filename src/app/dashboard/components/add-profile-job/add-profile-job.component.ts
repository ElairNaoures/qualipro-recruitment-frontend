import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileJobService } from '../../../shared/services/profile-job.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileJobModel } from '../../../shared/models/profile-job-model';

@Component({
  selector: 'app-add-profile-job',
  templateUrl: './add-profile-job.component.html',
  styleUrl: './add-profile-job.component.scss'
})
export class AddProfileJobComponent implements OnInit {
  profileJobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileJobService: ProfileJobService,
    private router: Router,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {
    this.profileJobForm = this.fb.group({
      profileJobs: this.fb.array([this.createProfileJob()])
    });
  }

  ngOnInit(): void {
  }

  createProfileJob(): FormGroup {
    return this.fb.group({
      profileName: ['', Validators.required] 
    });
  }

  get profileJobs(): FormArray {
    return this.profileJobForm.get('profileJobs') as FormArray;
  }

  addProfileJob(): void {
    this.profileJobs.push(this.createProfileJob());
  }

  removeLastProfileJob(): void {
    if (this.profileJobs.length > 1) {
      this.profileJobs.removeAt(this.profileJobs.length - 1);
    }
  }

  onSubmit(): void {
    if (this.profileJobForm.valid) {
      const profileJobs: ProfileJobModel[] = this.profileJobs.value;
      profileJobs.forEach(profileJob => {
        this.profileJobService.addProfileJob(profileJob).subscribe(
          response => {
            console.log('Profile ajouté avec succès:', response);
            this.snackBar.open('Profile ajouté avec succès!', 'Fermer', {
              duration: 3000,
            });
            // Rediriger vers ListQuizComponent après l'ajout
            this.router.navigate(['dashboard/ProfileJobs']); // Assurez-vous que ce chemin correspond à votre route
          },
          error => {
            console.error('Erreur lors de l\'ajout du Profile:', error);
            this.snackBar.open('Erreur lors de l\'ajout du Profile.', 'Fermer', {
              duration: 3000,
            });
          }
        );
      });
    }
  }
}

