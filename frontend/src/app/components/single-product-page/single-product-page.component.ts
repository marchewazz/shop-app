import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit {

  isLoaded: boolean = false;
  productData : Object | any;
  constructor(private route: ActivatedRoute, private ps: ProductsService, private router: Router) { }

  ngOnInit(): void{
    const productData = {
      productID: Number(this.route.snapshot.paramMap.get('id')),
    }
    this.ps.getSpecificProducts(productData).subscribe(res => {
      //SAME SITUATION AS PRODUCTS PAGE
      //SOME COMPLICATED OPERATIONS NECESSARY
      this.productData = res;
      this.productData = this.productData.product[0];
      console.log(this.productData);
      this.isLoaded = true;
    });
  }
  redirect(path: string): void{
    this.router.navigate([path]);
  }
}
