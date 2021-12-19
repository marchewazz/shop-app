import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { CartService } from 'src/app/services/cartService/cart.service';
import { AuthService } from 'src/app/services/authService/auth.service';
@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  styleUrls: ['./shipping-page.component.scss']
})
export class ShippingPageComponent implements OnInit {

  productsInCart: any;
  cartPrice: number = 0;
  dataIssue = "";

  optionsControl = new FormControl();
  nameControl = new FormControl();
  lastnameControl = new FormControl();
  cityControl = new FormControl();

  constructor(private cs: CartService, private as: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.updateCart();
    if (!this.isUserLogged()){
      this.optionsControl.disable();
    }
  }

  isUserLogged() {
    return this.as.isUserLogged();
  }

  updateCart(){
    this.productsInCart = this.cs.getProducts()

    if (this.productsInCart !== null) this.productsInCart = JSON.parse(this.productsInCart)
    this.cartPrice = this.calculateCartPrice()
    console.log(this.productsInCart, [], this.calculateCartPrice());
  }

  calculateCartPrice(): number{
    return (this.productsInCart.reduce((sum: any, cartProduct: any) => sum + (cartProduct['productPrice'] * cartProduct['quantity']), 0)).toFixed(2);
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  enableDisableForm(){
    const selectedOption = this.optionsControl.value;
    
    if (selectedOption == "account"){
      this.dataIssue = "";
      this.nameControl.disable();
      this.lastnameControl.disable();
      this.cityControl.disable();
    }
    if (selectedOption == "form"){
      this.nameControl.enable();
      this.lastnameControl.enable();
      this.cityControl.enable();
    }
  }

  payment(){
    console.log(this.optionsControl.value);
    
    if (this.optionsControl.value == "form"){
      var firstName = this.nameControl.value;
      var lastName = this.lastnameControl.value;
      var city = this.cityControl.value;
      if (!firstName || !lastName || !city){
        this.dataIssue = "pass data";
        return;
      }
    } else {
      var userData = JSON.parse(this.as.getUserDetails());

      var firstName = userData.userFirstName;
      var lastName = userData.userLastName;
      var city = userData.userCity;
      
    }
    const orderData = {
      firstName: firstName,
      lastName: lastName,
      city: city,
      email: userData.userEmail,
      products: this.cs.getProducts(),
      price: this.calculateCartPrice()
    }
    console.log(orderData);
  }
}
