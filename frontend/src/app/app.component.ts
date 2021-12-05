import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

import { AuthService } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  authS: AuthService = new AuthService();
  firstName : string | undefined;
  isUserLogged = false;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart){
        this.checkIfUserLogged()
      }
    })
  }

  checkIfUserLogged(){
    this.isUserLogged = this.authS.isUserLogged();
    console.log(this.isUserLogged);
    this.firstName = this.isUserLogged ? JSON.parse(this.authS.getUserDetails()).userFirstName : undefined;
  }
  logout(){
    this.authS.clearStorage()
    this.router.navigate(['/'])
  }
}
