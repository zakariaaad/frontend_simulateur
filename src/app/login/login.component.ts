import { Component } from '@angular/core';
import { Authservice } from '../service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean=false;

  constructor(private router: Router,private authService: Authservice){}

  signIn(credentials: any) {
    this.authService.login(credentials)
      .subscribe(result => { 
        console.log(result);
        if (result)
          this.router.navigate(['/']);
        else  
          this.invalidLogin = true; 
      });
  }
}
