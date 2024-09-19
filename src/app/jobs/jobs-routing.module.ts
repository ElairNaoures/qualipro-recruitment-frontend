import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { ListJobsLienComponent } from './pages/list-jobs-lien/list-jobs-lien.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { ListJobsComponent } from './pages/list-jobs/list-jobs.component';
import { ProfileCondidatPageComponent } from './pages/profile-condidat-page/profile-condidat-page.component';
import { EducationCondidatComponent } from './components/education-condidat/education-condidat.component';
import { ExperienceProfCondidatComponent } from './components/experience-prof-condidat/experience-prof-condidat.component';
import { InformationPersoCondidatComponent } from './components/information-perso-condidat/information-perso-condidat.component';
import { CandidatedetailComponent } from './components/candidatedetail/candidatedetail.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { AddProfessionalExperComponent } from './components/add-professional-exper/add-professional-exper.component';
import { CandidateQuizComponent } from './components/candidate-quiz/candidate-quiz.component';
import { ReponseCondidatComponent } from './components/reponse-condidat/reponse-condidat.component';
import { FinQuizComponent } from './components/fin-quiz/fin-quiz.component';

const routes: Routes = [{ 
  path: '',
   component: JobsComponent,
  
   children: [
    
    
    {
      path: 'jobs-lien',
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full',
        },
        { path: 'list', component: ListJobsLienComponent },
      ],
    },

    {
      path: 'jobs',
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full',
        },

        { path: 'list', component: ListJobsComponent },
      ],
    },

    { 
      path: 'job-detail/:id/:jobProfileId', component: JobDetailsPageComponent },
      
      { path: 'condidatsCv/:id', component: ProfileCondidatPageComponent }, 
      { path: 'updateEducations/:condidatId', component: EducationCondidatComponent },
      { path: 'updateExperiences/:condidatId', component: ExperienceProfCondidatComponent },
      { path: 'updateinformation/:condidatId', component: InformationPersoCondidatComponent },
      { path: 'candidatedetail/:condidatId', component: CandidatedetailComponent },
      { path: 'apply/:condidatId/:jobId/:jobProfileId', component: ApplyJobComponent },

      { path: 'add-education/:condidatId', component: AddEducationComponent },
      { path: 'add-professional-experience/:condidatId', component: AddProfessionalExperComponent },
      { path: 'CandidateQuiz/:jobApplicationId', component: CandidateQuizComponent },
      { path: 'reponse', component: ReponseCondidatComponent },
      { path: 'fin-quiz', component: FinQuizComponent },

      
      


      

      
      // { path: 'educations/:condidatId/:educationId', component: EducationCondidatComponent },
      
  ],
},
];
  
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
