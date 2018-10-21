import { Component, OnInit } from '@angular/core';

import { Router} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';

import { Employee } from '../employee';
import { FormGroup,FormControl,Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  //employee={};
  employee = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
   });

  errors={
    'email':'',
    'name':''
  };

  isLoadingResults = false;

  constructor(private employeeService: EmployeeService,private router:Router) { }

  ngOnInit() {
  }
  create() {
    console.log(this.employee);

    this.isLoadingResults=true;
    this.employeeService.create(this.employee.value).subscribe(
      (response: Response) => { 
        this.isLoadingResults=false;
        console.log(response);
        this.employee=response.data;
        this.router.navigate(['/employees/'+response.data.id]);

      },
      (err) => {
        this.isLoadingResults=false;
        this.errors=err.error.errors;
        if(this.errors.email){
          this.employee.controls['email'].setErrors({'incorrect': true});
        }

      },
      () => {
        //Completed

      }
      
   );

  }

}
