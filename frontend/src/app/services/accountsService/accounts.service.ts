import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }
  registerUser(): Observable<Object>{
    return this.http.get("http://localhost:5000/accounts/register")
  }
}
