import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';

import { Employee } from '../employee';

import { FormGroup,FormControl,Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employee = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    created_at: new FormControl('',[Validators.required]),
    updated_at: new FormControl('',[Validators.required]),
   });

  errors={
    'email':''
  };
  isLoadingResults = false;
  constructor(private route: ActivatedRoute,private employeeService: EmployeeService,private router:Router) { 
    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if(params.id){
      
        this.employeeService.view(params.id).subscribe(
           (response: Response) => { 
             console.log(response);
             this.employee.setValue(response.data);

           }
        );
        
        
      }
    
    } );
  }
  deleteEmployee(id) {

    this.employeeService.delete(id).subscribe(
      (response: Response) => { 
        console.log("Deleted");
        console.log(response);
        this.router.navigate(['/employees']);
  
      }
  );

}
  save() {
    console.log(this.employee.value);

    this.isLoadingResults=true;
    this.employeeService.save(this.employee.value).subscribe(
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
