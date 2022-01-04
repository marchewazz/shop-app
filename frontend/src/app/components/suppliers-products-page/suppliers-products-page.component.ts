import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-suppliers-products-page',
  templateUrl: './suppliers-products-page.component.html',
  styleUrls: ['./suppliers-products-page.component.scss']
})
export class SuppliersProductsPageComponent implements OnInit {

  products : Object | any;
  isLoaded : boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private ps: ProductsService) { }

  ngOnInit(): void {
    const supplierData = {
      supplierID: Number(this.route.snapshot.paramMap.get('id'))
    }

    this.ps.getProductsFromSupplier(supplierData).subscribe((res: any) => {
      if(res.products.length == 0) this.redirect("/")
      else {
        this.products = res.products;
        this.isLoaded = true;
      }
      
    })
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }
}
