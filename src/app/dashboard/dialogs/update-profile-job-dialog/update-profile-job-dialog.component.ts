import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileJobModel } from '../../../shared/models/profile-job-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileJobService } from '../../../shared/services/profile-job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile-job-dialog',
  templateUrl: './update-profile-job-dialog.component.html',
  styleUrl: './update-profile-job-dialog.component.scss'
})
export class UpdateProfileJobDialogComponent implements OnInit {
  profileJobForm!: FormGroup;
  profileJobToUpdate: ProfileJobModel = { id:0, profileName:''};

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileJobModel,
    private profileJobService: ProfileJobService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.profileJobForm = this.fb.group({
      profileName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.profileJobToUpdate = { ...this.data };
      this.profileJobForm.patchValue(this.profileJobToUpdate);
    }
    console.log("profileJobToUpdate",this.profileJobToUpdate)
    }

  updateProfileJob(): void {
    this.profileJobToUpdate.profileName= this.profileJobForm?.get('profileName')?.value;

    if (this.profileJobToUpdate && this.profileJobToUpdate.id !== undefined) {
      this.profileJobService.updateProfileJob(this.profileJobToUpdate.id, this.profileJobToUpdate).subscribe({
        next: (updatedProfileJob: ProfileJobModel) => {
          console.log('Updated PROFILE:', updatedProfileJob);
          this.dialogRef.close(true);
          this.snackBar.open('Le profile a été mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profile:', error);
        }
      });
    } else {
      console.error('Le profile ou son ID est indéfini.');
    }
  }

  

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
