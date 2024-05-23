import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { ListJobsLienComponent } from './pages/list-jobs-lien/list-jobs-lien.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';

const routes: Routes = [{ 
  path: '',
   component: JobsComponent,
  
   children: [
    
    {
      path: 'jobs-lien',
      children: [{ path: 'list', component: ListJobsLienComponent },
      { path: 'list/:id', component: JobDetailsPageComponent },


      ],
    },
  ],
},
];
  
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
