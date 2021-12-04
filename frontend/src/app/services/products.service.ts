import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<Object>{
    return this.http.get("http://localhost:5000/products/getall")
  }

  getSpecificProducts(id: any) : Observable<Object>{
    console.log(id);
    return this.http.get("http://localhost:5000/products/getproduct", {params: id})
  }

}
