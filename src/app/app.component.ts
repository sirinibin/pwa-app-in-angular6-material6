import { Component } from '@angular/core';

import { GlobalProvider } from "./globalprovider";

import { CookieService } from 'ngx-cookie-service';

import { Router} from "@angular/router";

//import { MatNavList } from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  constructor(public global: GlobalProvider,private cookieService: CookieService,private router:Router) {


    if(this.cookieService.check('accesstoken')){
      this.global.isGuest=false;
      this.global.username=this.cookieService.get('username');
      console.log("Username:"+this.global.username);
    }else {
      this.global.isGuest=true;
    }



  }

  logOut():void {

    this.cookieService.delete('username');
    this.cookieService.delete('accesstoken');
    this.cookieService.deleteAll();
    this.global.isGuest=true;

    this.router.navigate(['']);

  }

}
