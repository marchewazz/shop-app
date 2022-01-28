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

  productsInCart: any = [];
  cartPrice: number = 0;
  shopCurrency: string = shopCurrency;

  constructor(private cs: CartService, private ps: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.updateCart()
  }

  updateCart(){
    var tempProductsData: any[] = [];
    this.ps.getProductsData(JSON.parse(this.cs.getProducts())).then((value: any) => {
      tempProductsData = value;
    })
    setTimeout(() => {this.productsInCart = tempProductsData; this.cartPrice = this.cs.calculatePrice(this.productsInCart)}, 100);
  }

  deleteProduct(id: number){
    console.log(id);
    localStorage.setItem('cart', JSON.stringify(this.productsInCart.filter((product: any) => product.productID != id)));
    this.updateCart()
  }

  increaseProductQuantity(productID: number, quantity: number){
    this.cs.increaseProductQuantity(productID, quantity, this.productsInCart);
    this.productsInCart = this.cs.getProducts();

    if (this.productsInCart !== null) this.productsInCart = JSON.parse(this.productsInCart)
    this.updateCart();
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
