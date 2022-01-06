import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails() : any | null{
    return localStorage.getItem('userData');
  }

  setUserDetails(userData: any) : void {
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  isUserLogged(): boolean {
    return this.getUserDetails() != null ? true : false;
  }

  updateUserData(): Observable<Object>{
    return this.http.post(`${backendUrl}/accounts/refresh`, {params: {userID: JSON.parse(this.getUserDetails()).userID}}) 
  }

  setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }

  clearStorage() {
    localStorage.clear();
  }
}
