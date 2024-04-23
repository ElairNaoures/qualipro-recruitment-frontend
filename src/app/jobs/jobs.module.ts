import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { ListJobsComponent } from './pages/list-jobs/list-jobs.component';


@NgModule({
  declarations: [
    JobsComponent,
    ListJobsComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
