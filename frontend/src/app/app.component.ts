import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

import { AuthService } from './services/authService/auth.service';
import { CartService } from './services/cartService/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';

  authS: AuthService = new AuthService();
  cartS: CartService = new CartService()
  firstName : string | undefined;
  isUserLogged: boolean = false;
  showOptions: boolean = false;

  constructor(public router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart){
        this.checkIfUserLogged()
      }
      if (this.cartS.getProducts() == null){
        this.authS.setDataInLocalStorage('cart', JSON.stringify([]))
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
