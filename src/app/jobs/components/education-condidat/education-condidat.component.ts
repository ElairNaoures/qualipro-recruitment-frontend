import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EducationService } from '../../../shared/services/education.service';
import { EducationModel } from '../../../shared/models/education.model';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar

@Component({
  selector: 'app-education-condidat',
  templateUrl: './education-condidat.component.html',
  styleUrls: ['./education-condidat.component.scss']
})
export class EducationCondidatComponent implements OnInit {
  educationForm: FormGroup;
  @Input() condidatId: number = 0;
  educationId?: number;

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {
    this.educationForm = this.fb.group({
      educations: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const condidatId = params.get('condidatId');
      if (condidatId) {
        this.condidatId = +condidatId;
        this.loadEducations();
      }
    });
  }

  get educations(): FormArray {
    return this.educationForm.get('educations') as FormArray;
  }

  loadEducations(): void {
    if (this.condidatId !== undefined) {
      this.educationService.getEducationsByCondidatId(this.condidatId).subscribe(educations => {
        console.log('Educations received:', educations);

        this.educations.clear();

        educations.forEach(education => {
          this.educations.push(this.fb.group({
            id: [education.id ?? ''],
            title: [education.title ?? '', Validators.required],
            establishment: [education.establishment ?? '', Validators.required],
            startDate: [education.startDate ? formatDate(education.startDate, 'yyyy-MM-dd', 'en-US') : '', Validators.required],
            endDate: [education.endDate ? formatDate(education.endDate, 'yyyy-MM-dd', 'en-US') : '', Validators.required],
            description: [education.description ?? '']
          }));
        });
      }, error => {
        console.error('Error fetching educations:', error);
        this.snackBar.open('Error loading educations', 'Close', { duration: 3000 });
      });
    }
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const updatedEducations: EducationModel[] = this.educationForm.value.educations;

      updatedEducations.forEach(education => {
        if (education.id) {
          this.educationService.updateEducation(education.id, education).subscribe(
            response => {
              console.log('Education updated successfully:', response);
              this.snackBar.open('Education updated successfully', 'Close', { duration: 3000 });
            },
            error => {
              console.error('Error updating education:', error);
              this.snackBar.open('Error updating education', 'Close', { duration: 3000 });
            }
          );
        }
      });
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });

      for (const control in this.educationForm.controls) {
        if (this.educationForm.controls.hasOwnProperty(control)) {
          const formControl = this.educationForm.get(control);
          if (formControl && formControl.invalid) {
            console.error(`FormControl ${control} is invalid: ${formControl.errors}`);
          }
        }
      }
    }
  }
}
