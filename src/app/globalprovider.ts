import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GlobalProvider {
    isGuest = true;
    username="";
    currentPage='login';
    //API_ENDPOINT='http://api.nintriva.net';
    //API_ENDPOINT='http://localhost:8000';
    API_ENDPOINT="";

    constructor(private cookieService: CookieService) {

    }
}
