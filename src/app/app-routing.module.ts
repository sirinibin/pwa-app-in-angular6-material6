import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

import { LoginComponent }  from './login/login.component';
import { SignupComponent }  from './signup/signup.component';


const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees/create', component: EmployeeCreateComponent },
  { path: 'employees/update/:id', component: EmployeeUpdateComponent },
  { path: 'employees/:id', component: EmployeeViewComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
