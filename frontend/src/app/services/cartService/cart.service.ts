import { Injectable } from '@angular/core';

import { CartComponent } from 'src/app/components/cart-component/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getProducts(): any | null{
    return localStorage.getItem('cart')
  }

  addProduct(product: any, quantity: number){

    function isProductInCart(id: number, cartArray: any[]): boolean{
      //FUNCTION OBVIOUSLY CHECKS IF PRODUCT IS IN CART
      const isIn = cartArray.find(cartProduct => cartProduct.productID == id)
      if (isIn === undefined) return false
      else return true
    }

    var localCart = this.getProducts();

    var arrayLocalCart: any;

    const productToAdd = {
      productID: product.productID,
      quantity: quantity
    }

    if (localCart !== null) {
      //COPY CART FROM LOCAL STORAGE TO VARIABLE
      arrayLocalCart = JSON.parse(localCart);
    }

    if (isProductInCart(productToAdd.productID, arrayLocalCart)){
      //IF PRODUCT IS IN CART JUST INCREASE QUANTITY
      this.increaseProductQuantity(productToAdd.productID, quantity, arrayLocalCart)
    } else {
      //OTHERWISE PUSH NEW PRODUCT
      arrayLocalCart.push(productToAdd)
    }
    //OVERWRITE CART IN LOCAL STORAGE
    localStorage.setItem('cart', JSON.stringify(arrayLocalCart))
  }

  increaseProductQuantity(productID: number, quantity: number, cartArray: any[]){
    for(var cartProduct of cartArray){
      //LOOKING FOR PRODUCT ID THEN INCREASE OR DECREASE
      if (cartProduct.productID == productID){
        cartProduct.quantity += quantity;
        //IF AFTER CHANGE QUANTITY IS EQUAL OR SMALLER THAN 0 (USUALLY WILL BE EQUAL BECAUSE CAN'T SEE A WAY TO DECREASE BY MORE THAN 1)
        if (cartProduct.quantity <= 0) localStorage.setItem('cart', JSON.stringify(cartArray.filter((product: any) => product.productID != productID)));
        else localStorage.setItem('cart', JSON.stringify(cartArray))
      }
    }
  }

  calculatePrice(products: any[]): number{
    return (products.reduce((sum: any, product: any) => sum + (product['productPrice'] * product['quantity']), 0)).toFixed(2);
  }
}
