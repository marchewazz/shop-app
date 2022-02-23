import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  products : any[] = [];
  fetchedProducts: any[] = [];
  isLoaded : boolean = false;
  showFilters: boolean = false;
  searchPhrase: string = "";

  sortControl: FormControl = new FormControl();
  availabilityControl: FormControl = new FormControl();

  constructor(private route: ActivatedRoute, private ps: ProductsService) { }


  filterProducts(): void{

    const sortParam: string = this.sortControl.value;

    if(sortParam === "priceLowToHigh") this.products = this.ps.sortProductsByPrice(this.fetchedProducts, "asc")
    if(sortParam === "priceHighToLow") this.products = this.ps.sortProductsByPrice(this.fetchedProducts, "desc")
    if(sortParam === "nameAToZ") this.products = this.ps.sortProductsByName(this.fetchedProducts, "asc")
    if(sortParam === "nameZToA") this.products = this.ps.sortProductsByName(this.fetchedProducts, "desc")
    if(sortParam === "mostPopular") this.products = this.ps.sortByPopularity(this.fetchedProducts)
    
    if(this.availabilityControl.value) this.products = this.ps.getOnlyAvailableProducts(this.fetchedProducts)
    else this.products = this.fetchedProducts 
  }

  ngOnInit(): void {
    this.sortControl.setValue("nameAToZ");
    this.availabilityControl.setValue(false);

    this.ps.getAllProducts().subscribe((res: any) => {
      const searchPhrase = this.route.snapshot.paramMap.get('searchphrase')
      if(searchPhrase) {
        this.searchPhrase = searchPhrase;
        this.fetchedProducts = this.ps.getProductsWithSearchedPhrase(res.products, searchPhrase);
      } else {
        this.fetchedProducts = res.products;
      }
      this.filterProducts();
      this.isLoaded = true;
    });
  }
}
