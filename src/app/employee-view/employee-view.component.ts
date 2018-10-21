import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';


import { Employee } from '../employee';


@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  employee:Employee;
  constructor(private route: ActivatedRoute,private employeeService: EmployeeService,private router:Router) {
   
   }

  ngOnInit() {

    this.route.params.subscribe( params => {
      if(params.id){
      
        this.employeeService.view(params.id).subscribe(
           (response: Response) => { 
             console.log("Cool. OK");
             console.log(response);
             this.employee=response.data;
             console.log(this.employee);
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
}
