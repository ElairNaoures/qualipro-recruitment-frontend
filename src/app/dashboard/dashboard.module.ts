import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListAccountsComponent } from './pages/list-accounts/list-accounts.component';
import { ListModuleComponent } from './pages/list-module/list-module.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListRolesComponent } from './pages/list-role/list-role.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AddModuleDialogComponent } from './dialogs/add-module-dialog/add-module-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddRoleDialogComponent } from './dialogs/add-role-dialog/add-role-dialog.component';
import { DeleteRoleDialogComponent } from './dialogs/delete-role-dialog/delete-role-dialog.component';
import { DeleteModuleDialogComponent } from './dialogs/delete-module-dialog/delete-module-dialog.component';
import { UpdateModuleDialogComponent } from './dialogs/update-module-dialog/update-module-dialog.component';
import { UpdateRoleDialogComponent } from './dialogs/update-role-dialog/update-role-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { PrimengModule } from '../shared/modules/primeng.module';
import { MaterialModule } from '../shared/modules/material.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutComponent } from '../layout/layout/layout.component';
import { AddAccountDialogComponent } from './dialogs/add-account-dialog/add-account-dialog.component';
import { DeleteAccountDialogComponent } from './dialogs/delete-account-dialog/delete-account-dialog.component';
import { UpdateAccountDialogComponent } from './dialogs/update-account-dialog/update-account-dialog.component';
import { ListJobComponent } from './pages/list-job/list-job.component';
import { AddJobDialogComponent } from './dialogs/add-job-dialog/add-job-dialog.component';
import { UpdateJobDialogComponent } from './dialogs/update-job-dialog/update-job-dialog.component';
import { DeleteJobDialogComponent } from './dialogs/delete-job-dialog/delete-job-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListContractTypesComponent } from './pages/list-contract-types/list-contract-types.component';
import { AddContactTypeDialogComponent } from './dialogs/add-contact-type-dialog/add-contact-type-dialog.component';
import { DeleteContactTypeDialogComponent } from './dialogs/delete-contact-type-dialog/delete-contact-type-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './dialogs/delete-user-dialog/delete-user-dialog.component';
import { ListCondidatComponent } from './pages/list-condidat/list-condidat.component';
import { DeleteCondidatDialogComponent } from './dialogs/delete-condidat-dialog/delete-condidat-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ListUsersComponent,
   ListAccountsComponent,
    ListRolesComponent,
    ListModuleComponent,
    AddModuleDialogComponent,
    AddRoleDialogComponent,
    DeleteRoleDialogComponent,
    DeleteModuleDialogComponent,
    UpdateModuleDialogComponent,
    UpdateRoleDialogComponent, 
    LayoutComponent,
     AddAccountDialogComponent,
     DeleteAccountDialogComponent,
     UpdateAccountDialogComponent,
     ListJobComponent,
     AddJobDialogComponent,
     UpdateJobDialogComponent,
     DeleteJobDialogComponent,
     ListContractTypesComponent,
     AddContactTypeDialogComponent,
     DeleteContactTypeDialogComponent,
     AddUserDialogComponent,
     DeleteUserDialogComponent,
     ListCondidatComponent,
     DeleteCondidatDialogComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    PrimengModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    MatDatepickerModule, 
    MatInputModule, 
    MatNativeDateModule, 
    MatFormFieldModule,
    MatDividerModule
  ]
})
export class DashboardModule { }
