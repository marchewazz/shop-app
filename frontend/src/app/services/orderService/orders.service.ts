import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/utilities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  addOrder(orderData: any): Observable<Object>{
    return this.http.post(`${backendUrl}/orders/add`, {params: orderData})
  }

  getOrders(userData: any): Observable<Object>{
    return this.http.post(`${backendUrl}/orders/getall`, {params: userData})
  }

  cancelOrder(orderData: any): Observable<Object>{
    return this.http.post(`${backendUrl}/orders/cancel`, {params: orderData})
  }
}
