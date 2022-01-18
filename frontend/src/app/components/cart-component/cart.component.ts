import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";

import { CartService } from 'src/app/services/cartService/cart.service';

import { shopCurrency } from 'src/app/utilities';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  showProducts: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  productsInCart: any;
  cartPrice: number = 0;
  shopCurrency: string = shopCurrency;

  constructor(private cs: CartService, private router: Router) {
    this.showProducts.subscribe((value: any) => {
      console.log(value);
      if(value) this.updateCart()
    })
   }

  ngOnInit(): void {
    this.updateCart()
  }

  updateCart(){
    this.productsInCart = this.cs.getProducts()

    if (this.productsInCart !== null) this.productsInCart = JSON.parse(this.productsInCart)
    this.cartPrice = this.calculateCartPrice()
    console.log(this.productsInCart, [], this.calculateCartPrice());
  }

  resetCart(){
    localStorage.setItem('cart', '[]')
    this.showProducts.next(false);
    this.updateCart()
  }

  calculateCartPrice(): number{
    return this.cs.calculateCartPrice()
  }

  deleteProduct(id: number){
    console.log(id);
    localStorage.setItem('cart', JSON.stringify(this.productsInCart.filter((product: any) => product.productID != id)));
    this.updateCart()
  }

  increaseProductQuantity(productID: number, quantity: number){
    console.log(`fdsafs`);
    this.cs.increaseProductQuantity(productID, quantity, this.productsInCart);
    this.productsInCart = this.cs.getProducts();

    if (this.productsInCart !== null) this.productsInCart = JSON.parse(this.productsInCart)
    this.updateCart();
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }
}
