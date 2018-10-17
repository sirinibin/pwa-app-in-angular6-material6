import { Component, OnInit } from '@angular/core';

import { GlobalProvider } from "./../globalprovider";

import { Router} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';

import {MatPaginator, MatSort,MatSpinner,MatPaginatorBase} from '@angular/material';

import { FormGroup,FormControl,Validators} from "@angular/forms";

export interface PeriodicElement {
  name: string;
  email: string;
}


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  listData=[];
  displayedColumns: string[] = ['name', 'email','actions'];
  
  page=1;
  limit=5;
  totalCount=0;
  search_data={};
  sortby="name";
  order="asc";
  
  isLoadingResults = true;

  searchform = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
   });

  constructor(public global: GlobalProvider,private router:Router,private employeeService: EmployeeService) {
    //this.global.isGuest=false;
    this.global.currentPage='employees';

    if(this.global.isGuest){
      console.log("Guest");
      this.router.navigate(['login']);
    }

     
  }

  ngOnInit() {
    this.list();
  }
  search(){
    console.log(this.search_data);
  
    this.page=1;
    this.list();
    
  }
  sortData(e: any) {
  
    console.log(e);
    this.sortby=e.active;
    this.order=e.direction;   
    this.page=1;

    this.list();
    
  }
  sort(sortby) {
    this.sortby=sortby;
    if(this.order=='asc'){
      this.order='desc';
    }else {
      this.order='asc';
    }
    this.listData=[];
    this.page=1;
    this.list();
  }
  deleteEmployee(id) {

        this.employeeService.delete(id).subscribe(
          (response: Response) => { 
            console.log("Deleted");
            console.log(response);
            this.list();
            
          }
      );

  }
  public handlePage(e: any) {
    this.page = e.pageIndex;
    this.page++;
    this.limit = e.pageSize;
    this.list();
  }
  
  loadMore() {
    this.page++;
    this.list();
  }
  
  list() {
    console.log("page:"+this.page);
    console.log("Sort by:"+this.sortby+" "+this.order);

    this.isLoadingResults = true;

    this.employeeService.list(this.searchform.value,this.page,this.limit,this.sortby,this.order)
    .subscribe(

      (response:Response) => {
          console.log(response);
          this.isLoadingResults = false;

         // this.listData=this.listData.concat(response.data);
          this.listData=response.data;
          this.totalCount=response.totalCount;
          
      },
      (err) => {
          console.log(err);
          this.isLoadingResults = false;

      },
      () => {
          //Completed

      }
     );

  }



}
