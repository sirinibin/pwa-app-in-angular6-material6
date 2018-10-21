import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
   MatCheckboxModule,
   MatFormFieldModule,
   MatInputModule,
   MatCardModule,
   MatToolbarModule,
   MatGridListModule,
   MatMenuModule,
   MatTableModule,
   MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { GlobalProvider } from "./globalprovider";


import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { UserService } from "./user.service";

import { EmployeeService } from "./employee.service";

import { CookieService } from 'ngx-cookie-service';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    EmployeeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    GlobalProvider,
    UserService,
    CookieService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
