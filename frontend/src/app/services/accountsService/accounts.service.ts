import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backendUrl } from '../../utilities';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }
  
  registerUser(userData: any): Observable<Object>{
    return this.http.post(`${backendUrl}/accounts/register`, {params: userData});
  }

  loginUser(userData: any): Observable<Object>{
    return this.http.get(`${backendUrl}/accounts/login`, {params: userData});
  }
}
