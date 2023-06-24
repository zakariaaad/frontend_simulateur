import { Injectable, inject } from '@angular/core';

import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import { Authservice } from './authservice.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
class user{

}

@Injectable()
export class AuthguardService {

  constructor(public auth: Authservice,
    public router: Router,
    ) { }
   
     isAuthenticated() {
      console.log(this.auth.isLoggedIn())
      return  this.auth.isLoggedIn();
    }

  canActivate(user: any): Observable<boolean> | boolean {

    if(this.isAuthenticated() == false){
      this.router.navigate(['/permission-error']);
      return false;
    }else{
      return true;
    }
  }

}
export const canActivatePage: CanActivateFn = () => {
      return inject(AuthguardService).canActivate(inject(user));
  };