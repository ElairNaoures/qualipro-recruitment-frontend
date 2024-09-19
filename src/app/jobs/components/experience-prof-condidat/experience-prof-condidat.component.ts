import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalExperCondService } from '../../../shared/services/professional-exper-cond.service';
import { ProfessionalExperCondModel } from '../../../shared/models/professional-exper-cond-model';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar

@Component({
  selector: 'app-experience-prof-condidat',
  templateUrl: './experience-prof-condidat.component.html',
  styleUrls: ['./experience-prof-condidat.component.scss']
})
export class ExperienceProfCondidatComponent implements OnInit {
  experienceForm: FormGroup;
  @Input() condidatId: number = 0;

  constructor(
    private fb: FormBuilder,
    private experienceService: ProfessionalExperCondService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {
    this.experienceForm = this.fb.group({
      experiences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const condidatId = params.get('condidatId');
      if (condidatId) {
        this.condidatId = +condidatId;
        this.loadExperiences();
      }
    });
  }

  get experiences(): FormArray {
    return this.experienceForm.get('experiences') as FormArray;
  }

  loadExperiences(): void {
    if (this.condidatId !== undefined) {
      this.experienceService.getProfessionalExperienceByCondidatId(this.condidatId).subscribe(experiences => {
        console.log('Experiences received:', experiences);

        this.experiences.clear();

        experiences.forEach(experience => {
          this.experiences.push(this.fb.group({
            id: [experience.id ?? ''],
            title: [experience.title ?? '', Validators.required],
            company: [experience.company ?? '', Validators.required],
            location: [experience.location ?? '', Validators.required],
            startDate: [experience.startDate ? formatDate(experience.startDate, 'yyyy-MM-dd', 'en-US') : '', Validators.required],
            endDate: [experience.endDate ? formatDate(experience.endDate, 'yyyy-MM-dd', 'en-US') : '', Validators.required],
            description: [experience.description ?? '']
          }));
        });
      }, error => {
        console.error('Error fetching experiences:', error);
        this.snackBar.open('Error loading experiences', 'Close', { duration: 3000 });
      });
    }
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const updatedExperiences: ProfessionalExperCondModel[] = this.experienceForm.value.experiences;

      updatedExperiences.forEach(experience => {
        if (experience.id) {
          this.experienceService.updateProfessionalExperience(experience.id, experience).subscribe(
            response => {
              console.log('Experience updated successfully:', response);
              this.snackBar.open('Experience updated successfully', 'Close', { duration: 3000 });
            },
            error => {
              console.error('Error updating experience:', error);
              this.snackBar.open('Error updating experience', 'Close', { duration: 3000 });
            }
          );
        }
      });
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });

      for (const control in this.experienceForm.controls) {
        if (this.experienceForm.controls.hasOwnProperty(control)) {
          const formControl = this.experienceForm.get(control);
          if (formControl && formControl.invalid) {
            console.error(`FormControl ${control} is invalid: ${formControl.errors}`);
          }
        }
      }
    }
  }
}
