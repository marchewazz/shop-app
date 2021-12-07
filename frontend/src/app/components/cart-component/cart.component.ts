import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  showProducts = false;
  productsInCart: any;
  cartPrice: number = 0;
  constructor(private cs: CartService) { }

  ngOnInit(): void {
  }

  updateCart(){
    this.productsInCart = this.cs.getProducts()

    if (this.productsInCart !== null) this.productsInCart = JSON.parse(this.productsInCart)
    this.cartPrice = this.calculateCartPrice()
    console.log(this.productsInCart, [], this.calculateCartPrice());
  }

  resetCart(){
    localStorage.setItem('cart', '[]')
    this.showProducts = false;
    this.updateCart()
  }

  calculateCartPrice(): number{
    return (this.productsInCart.reduce((sum: any, cartProduct: any) => sum + (cartProduct['productPrice'] * cartProduct['quantity']), 0)).toFixed(2);
  }
}
