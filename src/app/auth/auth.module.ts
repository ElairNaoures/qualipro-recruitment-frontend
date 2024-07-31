import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MaterialModule } from '../shared/modules/material.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { PrimengModule } from '../shared/modules/primeng.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignInAdminComponent } from './pages/sign-in-admin/sign-in-admin.component';
import { SignUpAdminComponent } from './pages/sign-up-admin/sign-up-admin.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    SignInAdminComponent,
    SignUpAdminComponent,
  ],
  imports: [
  
    AuthRoutingModule,
    MaterialModule,
    DialogModule, 
    ButtonModule, 
    //InputTextModule, 
    AvatarModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
    MatFormFieldModule
    
    ]
})
export class AuthModule { }
