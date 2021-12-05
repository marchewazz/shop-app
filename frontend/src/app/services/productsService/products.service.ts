import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backendUrl } from '../../utilities';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<Object>{
    return this.http.get(`${backendUrl}/products/getall`)
  }

  getSpecificProducts(id: any) : Observable<Object>{
    return this.http.get(`${backendUrl}/products/getproduct`, {params: id});
  }

}
