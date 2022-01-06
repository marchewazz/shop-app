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
  
  firstName : string | undefined;
  isUserLogged: boolean = false;
  showOptions: boolean = false;

  constructor(public router: Router, private authS: AuthService, private cartS: CartService) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart){
        this.checkIfUserLogged();
      }
      if (this.cartS.getProducts() == null){
        //IN CASE OF FIRST VISIT EMPTY CART SHOULD BE INITIALIZED
        this.authS.setDataInLocalStorage('cart', JSON.stringify([]))
      }
    })
  }

  checkIfUserLogged(){
    this.isUserLogged = this.authS.isUserLogged();
    
    if(this.isUserLogged){
      this.firstName = JSON.parse(this.authS.getUserDetails()).userFirstName;
      this.authS.updateUserData().subscribe((res: any) => {
        this.authS.setUserDetails(res.userData);
      })
    }
  }

  logout(){
    this.authS.clearStorage();
    this.router.navigate(['/'])
  }
}
