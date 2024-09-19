import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobApplicationService } from '../../../shared/services/job-application.service';
import { JobApplicationModel } from '../../../shared/models/job-application-model';

@Component({
  selector: 'app-add-date-jobapplication-dialog',
  templateUrl: './add-date-jobapplication-dialog.component.html',
  styleUrls: ['./add-date-jobapplication-dialog.component.scss']
})
export class AddDateJobapplicationDialogComponent implements OnInit {
  dateForm: FormGroup;
  jobApplicationId: number;
  currentJobApplication: JobApplicationModel | null = null;

  constructor(
    private fb: FormBuilder,
    private jobApplicationService: JobApplicationService,
    private dialogRef: MatDialogRef<AddDateJobapplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobApplicationId: number }
  ) {
    this.dateForm = this.fb.group({
      meetingDate: [null, Validators.required]
    });
    this.jobApplicationId = data.jobApplicationId;
  }

  ngOnInit(): void {
    if (this.jobApplicationId) {
      this.jobApplicationService.getAllJobApplicationById(this.jobApplicationId).subscribe(
        (data: JobApplicationModel) => {
          this.currentJobApplication = data;
          this.dateForm.patchValue({
            meetingDate: data.meetingDate
          });
        },
        (error) => {
          console.error('Error fetching job application:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.dateForm.valid && this.currentJobApplication) {
      const formData = this.dateForm.value;

      const updatedJobApplication: JobApplicationModel = {
        id: this.jobApplicationId,
        //condidatId: this.currentJobApplication.condidatId,
        //jobId: this.currentJobApplication.jobId,
        meetingDate: formData.meetingDate,
        headToHeadInterviewNote: this.currentJobApplication.headToHeadInterviewNote
      };

      this.jobApplicationService.updateJobApplication(this.jobApplicationId, updatedJobApplication)
        .subscribe(response => {
          console.log('Submission Response:', response);
          this.dialogRef.close(true); // Close the dialog after submission
        }, error => {
          console.error('Error submitting form:', error);
        });
    } else {
      console.log('Form is invalid or current job application is missing');
    }
  }
}
