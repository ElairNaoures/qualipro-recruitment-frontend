import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListAccountsComponent } from './pages/list-accounts/list-accounts.component';
import { ListModuleComponent } from './pages/list-module/list-module.component';
import { ListRolesComponent } from './pages/list-role/list-role.component';
import { JobDetailsPageComponent } from '../jobs/pages/job-details-page/job-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'modules',
        pathMatch: 'full',
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          { path: 'list', component: ListUsersComponent },
        ],
      },

      {
        path: 'accounts',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          { path: 'list', component: ListAccountsComponent },
        ],
      },

      {
        path: 'roles',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          { path: 'list', component: ListRolesComponent },
        ],
      },
      {
        path: 'modules',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListModuleComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
