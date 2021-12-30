import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backendUrl } from '../../utilities';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  addComment(commentData: any){
    return this.http.post(`${backendUrl}/comments/add`, {params: commentData})
  }

  getComments(productID: any){
    return this.http.post(`${backendUrl}/comments/get`, {params: productID})
  }

  getAverage(productID: any){
    return this.http.post(`${backendUrl}/comments/average`, {params: productID})
  }
}
