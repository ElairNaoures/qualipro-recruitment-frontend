import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProfessionalExperCondService } from '../../../shared/services/professional-exper-cond.service';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalExperCondModel } from '../../../shared/models/professional-exper-cond-model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar

@Component({
  selector: 'app-add-professional-exper',
  templateUrl: './add-professional-exper.component.html',
  styleUrls: ['./add-professional-exper.component.scss']
})
export class AddProfessionalExperComponent implements OnInit {
  professionalExperienceForm: FormGroup;
  condidatId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private professionalExperCondService: ProfessionalExperCondService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {
    this.professionalExperienceForm = this.fb.group({
      experiences: this.fb.array([
        this.createExperience()
      ])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.condidatId = Number(params.get('condidatId'));
    });
  }

  createExperience(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['']
    });
  }

  get experiences(): FormArray {
    return this.professionalExperienceForm.get('experiences') as FormArray;
  }

  addExperience(): void {
    this.experiences.push(this.createExperience());
  }

  removeLastExperience(): void {
    if (this.experiences.length > 1) {
      this.experiences.removeAt(this.experiences.length - 1);
    }
  }

  onSubmit(): void {
    if (this.professionalExperienceForm.valid && this.condidatId !== undefined) {
      const experiences: ProfessionalExperCondModel[] = this.experiences.value.map((experience: any) => ({
        ...experience,
        condidatId: this.condidatId
      }));

      experiences.forEach(experience => {
        this.professionalExperCondService.addProfessionalExperience(experience).subscribe(
          response => {
            console.log('Expérience professionnelle ajoutée avec succès:', response);
            this.snackBar.open('Expérience professionnelle ajoutée avec succès!', 'Fermer', {
              duration: 3000,
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'expérience professionnelle:', error);
            this.snackBar.open('Erreur lors de l\'ajout de l\'expérience professionnelle.', 'Fermer', {
              duration: 3000,
            });
          }
        );
      });
    }
  }
}
