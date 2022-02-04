import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';
import { AuthService } from 'src/app/services/authService/auth.service';
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
  constructor(private as: AccountsService, private aths: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    const userData = {
      accountEmail: this.loginAccountEmail.value,
      accountPassword: this.loginAccountPassword.value
    }
    if (!userData.accountEmail || !userData.accountPassword) {
      this.loginInfo = "Pass all data";
    } else {
      if (!testEmailRegExp(userData.accountEmail) || !testPasswordRegExp(userData.accountPassword)){
        this.loginInfo = "Check your data";
        this.loginAccountPassword.setValue("");
      } else {
        this.as.loginUser(userData).subscribe((res: any) => {
          this.loginInfo = res.message;
          console.log(res);
          if(this.loginInfo == "Logged!"){
            this.aths.setUserDetails(res.userData);
            this.redirect('/')
          }
        })
      }
    }
    console.log(userData);
  }

  redirect(path: string){
    this.router.navigate([path]);
  }
}
