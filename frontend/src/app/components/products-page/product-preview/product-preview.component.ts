import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/services/cartService/cart.service';
import { CommentsService } from 'src/app/services/commentsService/comments.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  @Input() productData : any;
  average: number | undefined;
  constructor(private router: Router, private cs: CartService, private comS: CommentsService) { }

  ngOnInit(): void {
    console.log(this.productData);
    this.comS.getAverage({productID: this.productData.productID}).subscribe((res: any) =>{
      console.log(res);
      //EITHER I'M STUPID OR TYPESCRIPT BUT IT'S WEIRDEST LINE IN MY LIFE
      this.average = Number(Number(res.average[0].avg).toFixed(2));
    })
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
