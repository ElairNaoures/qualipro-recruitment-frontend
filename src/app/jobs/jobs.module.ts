import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { ListJobsComponent } from './pages/list-jobs/list-jobs.component';
import { ListJobsLienComponent } from './pages/list-jobs-lien/list-jobs-lien.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { PrimengModule } from '../shared/modules/primeng.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LayoutComponent } from '../layout/layout/layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileCondidatPageComponent } from './pages/profile-condidat-page/profile-condidat-page.component';
import { InformationPersoCondidatComponent } from './components/information-perso-condidat/information-perso-condidat.component';
import { ExperienceProfCondidatComponent } from './components/experience-prof-condidat/experience-prof-condidat.component';
import { EducationCondidatComponent } from './components/education-condidat/education-condidat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CandidatedetailComponent } from './components/candidatedetail/candidatedetail.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { AddProfessionalExperComponent } from './components/add-professional-exper/add-professional-exper.component';
import { CandidateQuizComponent } from './components/candidate-quiz/candidate-quiz.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReponseCondidatComponent } from './components/reponse-condidat/reponse-condidat.component';
import { FinQuizComponent } from './components/fin-quiz/fin-quiz.component';

@NgModule({
  declarations: [
    
    JobsComponent,
    ListJobsComponent,
    ListJobsLienComponent,
    JobDetailsPageComponent,
    ProfileCondidatPageComponent,
    InformationPersoCondidatComponent,
    ExperienceProfCondidatComponent,
    EducationCondidatComponent,
    CandidatedetailComponent,
    ApplyJobComponent,
    
    AddEducationComponent,
    
   
    AddProfessionalExperComponent,
               CandidateQuizComponent,
               ReponseCondidatComponent,
               FinQuizComponent,
   // LayoutComponent
    

  ],
  imports: [
    MatSnackBarModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
   MatExpansionModule,
    
    MatIconModule,
   // BrowserAnimationsModule,

    CommonModule,
    JobsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    

    
  
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule

  ]
})
export class JobsModule { }
