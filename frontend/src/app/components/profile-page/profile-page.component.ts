import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AuthService } from 'src/app/services/authService/auth.service';
import { OrdersService } from 'src/app/services/orderService/orders.service';
import { ListsService } from 'src/app/services/listsService/lists.service';
import { AccountsService } from 'src/app/services/accountsService/accounts.service';

import { bankPageUrl, bankAuthPage, testEmailRegExp, isDataComplete, testPasswordRegExp, arePasswordsSame } from 'src/app/utilities';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData : any | undefined;
  bankPageUrl = bankPageUrl;
  bankAuthPage = bankAuthPage;
  showEditForm: boolean = false;
  showChangePasswordForm: boolean = false;
  showPasswordConfirmation: boolean = false;

  accountFirstName = new FormControl();
  accountLastName = new FormControl();
  accountEmail = new FormControl();
  accountCity = new FormControl();
  accountPassword = new FormControl();

  currentAccountPassword = new FormControl();
  newAccountPassword = new FormControl();
  repeatedNewAccountPassword = new FormControl();

  updateInfo : string = "";

  constructor(private accS: AccountsService, private as: AuthService, private os: OrdersService, private ls: ListsService, @Inject(DOCUMENT)  private document: Document) { }

  ngOnInit(): void {
    this.userData = JSON.parse(this.as.getUserDetails());
  }
  
  setFormValues(): void {
    this.updateInfo = "";
    this.showPasswordConfirmation = false;
    this.accountFirstName.setValue(this.userData.userFirstName);
    this.accountLastName.setValue(this.userData.userLastName);
    this.accountEmail.setValue(this.userData.userEmail);
    this.accountCity.setValue(this.userData.userCity);
  }

  validateData(): void {
    this.showPasswordConfirmation = false
    if(!this.hasAnythingChanged()){
      this.updateInfo = "Nothing has changed"
    } else {
      this.updateInfo = "";
      const userData = {
        accountEmail: this.accountEmail.value,
        accountFirstName: this.accountFirstName.value,
        accountLastName: this.accountLastName.value,
        accountCity: this.accountCity.value,
      }
      if(!isDataComplete(userData)){
        this.updateInfo = "Pass all data!";
      } else {
        if(!testEmailRegExp(userData.accountEmail)){
          this.updateInfo = "Not valid email, eg. xyz@gmail.com";
          return
        } else {
          this.showPasswordConfirmation = true;
        }
      }
    }
  }

  hasAnythingChanged(): boolean {
    if (this.userData.userFirstName != this.accountFirstName.value) return true
    if (this.userData.userLastName != this.accountLastName.value) return true
    if (this.userData.userCity != this.accountCity.value) return true
    if (this.userData.userEmail != this.accountEmail.value) return true
    return false
  }

  updateData(): void{
    if (this.accountPassword.value) {
      var userData = {
        accountEmail: this.accountEmail.value,
        accountPassword: this.accountPassword.value
      }
      this.accS.loginUser(userData).subscribe((res: any) => {
        if(res.message != "Logged!") {
          this.updateInfo = "Wrong password!"
        } else {
          var userData = {
            accountID: this.userData.userID,
            accountEmail: this.accountEmail.value,
            accountFirstName: this.accountFirstName.value,
            accountLastName: this.accountLastName.value,
            accountCity: this.accountCity.value
          }
          this.accS.updateUserData(userData).subscribe((res: any) => {
            if(res.message === "done") {
              this.updateInfo = "Updated!"
            } else {
              this.updateInfo = "Error!"
            }
          })
        }
      })
    } else {
      this.updateInfo = "Pass data"
    }
  }

  changePassword(): void {
    if(this.currentAccountPassword.value && this.newAccountPassword.value && this.repeatedNewAccountPassword.value) {
      var userData = {
        accountEmail: JSON.parse(this.as.getUserDetails()).userEmail,
        accountPassword: this.currentAccountPassword.value
      } 
      if(!testPasswordRegExp(this.newAccountPassword.value)) {
        this.updateInfo = "New password doesn't match requirements"
        return
      }
      if(!arePasswordsSame(this.newAccountPassword.value, this.repeatedNewAccountPassword.value)) {
        this.updateInfo = "Password are not the same"
        return
      }
      this.accS.loginUser(userData).subscribe((res: any) => {
        if(res.message != "Logged!") {
          this.updateInfo = "Wrong password!"
        } else {
          var userData = {
            accountEmail: JSON.parse(this.as.getUserDetails()).userEmail,
            accountPassword: this.newAccountPassword.value
          }
          this.accS.updatePassword(userData).subscribe((res: any) => {
            if(res.message === "done") {
              this.updateInfo = "Password has been changed!"
            } else {
              this.updateInfo = "Server error!"
            }
          })
        }
      })
    } else {
      this.updateInfo = "Missing data!";
    }
  }

  redirect(path: string): void{
    this.document.location.href = path;
  }
  
  createPath(path: string, param: any): string{
    return path+param
  }
}
