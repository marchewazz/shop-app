import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";

import { CartService } from 'src/app/services/cartService/cart.service';
import { ProductsService } from 'src/app/services/productsService/products.service';

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

  constructor(private cs: CartService, private ps: ProductsService, private router: Router) {
    this.showProducts.subscribe(async (value: any) => {
      if(value) this.updateCart();  
    })
   }

  ngOnInit() { }

  updateCart(){
    var tempProductsData: any[] = [];
    this.ps.getProductsData(JSON.parse(this.cs.getProducts())).then((value: any) => {
      tempProductsData = value;
    })
    setTimeout(() => {this.productsInCart = this.ps.sortProductsByName(tempProductsData, "asc"); this.cartPrice = this.cs.calculatePrice(tempProductsData)}, 120);
  }

  resetCart(){
    localStorage.setItem('cart', '[]')
    this.showProducts.next(false);
    this.updateCart()
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
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([path]));
  }

  createPath(path: string, param: any): string{
    return path+param
  }
}
