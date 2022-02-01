import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AuthService } from './services/authService/auth.service';
import { CartService } from './services/cartService/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  firstName : string | undefined;
  isUserLogged: boolean = false;
  showOptions: boolean = false;

  searchPharseControl: FormControl = new FormControl();

  constructor(public router: Router, private authS: AuthService, private cartS: CartService) { 
    this.searchPharseControl.setValue("");
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

  searchProducts(){
    this.redirect(this.createPath('/products/', this.searchPharseControl.value))
  }

  redirect(path: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([path]));
  }
  
  createPath(path: string, param: any): string{
    return path+param
  }
}
