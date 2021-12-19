import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-confirmed-bank-auth-page',
  templateUrl: './confirmed-bank-auth-page.component.html',
  styleUrls: ['./confirmed-bank-auth-page.component.scss']
})
export class ConfirmedBankAuthPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private as: AccountsService, private authS: AuthService) { }

  ngOnInit(): void {
    const userEmail = JSON.parse(this.authS.getUserDetails()).userEmail;
    console.log(userEmail);
    this.route.queryParams.subscribe(params => {
      const userData = {
        userEmail: userEmail,
        accountNumber: params.accountnumber
      }
      this.as.updateBankAccount(userData).subscribe(res => {
        console.log(res);
      })
    })
  }
}
