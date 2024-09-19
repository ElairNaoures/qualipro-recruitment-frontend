import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListAccountsComponent } from './pages/list-accounts/list-accounts.component';
import { ListModuleComponent } from './pages/list-module/list-module.component';
import { ListRolesComponent } from './pages/list-role/list-role.component';
import { JobDetailsPageComponent } from '../jobs/pages/job-details-page/job-details-page.component';
import { ListJobComponent } from './pages/list-job/list-job.component';
import { ListContractTypesComponent } from './pages/list-contract-types/list-contract-types.component';
import { ListCondidatComponent } from './pages/list-condidat/list-condidat.component';
import { AdminQuizComponent } from './pages/admin-quiz/admin-quiz.component';
import { ListSkillsComponent } from './pages/list-skills/list-skills.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { ListQuizComponent } from './pages/list-quiz/list-quiz.component';
import { AddProfileJobComponent } from './components/add-profile-job/add-profile-job.component';
import { ListProfileJobComponent } from './pages/list-profile-job/list-profile-job.component';
import { ListJobApplicationComponent } from './pages/list-job-application/list-job-application.component';
import { InformationPersoUserComponent } from './components/information-perso-user/information-perso-user.component';
import { JobApplicationChartComponent } from './components/job-application-chart/job-application-chart.component';
import { QuizEvaluationComponent } from './components/quiz-evaluation/quiz-evaluation.component';
import { CondidatMoyenChartComponent } from './components/condidat-moyen-chart/condidat-moyen-chart.component';

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
      // {
      //   path: 'users',
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: 'list',
      //       pathMatch: 'full',
      //     },
      //     { path: 'list', component: ListUsersComponent },
      //   ],
      // },

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

      {
        path: 'jobs',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListJobComponent },
        ],
      },

      {
        path: 'contracttypes',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListContractTypesComponent },
        ],
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
        path: 'condidats',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListCondidatComponent },

          
        ],
      },
      {
        path: 'skills',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListSkillsComponent },

          
        ],
      },
      {
        path: 'quizs',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListQuizComponent },

          
        ],
      },
      {
        path: 'ProfileJobs',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListProfileJobComponent },

          
        ],
      },
      {
        path: 'EmploisDemander',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          { path: 'list', component: ListJobApplicationComponent },

          
        ],
      },
      
      { path: 'updateinformation/:userId', component: InformationPersoUserComponent },

      { path: 'AdminQuiz', component: AdminQuizComponent },
      { path: 'addQuiz/:profileJobId', component: AddQuizComponent },
      { path: 'addQuestion/:quizId', component: AddQuestionComponent },

      { path: 'addProfileJob', component: AddProfileJobComponent },
      { path: 'statistics/countByJob', component: JobApplicationChartComponent },
      { path: 'statistics/condidatmoyen', component: CondidatMoyenChartComponent },

      
      { path: 'QuizEvaluation/:jobApplicationId', component: QuizEvaluationComponent },


      
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
