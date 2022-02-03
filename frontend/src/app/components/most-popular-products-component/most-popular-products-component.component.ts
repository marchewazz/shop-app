import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-most-popular-products-component',
  templateUrl: './most-popular-products-component.component.html',
  styleUrls: ['./most-popular-products-component.component.scss']
})
export class MostPopularProductsComponentComponent implements OnInit {

  products: any[] = [];
  isLoaded: boolean = false;

  constructor(private ps: ProductsService) { }

  ngOnInit(): void {
    this.updateProducts()
  }

  updateProducts(){
    this.ps.getAllProducts().subscribe((res: any) => {
      this.products = this.ps.sortByPopularity(res.products).slice(0,4)
      this.isLoaded = true;
    })
  }

}
