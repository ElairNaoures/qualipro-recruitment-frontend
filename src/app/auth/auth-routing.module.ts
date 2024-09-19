import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInAdminComponent } from './pages/sign-in-admin/sign-in-admin.component';
import { SignUpAdminComponent } from './pages/sign-up-admin/sign-up-admin.component';
import { CandidatedetailComponent } from '../jobs/components/candidatedetail/candidatedetail.component';
import { InformationPersoUserComponent } from '../dashboard/components/information-perso-user/information-perso-user.component';

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
      },
      { path: 'jobs/candidatedetail/:condidatId', component: CandidatedetailComponent }, 
      { path: 'dashboard/updateinformation/:userId', component: InformationPersoUserComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
