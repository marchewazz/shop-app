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

  getProductsWithSearchedPhrase(products: any[], phrase: string): any[]{
    var matchedProducts: any[] = []; 
    phrase = phrase.toLowerCase();
    for (const product of products){
      console.log(product);
      if(product.productName.toLowerCase().includes(phrase)) { matchedProducts.push(product); continue }
      if(product.productDescription.toLowerCase().includes(phrase)) { matchedProducts.push(product); continue }
      if(product.productParams){
        for(const key in product.productParams){
          if (product.productParams[key].toLowerCase().includes(phrase)) { matchedProducts.push(product); continue }
        }
      }
    }
    return matchedProducts
  }

  getOnlyAvailableProducts(products: any[]): any[]{
    return products.filter((product: any) => product.productQuantity !== 0)
  }

  sortProductsByPrice(products: any[], method: "asc" | "desc"): any{
    console.log(products);
    if (method == "desc") return products.sort((product1: any, product2: any) => product2.productPrice - product1.productPrice)
    if (method == "asc") return products.sort((product1: any, product2: any) => product2.productPrice + product1.productPrice)
  }

  sortByPopularity(products: any[]): any{
    return products.sort((product1: any, product2: any) => product2.productSold - product1.productSold)
  }
}
