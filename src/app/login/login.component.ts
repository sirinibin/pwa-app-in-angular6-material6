import { Component, OnInit } from '@angular/core';

import { GlobalProvider } from "./../globalprovider";

import { LoginForm } from '../loginform';


import { UserService } from "../user.service";

import { Router} from "@angular/router";

import { Response } from './../response';

import { CookieService } from 'ngx-cookie-service';

import { FormGroup,FormControl,Validators} from "@angular/forms";





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  /*
  loginform: LoginForm  = {
    username: '',
    password: '',
  };
  */
  loginform = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
   });
  errors={
    'username':'',
    'password':''
  };

  isProcessing=false;

  constructor(public global: GlobalProvider,private userService: UserService,private router:Router,private cookieService: CookieService) {

    if(!this.global.isGuest){
      this.router.navigate(['employees']);
    }
    this.global.currentPage='login';

  }

  ngOnInit() {

  }

  
  login(): void {

    console.log("Inside Login Function");

    this.isProcessing=true;
    this.userService.authorize(this.loginform.value)
    .subscribe(

      (response:Response) => {

        this.isProcessing=false;
          console.log(response);
          console.log("Auth Code:"+response.data.authorization_code);
          this.accessToken(response.data.authorization_code);
          
      },
      (err) => {

        this.isProcessing=false;
        this.errors=err.error.errors;

        if(this.errors.username){
          this.loginform.controls['username'].setErrors({'incorrect': true});
        }
        if(this.errors.password){
          this.loginform.controls['password'].setErrors({'incorrect': true});
        }
          console.log(this.errors);

      },
      () => {
        //Completed

      }
  );

  }

  accessToken(authcode):void {

    this. isProcessing=true;
    this.userService.accesstoken(authcode)
                  .subscribe(

                    (response:Response) => {
            
                      this. isProcessing=false;
                      console.log(response);
            
                       // let expires_at=response.data.expires_at.replace("T", " ");
                        this.cookieService.set('accesstoken', response.data.access_token,new Date(response.data.expires_at),"/");
            
                        this.global.isGuest=false;
                        /*
                        if(this.cookieService.check('accesstoken')){
                            this.global.isGuest=false;
                        }else {
                            this.global.isGuest=true;
                        }
                         */
        
                        this.userinfo(response.data.access_token);
      
                    },
                    (err) => {
                      this. isProcessing=false;
                      console.log(err);
            
                    },
                    () => {
                      //Completed
            
                    }
                );

  }
  userinfo(accesstoken) :void {

    this. isProcessing=true;
    this.userService.userinfo(accesstoken)
    .subscribe(

      (response:Response) => {
          this. isProcessing=false;
          console.log(response);
          this.cookieService.set( 'username', response.data.username );
          this.global.username=this.cookieService.get('username');
          this.router.navigate(['employees']);
      },
      (err) => {
          this. isProcessing=false;
          console.log(err);

      },
      () => {
          //Completed

      }
    );
  }


}
