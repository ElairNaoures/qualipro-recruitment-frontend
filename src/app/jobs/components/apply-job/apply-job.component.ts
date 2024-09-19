import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { JobApplicationService } from '../../../shared/services/job-application.service';
import { JobApplicationModel } from '../../../shared/models/job-application-model';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent {
  showEducationPanel = false;
  showExperiencePanel = false;
  fileName: string | null = null;
  jobId: number | null = null;
  condidatId: number | null = null
  jobProfileId!: number;
    constructor(
 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private jobApplicationService: JobApplicationService
  ) {}


  ngOnInit(): void {
    this.condidatId = this.getCondidatId(); // Assurez-vous que cette méthode existe pour obtenir l'ID du candidat
    this.route.paramMap.subscribe(params => {
      this.jobId = Number(params.get('jobId'));
      this.jobProfileId = Number(params.get('jobProfileId'));

    });
  }

  triggerFileInput(event: Event) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      console.log('File selected:', file);
      // Add your file handling logic here
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    // Optionally add a visual indicator for drag-over state
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.fileName = file.name;
      console.log('File dropped:', file);
      // Add your file handling logic here
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    // Optionally remove visual indicator for drag-leave state
  }

  toggleEducationPanel() {
    this.showEducationPanel = !this.showEducationPanel;
  }

  toggleExperiencePanel() {
    this.showExperiencePanel = !this.showExperiencePanel;
  }

  // onSubmit() {
  //   if (this.condidatId !== null && this.jobId !== null && this.jobProfileId !== null) {
  //     const jobApplication: JobApplicationModel = {
  //       condidatId: this.condidatId,
  //       jobId: this.jobId,
  //       meetingDate: null, // or another value depending on your needs
  //       headToHeadInterviewNote: null
    
  //     };

  //     this.jobApplicationService.addJobApplication(jobApplication).subscribe({
  //       next: () => {
  //         console.log('Application submitted successfully');
  //         this.router.navigate(['jobs/CandidateQuiz']); // Redirect after submission
  //       },
  //       error: (err) => {
  //         console.error('Error submitting application:', err);
  //       }
  //     });
  //   } else {
  //     console.error('Candidate ID or Job ID is missing');
  //   }
  // }
  onSubmit() {
    if (this.condidatId !== null && this.jobId !== null && this.jobProfileId !== null) {
      const jobApplication: JobApplicationModel = {
        condidatId: this.condidatId,
        jobId: this.jobId,
        meetingDate: null,
        headToHeadInterviewNote: null
      };
  
      // Submit the job application
      this.jobApplicationService.addJobApplication(jobApplication).subscribe({
        next: (response: any) => { // Adjust the type based on your backend response
          const jobApplicationId = response.id; // Assuming the backend returns the jobApplicationId
          console.log('Application submitted successfully, jobApplicationId:', jobApplicationId);
          
          // Optionally, display a success message or notification
  
          // Navigate to CandidateQuiz with jobApplicationId in the URL
          this.router.navigate([`jobs/CandidateQuiz/${jobApplicationId}`]);
        },
        error: (err) => {
          console.error('Error submitting application:', err);
        }
      });
    } else {
      console.error('Candidate ID or Job ID is missing');
    }
  }
  
  
  

  private getCondidatId(): number | null {
    // Retrieve candidate ID from local storage
    const id = localStorage.getItem('condidatId');
    return id ? Number(id) : null;
  }
}
