import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { ListJobsComponent } from './pages/list-jobs/list-jobs.component';
import { ListJobsLienComponent } from './pages/list-jobs-lien/list-jobs-lien.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';


@NgModule({
  declarations: [
    JobsComponent,
    ListJobsComponent,
    ListJobsLienComponent,
    JobDetailsPageComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
