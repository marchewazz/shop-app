import { Injectable } from '@angular/core';

import { CartComponent } from 'src/app/components/cart-component/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getProducts(){
    return localStorage.getItem('cart')
  }

  addProduct(product: any, quantity: number){

    function isProductInCart(id: number, cartArray: any[]): boolean{
      const isIn = cartArray.find(cartProduct => cartProduct.productID == id)
      if (isIn === undefined) return false
      else return true
    }

    var localCart = this.getProducts()
    var arrayLocalCart: any;
    const productToAdd = {
      productID: product.productID,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: quantity
    }

    if (localCart !== null) {
      arrayLocalCart = JSON.parse(localCart);
      console.log(isProductInCart(productToAdd.productID, arrayLocalCart));
    }

    if (isProductInCart(productToAdd.productID, arrayLocalCart)){
      this.increaseProductQuantity(productToAdd.productID, quantity, arrayLocalCart)
    } else {
      arrayLocalCart.push(productToAdd)
    }
    localStorage.setItem('cart', JSON.stringify(arrayLocalCart))
  }

  increaseProductQuantity(productID: number, quantity: number, cartArray: any[]){
    for(var cartProduct of cartArray){
      if (cartProduct.productID == productID){
        cartProduct.quantity += quantity;
        if (cartProduct.quantity <= 0) localStorage.setItem('cart', JSON.stringify(cartArray.filter((product: any) => product.productID != productID)));
        else localStorage.setItem('cart', JSON.stringify(cartArray))
      }
    }
  }
}
