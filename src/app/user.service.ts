import { Injectable } from '@angular/core';

import { User } from './user';

import { Response } from './response';

import { LoginForm } from './loginform';


import { HttpClient,HttpHeaders  } from '@angular/common/http';


import { GlobalProvider } from "./globalprovider";

import { Router} from "@angular/router";


import { CookieService } from 'ngx-cookie-service';
//import { AnonymousSubject } from 'rxjs/Subject';


@Injectable()
export class UserService {

   httpOptions = {
    headers: new HttpHeaders({
         'Content-Type':  'application/json',
    })
   };
   access_token="";
  constructor(public global: GlobalProvider,private http: HttpClient,private router:Router,private cookieService: CookieService) { 

    this.access_token = this.cookieService.get('accesstoken');
  }

  errors={};

  create(user:User): any {
    console.log("Inside Create Function under UserService");
    let body = JSON.stringify(user);
    return this.http.post("/v1/register",body,this.httpOptions);

  }

  authorize(loginform:LoginForm): any {

    console.log("Inside Login Function under UserService");

    let body = JSON.stringify(loginform);

    return this.http.post(this.global.API_ENDPOINT+"/v1/authorize",body,this.httpOptions);
       

  }

  accesstoken(authtoken): any {

    console.log("Inside Accesstoken Function under UserService");

    let data={ "authorization_code": authtoken };

    let body = JSON.stringify(data);

    return this.http.post(this.global.API_ENDPOINT+"/v1/accesstoken",body,this.httpOptions);
        

  }

    userinfo(at): any {

        console.log("Inside Userinfo(ME) Function under UserService");
        return this.http.get("/v1/me?access_token="+at);

    }



}
