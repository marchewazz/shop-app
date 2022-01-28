import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { CartService } from 'src/app/services/cartService/cart.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { OrdersService } from 'src/app/services/orderService/orders.service';
import { ProductsService } from 'src/app/services/productsService/products.service';

import { bankPageUrl, mainShopBill, shopCurrency } from 'src/app/utilities';
@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  styleUrls: ['./shipping-page.component.scss']
})
export class ShippingPageComponent implements OnInit {

  productsInCart: any;
  cartPrice: number = 0;
  isAnythingNotavailable: boolean = false;
  shopCurrency: string = shopCurrency;
  infoLabel = "";

  paymentControl = new FormControl();
  optionsControl = new FormControl();
  nameControl = new FormControl();
  lastnameControl = new FormControl();
  emailControl = new FormControl();
  cityControl = new FormControl();

  constructor(private cs: CartService, private as: AuthService, private os: OrdersService, private ps: ProductsService, private router: Router, @Inject(DOCUMENT)  private document: Document) { }

  ngOnInit(): void {
    this.updateCart();
    //NON-LOGGED USER HAS TO PASS ORDER DATA IN INPUTS
    if (!this.isUserLogged()){
      this.optionsControl.disable();
      this.optionsControl.setValue("form");
      this.paymentControl.setValue("now");
    } else {
      this.optionsControl.setValue("account");
      this.nameControl.disable();
      this.lastnameControl.disable();
      this.cityControl.disable();
      this.emailControl.disable();
      this.paymentControl.setValue("now");
    }
    
  }

  isUserLogged() {
    return this.as.isUserLogged();
  }

  updateCart(){
    this.ps.getProductsData(JSON.parse(this.cs.getProducts())).then((value: any) => {
      this.productsInCart = value;
    })
    setTimeout(() => {
      this.cartPrice = this.cs.calculatePrice(this.productsInCart);
      this.isAnythingNotavailable = this.checkForAvailability()
    }, 200);
  }

  checkForAvailability(): boolean{
    return this.productsInCart.some((product: any) => product.productQuantity === 0)
  }

  calculateCartPrice(): number{
    return this.cs.calculatePrice(this.productsInCart)
  }

  createPath(path: string, param: any): string{
    return path+param
  }
  
  redirect(path: string): void{
    this.router.navigate([path]);
  }

  enableDisableForm(){
    const selectedOption = this.optionsControl.value;
    //BASED ON RADIO BUTTON DIFFRENT INPUTS ARE ENABLED/DISABLED
    if (selectedOption == "account"){
      this.infoLabel = "";
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

  order(){
    var userData = JSON.parse(this.as.getUserDetails());
    //BASED ON RADIO DIFFRENT VALUES ARE ORDER DATA
    if (this.optionsControl.value == "form"){
      var firstName = this.nameControl.value;
      var lastName = this.lastnameControl.value;
      var city = this.cityControl.value;
      var email = this.emailControl.value;
      if (!firstName || !lastName || !city || !email){
        this.infoLabel = "Pass data";
        return;
      }
    } else {
      var firstName = userData.userFirstName;
      var lastName = userData.userLastName;
      var city = userData.userCity;
      var email = userData.userEmail;
    }

    var accountNumber = this.isUserLogged() ? userData.userBankAccNumber : "";

    const orderData = {
      userID: this.isUserLogged() ? userData.userID : null,
      firstName: firstName,
      lastName: lastName,
      city: city,
      email: email,
      products: this.cs.getProducts(),
      price: this.calculateCartPrice()
    }

    console.log(orderData, accountNumber, this.paymentControl.value);
    this.os.addOrder(orderData).subscribe((res: any) => {
      if (res.message == "ordered"){
        //IF USER CHOOSED "PAY NOW" HE IS REDIRECTED TO TRANSACTION PAGE IN OUR BANK
        //OTHERWISE HE CAN DO IT BY CLICKING BUTTON IN PROFILE PAGE
        //OBVIOUSLY NON-LOGGED USERS HAVE TO PAY RIGHT AWAY
        if (this.paymentControl.value == "now"){
          window.location.href = `${bankPageUrl}/transaction?sender=${accountNumber}&receiver=${mainShopBill}&note=${res.orderID}&amount=${orderData.price}`;
        } else {
          this.infoLabel = "Order has been ordered, pay in the next 24 hours!"
        }
      }
    });
  }
}

