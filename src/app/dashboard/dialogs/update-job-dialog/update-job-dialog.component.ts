import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobModel } from '../../../shared/models/job.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../../shared/services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-job-dialog',
  templateUrl: './update-job-dialog.component.html',
  styleUrl: './update-job-dialog.component.scss',
 
})
export class UpdateJobDialogComponent implements OnInit{

  jobForm!: FormGroup;
  jobToUpdate: JobModel = {
    id: 0,
    title: '',
    description: '',
    yearsOfExperience: '',
    languages: '',
    educationLevel: '',
    expirationDate: new Date(),
    //contractTypeId: 0,
  //  userId: 0,
  contractTypeId: 0,
    designation: '',
    userId: 0,
    firstName: ''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobModel,
    private jobService: JobService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      languages: ['', Validators.required],
      educationLevel: ['', Validators.required],
      expirationDate: ['', Validators.required],
      contractTypeId: [null], 
      designation: [''],
      userId: [null], // Set default to null
      firstName: ['']
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      console.log('Données reçues:', this.data);
      this.jobToUpdate = { ...this.data };
      this.jobForm.patchValue({
        ...this.data,
        expirationDate: this.data.expirationDate ? new Date(this.data.expirationDate) : '',
      });
    } else {
      console.error('Les données du job sont indéfinies ou l\'ID du job est manquant.');
    }
    
  }

  // updateJob(): void {
  //   if (this.jobForm.valid) {
  //     this.jobToUpdate = {
  //       ...this.jobForm.value,
  //       expirationDate: new Date(this.jobForm.value.expirationDate),
  //     };
  //     console.log('Job à mettre à jour:', this.jobToUpdate);
  //     if (this.jobToUpdate && this.jobToUpdate.id !== undefined) {
  //       this.jobService.updateJob(this.jobToUpdate.id, this.jobToUpdate).subscribe({
  //         next: (updatedJob: JobModel) => {
  //           console.log('Updated Job:', updatedJob);
  //           this.dialogRef.close(true);
  //           this.snackBar.open('Le job a été mis à jour avec succès', 'Fermer', { duration: 3000 });
  //         },
  //         error: (error) => {
  //           console.error('Erreur lors de la mise à jour du job:', error);
  //           this.snackBar.open('Une erreur s\'est produite lors de la mise à jour du job. Veuillez réessayer.', 'Fermer', { duration: 3000 });
  //         }
  //       });
  //     } else {
  //       console.error('Le job ou son ID est indéfini.', this.jobToUpdate);
  //     }
  //   } else {
  //     console.error('Le formulaire est invalide.');
  //   }
  // }
  updateJob(): void {
    if (this.jobForm.valid) {
      this.jobToUpdate = {
        ...this.jobForm.value,
        expirationDate: new Date(this.jobForm.value.expirationDate).toISOString(),
        id: this.data.id // Assurez-vous que l'ID est bien défini
      };

      console.log('Données envoyées pour la mise à jour:', this.jobToUpdate);

      if (this.jobToUpdate.id != null) {
        this.jobService.updateJob(this.jobToUpdate.id, this.jobToUpdate).subscribe({
          next: (updatedJob: JobModel) => {
            console.log('Job mis à jour avec succès:', updatedJob);
            this.dialogRef.close(true);
            this.snackBar.open('Le job a été mis à jour avec succès', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du job:', error);
            this.snackBar.open('Une erreur s\'est produite lors de la mise à jour du job. Veuillez réessayer.', 'Fermer', { duration: 3000 });
          }
        });
      } else {
        console.error('Le job ou son ID est indéfini.', this.jobToUpdate);
      }
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
  
  
  
  

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}