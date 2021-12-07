import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  @Input() productData : any;
  constructor(private router: Router, private cs: CartService) { }

  ngOnInit(): void {
    console.log(this.productData);
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  createPath(path: string, param: any): string{
    return path+param
  }

  addProduct(product: any){
    this.cs.addProduct(product, 1)
  }
}
