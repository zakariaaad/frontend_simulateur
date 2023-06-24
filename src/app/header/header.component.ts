import { Component } from '@angular/core';
import { Authservice } from '../service/authservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authlogin :Authservice){}

  Connexion(){
    this.authlogin.isLoggedIn()
  }
  // authlogin.
}
