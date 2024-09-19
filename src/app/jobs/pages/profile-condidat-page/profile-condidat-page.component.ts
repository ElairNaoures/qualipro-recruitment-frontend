import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CondidatModel } from '../../../shared/models/Condidat.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CondidatService } from '../../../shared/services/condidat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalExperCondModel } from '../../../shared/models/professional-exper-cond-model';
import { ProfessionalExperCondService } from '../../../shared/services/professional-exper-cond.service';
import { EducationModel } from '../../../shared/models/education.model';
import { EducationService } from '../../../shared/services/education.service';
import { AccountModel } from '../../../shared/models/account.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profile-condidat-page',
  templateUrl: './profile-condidat-page.component.html',
  styleUrls: ['./profile-condidat-page.component.scss']
})
export class ProfileCondidatPageComponent implements OnInit {
  condidatForm: FormGroup;
  condidatId?: number;
  condidat: any; // Définir la propriété condidat
  professionalExperiences: ProfessionalExperCondModel[] = [];
  educations: EducationModel[] = [];
  account: AccountModel | any;

  constructor(
    private route: ActivatedRoute,
    private condidatService: CondidatService,
    private professionalExperCondService: ProfessionalExperCondService,
    private educationService: EducationService,
    //private accountService: TabAccountCondidatService,

    private fb: FormBuilder,
    private router: Router
  ) {
    this.condidatForm = this.fb.group({
      summary: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: [''],
      phoneNumber: [''],
      birthdate: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.condidatId = +idParam;
      this.getCondidat();
      this.getProfessionalExperiences();
      this.getEducationsByCondidatId();
    } else {
      console.error('Invalid candidate ID');
    }
  }

  getCondidat(): void {
    if (this.condidatId) {
      this.condidatService.getCondidatById(this.condidatId).subscribe(
        (data: any) => { // Ajustez le type en fonction de votre modèle
          this.condidat = data;
          this.condidatForm.patchValue(data);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getProfessionalExperiences(): void {
    if (this.condidatId) {
      this.professionalExperCondService.getProfessionalExperienceByCondidatId(this.condidatId).subscribe(
        (data: ProfessionalExperCondModel[]) => {
          this.professionalExperiences = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getEducationsByCondidatId(): void {
    if (this.condidatId) {
      this.educationService.getEducationsByCondidatId(this.condidatId).subscribe(
        (data: EducationModel[]) => {
          this.educations = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.condidatForm.valid && this.condidatId) {
      this.condidatService.updateCondidat(this.condidatId, this.condidatForm.value).subscribe(
        (data) => {
          console.log('Update successful', data);
          this.router.navigate(['/condidats', this.condidatId]);
        },
        (error) => {
          console.error('Update failed', error);
        }
      );
    }
  }

  // Function to generate PDF
  generatePDF(): void {
    const data = document.getElementById('resume') as HTMLElement;
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    });
  }
  navigateToJobSearch() {
    this.router.navigate(['/jobs/jobs-lien/list']);
  }
}
