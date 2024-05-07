import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    UpdateRoleDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
