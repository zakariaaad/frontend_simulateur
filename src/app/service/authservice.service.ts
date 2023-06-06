import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

//API Config
const apiUrl = 'http://localhost:5000/';

const httplink = {
  authentification: apiUrl + 'api/user',
}

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private http: HttpClient,
    private router : Router) {}

  public login(credentials: any){
    return this.http.post(httplink.authentification + '/login', credentials).pipe(map((response:any) => {
      console.log(response);
      // return false;
      // let result = response.json();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        // localStorage.setItem('email', response.email);
        return true;
      }
      return false;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
     if(!token){
      return false;
    }
    
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

// console.log("isLoggedIn",jwtHelper.isTokenExpired())
    return !isExpired;
  }
}
