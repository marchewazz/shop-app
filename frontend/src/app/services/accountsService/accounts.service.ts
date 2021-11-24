import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }
  registerUser(userData: any): Observable<Object>{
    return this.http.post("http://localhost:5000/accounts/register", userData);
  }
}
