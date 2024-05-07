import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListAccountsComponent } from './pages/list-accounts/list-accounts.component';
import { ListModuleComponent } from './pages/list-module/list-module.component';
import { ListRolesComponent } from './pages/list-role/list-role.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        children: [{ path: 'list', component: ListUsersComponent }],
      },

      {
        path: 'accounts',
        children: [{ path: 'list', component: ListAccountsComponent }],
      },

      {
        path: 'roles',
        children: [{ path: 'list', component: ListRolesComponent }],
      },
      {
        path: 'modules',
        children: [{ path: 'list', component: ListModuleComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
