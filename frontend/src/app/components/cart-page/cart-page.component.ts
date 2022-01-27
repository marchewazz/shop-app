import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/services/cartService/cart.service';
import { ProductsService } from 'src/app/services/productsService/products.service';

import { shopCurrency } from 'src/app/utilities';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  productsInCart: any;
  cartPrice: number = 0;
  shopCurrency: string = shopCurrency;

  constructor(private cs: CartService, private ps: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.updateCart()
  }

  updateCart(){
    this.ps.getProductsData(JSON.parse(this.cs.getProducts())).then((value: any) => {
      this.productsInCart = value;
    })
    setTimeout(() => this.cartPrice = this.cs.calculatePrice(this.productsInCart), 100);
  }

  resetCart(){
    localStorage.setItem('cart', '[]');
    this.updateCart()
  }

  redirect(path: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([path]));
  }

  createPath(path: string, param: any): string{
    return path+param
  }
}
