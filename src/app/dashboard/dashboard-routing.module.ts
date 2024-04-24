import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'users',
    children: [{ path: 'list', component: ListUsersComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
