import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CondidatService } from '../../../shared/services/condidat.service';
import { CondidatModel } from '../../../shared/models/Condidat.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-information-perso-condidat',
  templateUrl: './information-perso-condidat.component.html',
  styleUrls: ['./information-perso-condidat.component.scss']
})
export class InformationPersoCondidatComponent implements OnInit {
  condidatForm: FormGroup;
  @Input() condidatId: number = 0;
  selectedImageFile: File | null = null;
  selectedCVFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private condidatService: CondidatService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.condidatForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      summary: [''],
      country: [''],
      phoneNumber: [''],
      birthdate: ['']
    });
  }

  onFileSelect(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (fileType === 'image') {
        this.selectedImageFile = input.files[0];
      } else if (fileType === 'cv') {
        this.selectedCVFile = input.files[0];
      }
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const condidatId = params.get('condidatId');
      if (condidatId) {
        this.condidatId = +condidatId;
        this.loadCondidat();
      }
    });
  }

  loadCondidat(): void {
    if (this.condidatId !== undefined) {
      this.condidatService.getCondidatById(this.condidatId).subscribe(condidat => {
        this.condidatForm.patchValue(condidat);
      }, error => {
        console.error('Error fetching condidat:', error);
        this.snackBar.open('Error loading condidat', 'Close', { duration: 3000 });
      });
    }
  }

  onSubmit(): void {
    if (this.condidatForm.valid) {
      const formData = new FormData();
  
      // Append form fields
      formData.append('id', this.condidatId.toString());  // Ensure ID is passed for updating
      formData.append('firstName', this.condidatForm.get('firstName')?.value);
      formData.append('lastName', this.condidatForm.get('lastName')?.value);
      formData.append('summary', this.condidatForm.get('summary')?.value);
      formData.append('country', this.condidatForm.get('country')?.value);
      formData.append('phoneNumber', this.condidatForm.get('phoneNumber')?.value);
      formData.append('birthdate', this.condidatForm.get('birthdate')?.value);
  
      // Append files if they are selected
      if (this.selectedImageFile) {
        formData.append('imageFile', this.selectedImageFile);
      }
  
      if (this.selectedCVFile) {
        formData.append('cvFile', this.selectedCVFile);
      }
  
      // Send the form data to the service method
      this.condidatService.updateCondidat(this.condidatId, formData).subscribe(
        response => {
          console.log('Condidat updated successfully:', response);
          this.snackBar.open('Condidat updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating condidat:', error);
          this.snackBar.open('Error updating condidat', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
    }
  }
  
}
