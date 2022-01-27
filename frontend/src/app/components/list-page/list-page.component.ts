import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ListsService } from 'src/app/services/listsService/lists.service';
import { ProductsService } from 'src/app/services/productsService/products.service';
import { CartService } from 'src/app/services/cartService/cart.service';

import { shopCurrency } from 'src/app/utilities';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  isLoaded: boolean = false;
  list: any;
  productsOnList: any;
  listPrice: number = 0;
  userFirstName: string = "";
  createDate: string = "";
  shopCurrency: string = shopCurrency;
  constructor(private router: Router, private route: ActivatedRoute, private ls: ListsService, private ps: ProductsService, private cs: CartService) { }

  ngOnInit(): void {
    const listData = {
      listID: Number(this.route.snapshot.paramMap.get('id'))
    }
    console.log(listData);
    this.ls.getOneList(listData).subscribe((res: any) => {
      console.log(res);
      this.list = res.list;
      this.userFirstName = res.userFirstName;
      this.createDate = new Date(res.list.listCreateDate).toLocaleString();
      this.isLoaded = true;
      this.ps.getProductsData(res.list.listProducts).then((value: any) => {
        this.productsOnList = value;
      })
      setTimeout(() => this.listPrice = this.cs.calculatePrice(this.productsOnList), 100);
    })
  }

  createPath(path: string, param: any): string{
    return path+param
  }
  
  redirect(path: string): void{
    this.router.navigate([path]);
  }
}
