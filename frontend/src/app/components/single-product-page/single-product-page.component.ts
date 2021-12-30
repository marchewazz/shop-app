import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from 'src/app/services/productsService/products.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { CommentsService } from 'src/app/services/commentsService/comments.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit {

  isLoaded: boolean = false;
  isUserLogged: boolean = false;
  productData : Object | any;
  average: number | undefined;
  comments: any = [];

  quantityControl = new FormControl();

  constructor(private route: ActivatedRoute, private ps: ProductsService, private comS: CommentsService, private as: AuthService, private cs: CartService, private router: Router) { }

  ngOnInit(): void{
    const productData = {
      productID: Number(this.route.snapshot.paramMap.get('id'))
    }
    this.ps.getSpecificProducts(productData).subscribe(res => {
      //SAME SITUATION AS PRODUCTS PAGE
      //SOME COMPLICATED OPERATIONS NECESSARY
      this.productData = res;
      this.productData = this.productData.product[0];
      console.log(this.productData);
      this.isLoaded = true;
    });
    this.quantityControl.setValue(1);

    this.isUserLogged = this.as.isUserLogged();

    this.comS.getComments(productData).subscribe((res: any) => {
      this.comments = res.comments;
      console.log(this.comments);
    })

    this.comS.getAverage(productData).subscribe((res: any) => {
      console.log(res);
      //EITHER I'M STUPID OR TYPESCRIPT BUT IT'S WEIRDEST LINE IN MY LIFE
      this.average = Number(Number(res.average[0].avg).toFixed(2));
    })
  }

  addProduct(product: any, quantity: number){
    this.cs.addProduct(product, quantity)
  }

  createDate(date: any){
    return new Date(date).toLocaleString()
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }
}
