import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  products : any[] = [];
  isLoaded : boolean = false;
  searchPhrase: string = "";
  
  constructor(private route: ActivatedRoute, private ps: ProductsService) { }

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe((res: any) => {
      const searchPhrase = this.route.snapshot.paramMap.get('searchphrase')
      if(searchPhrase) {
        this.searchPhrase = searchPhrase;
        this.products = this.ps.getProductsWithSearchedPhrase(res.products, searchPhrase);
      } else {
        this.products = res.products;
      }
      this.isLoaded = true;
    });
  }
}
