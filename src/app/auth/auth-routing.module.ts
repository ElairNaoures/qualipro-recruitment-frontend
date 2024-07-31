import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInAdminComponent } from './pages/sign-in-admin/sign-in-admin.component';
import { SignUpAdminComponent } from './pages/sign-up-admin/sign-up-admin.component';

const routes: Routes = [
        { path: 'sign-in', 
        component: SignInComponent 
      },

      { path: 'sign-up', 
      component: SignUpComponent 
      },
      { path: 'admin/sign-in', 
        component: SignInAdminComponent 
      },

      { path: 'admin/sign-up', 
      component: SignUpAdminComponent 
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
