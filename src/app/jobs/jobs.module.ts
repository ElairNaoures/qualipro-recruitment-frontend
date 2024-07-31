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
    
   
  
   // LayoutComponent
    

  ],
  imports: [

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
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


  ]
})
export class JobsModule { }
