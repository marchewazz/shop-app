import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';
import { testEmailRegExp, testPasswordRegExp } from 'src/app/utilities';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginAccountEmail = new FormControl();
  loginAccountPassword = new FormControl();
  loginInfo = '';
  constructor(private as: AccountsService) { }

  ngOnInit(): void {
  }

  loginUser(){
    const userData = {
      userEmail: this.loginAccountEmail.value,
      userPass: this.loginAccountPassword.value
    }
    if (!userData.userEmail || !userData.userPass) {
      this.loginInfo = "Pass all essential data";
    } else {
      if (!testEmailRegExp(userData.userEmail) || !testPasswordRegExp(userData.userPass)){
        this.loginInfo = "Check your data";
        this.loginAccountPassword.setValue("");
      } else {
        this.as.loginUser(userData).subscribe(res => {
          console.log(res);
        })
      }
    }
    console.log(userData);
  }
}
