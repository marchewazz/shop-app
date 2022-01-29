import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-products-proposition-component',
  templateUrl: './products-proposition-component.component.html',
  styleUrls: ['./products-proposition-component.component.scss']
})
export class ProductsPropositionComponentComponent implements OnInit {

  productsAvaliable: any[] = [];
  isLoaded: boolean = false;
  constructor(private ps: ProductsService) { }

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe((res: any) => {
      console.log(res);
      this.productsAvaliable = this.ps.sortProductsByPrice(this.ps.getOnlyAvailableProducts(res.products).sort(() => Math.random() - 0.5).slice(0,3), "desc");
      this.isLoaded = true;
    });
  }

}
