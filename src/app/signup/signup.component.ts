import { Component, OnInit,Input } from '@angular/core';

import { GlobalProvider } from "./../globalprovider";

import { User } from '../user';

import { UserService } from "../user.service";

import { Router} from "@angular/router";

import { FormGroup,FormControl,Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   
     /* user: User = {
        username: '',
        email: '',
        password: ''
    };
    */
   user = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
   });

    errors={
      'username':'',
      'email':''
    };

    isProcessing=false;
    constructor(public global: GlobalProvider,private userService: UserService,private router:Router) {

    this.global.currentPage='signup';

       if(!this.global.isGuest){
            this.router.navigate(['employees']);
        }


  }

  ngOnInit() {
  
  }

    createUser(): void {

      console.log(this.user.value); //before it was only this.user
      console.log(this.user.errors);
      console.log("Status:"+this.user.status);
        console.log("Inside Create User Function");

       // return;
       // this.userService.create(user);

       this.isProcessing=true;
        this.userService.create(this.user.value).subscribe(
            (response: Response) => { 
              console.log(response);
              this.isProcessing=false;
              this.router.navigate(['login']);
            
              
            },
            (err) => {
      
              this.isProcessing=false;
              
              this.errors=err.error.errors;
              
              if(this.errors.username){
                this.user.controls['username'].setErrors({'incorrect': true});
              }
              if(this.errors.email){
                this.user.controls['email'].setErrors({'incorrect': true});
              }
              
             
             // this.user.setErrors(this.errors);
              console.log(this.user.errors);
      
            },
            () => {
              //Completed
            }    
         );
    }

}
