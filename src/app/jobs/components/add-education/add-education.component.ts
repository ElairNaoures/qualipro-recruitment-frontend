import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EducationService } from '../../../shared/services/education.service';
import { EducationModel } from '../../../shared/models/education.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {
  educationForm: FormGroup;
  condidatId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {
    this.educationForm = this.fb.group({
      educations: this.fb.array([
        this.createEducation()
      ])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.condidatId = Number(params.get('condidatId'));
    });
  }

  createEducation(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      establishment: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['']
    });
  }

  get educations(): FormArray {
    return this.educationForm.get('educations') as FormArray;
  }

  addEducation(): void {
    this.educations.push(this.createEducation());
  }

  removeLastEducation(): void {
    if (this.educations.length > 1) {
      this.educations.removeAt(this.educations.length - 1);
    }
  }

  onSubmit(): void {
    if (this.educationForm.valid && this.condidatId !== undefined) {
      const educations: EducationModel[] = this.educations.value.map((education: any) => ({
        ...education,
        condidatId: this.condidatId
      }));

      educations.forEach(education => {
        this.educationService.addEducation(education).subscribe(
          response => {
            console.log('Éducation ajoutée avec succès:', response);
            this.snackBar.open('Éducation ajoutée avec succès!', 'Fermer', {
              duration: 3000,
            });
            // Handle successful response
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'éducation:', error);
            this.snackBar.open('Erreur lors de l\'ajout de l\'éducation.', 'Fermer', {
              duration: 3000,
            });
            // Handle error response
          }
        );
      });
    }
  }
}
