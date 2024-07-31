import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { ListJobsLienComponent } from './pages/list-jobs-lien/list-jobs-lien.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { ListJobsComponent } from './pages/list-jobs/list-jobs.component';
import { ProfileCondidatPageComponent } from './pages/profile-condidat-page/profile-condidat-page.component';

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
      path: 'job-detail/:id', component: JobDetailsPageComponent },
      
      { path: 'condidats/:id', component: ProfileCondidatPageComponent } // Route pour afficher le profil d'un candidat

  ],
},
];
  
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
