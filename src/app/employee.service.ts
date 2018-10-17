import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { Employee } from './employee';

import { GlobalProvider } from "./globalprovider";

import { Router} from "@angular/router";

import { Response } from './response';

import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class EmployeeService {

  listData=[]; 
  viewData={}; 
  errors={};
  access_token="";
  constructor(public global: GlobalProvider,private http: HttpClient,private router:Router,private cookieService: CookieService) { 
    this.errors={}; 
    //console.log("Inside Constructor");
    
  }

  list(search_data,page=1,limit=10,sortby,order): any {
    console.log("Inside Employee list service");
    let search_str="";
    if(search_data){

        if(search_data.name){
            search_str+="&search[name]="+search_data.name;
        }
        if(search_data.email){
            search_str+="&search[email]="+search_data.email;
        }
       
    }
    let access_token= this.cookieService.get('accesstoken');

    return this.http.get("/v1/employees?access_token="+access_token+search_str+"&page="+page+"&limit="+limit+"&sort="+sortby+" "+order);
   }

   view(id): any {
    console.log("Inside Employee view service,id:"+id);
    let access_token= this.cookieService.get('accesstoken');
    return this.http.get("/v1/employees/"+id+"?access_token="+access_token);

   }
   delete(id): any {
    console.log("Inside Employee delete service,id:"+id);
    let access_token= this.cookieService.get('accesstoken');
    return this.http.delete("/v1/employees/"+id+"?access_token="+access_token);

   }
   save(employee:Employee): any {

    console.log("Inside Save service function");

     let body = JSON.stringify(employee);

    let httpOptions = {
        headers: new HttpHeaders({
             'Content-Type':  'application/json',
        })
    };
    let access_token= this.cookieService.get('accesstoken');
    return this.http.put("/v1/employees/"+employee.id+"?access_token="+access_token,body,httpOptions);
    
  }
  create(employee:Employee): any {

    console.log("Inside create service function");

     let body = JSON.stringify(employee);

    let httpOptions = {
        headers: new HttpHeaders({
             'Content-Type':  'application/json',
        })
    };
    let access_token= this.cookieService.get('accesstoken');
    return this.http.post("/v1/employees?access_token="+access_token,body,httpOptions);
    
  }
   

}
