import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  products : Object | any;
  isLoaded : boolean = false;

  constructor(private ps: ProductsService) { }

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe(res => {
      this.products = res
      //IT'S WEIRD BUT SERVER RETURNS OBJECT PRODUCTS WITH PARAMETER PRODUCTS
      //THIS IS ARRAY OF PRODUCTS
      //THAT'S WHY LINE UNDERNEATH MAKES SENSE
      this.products = this.products.products
      this.isLoaded = true;
    });
  }

}
