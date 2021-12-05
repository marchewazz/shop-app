import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails() : any | null{
    return localStorage.getItem('userData');
  }

  setUserDetails(userData: any) : void {
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  isUserLogged(): boolean {
    return this.getUserDetails() != null ? true : false;
  }

  setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }

  clearStorage() {
    localStorage.clear();
  }
}
