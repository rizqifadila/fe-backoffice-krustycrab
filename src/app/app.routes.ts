import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './shared/guard/auth.guard';
import { EmployeeFormComponent } from './pages/master/employee/components/form/employee-form.component';
import { EmployeeListComponent } from './pages/master/employee/components/list/employee-list.component';
import { EmployeeDetailComponent } from './pages/master/employee/components/detail/employee-detail/employee-detail.component';

export const routes: Routes = [
   {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'master', redirectTo: 'home' },
      {
        path: 'master',
        children: [
          {
            path: 'employee',
            children: [
              {
                path: '',
                component: EmployeeListComponent,
              },
              {
                path: 'form',
                component: EmployeeFormComponent,
              },
              {
                path: 'form/:id',
                component: EmployeeFormComponent,
              },
              {
                path: 'detail/:id',
                component: EmployeeDetailComponent,
              },
            ]
          },
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
