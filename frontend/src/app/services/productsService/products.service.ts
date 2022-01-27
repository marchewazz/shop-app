import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { backendUrl } from '../../utilities';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<Object>{
    return this.http.get(`${backendUrl}/products/getall`)
  }

  getSpecificProduct(id: any) : Observable<Object>{
    return this.http.get(`${backendUrl}/products/getproduct`, {params: id});
  }

  getProductsFromSupplier(supplierData: any) : Observable<Object>{
    return this.http.post(`${backendUrl}/products/getbysupplier`, {params: supplierData})
  }

  async getDataFromDB(product: any): Promise<Observable<any>>{
    var productData = new Subject<any[]>();
    this.getSpecificProduct({productID: product.productID}).subscribe((res: any) => {      
      var fetchedProductData = res.product[0];
      fetchedProductData["quantity"] = product.quantity;
      productData.next(fetchedProductData);
      productData.complete();
    })
    return productData.asObservable();
  }

  async getProductsData(products: any[]): Promise<any[]>{
  
    var productsData: any[] = [];
    for (const product of products){
      (await this.getDataFromDB(product)).subscribe((value: any) => {
        productsData.push(value)
      })
    }
    return productsData;
  }

}
