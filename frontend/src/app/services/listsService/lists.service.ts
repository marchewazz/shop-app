import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/utilities';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) { }

  addList(listData: any) {
    return this.http.post(`${backendUrl}/lists/add`, {params: listData})
  }

  getOneList(listData: any) {
    return this.http.post(`${backendUrl}/lists/getone`, {params: listData})
  }
}
