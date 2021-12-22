import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AuthService } from 'src/app/services/authService/auth.service';
import { OrdersService } from 'src/app/services/orderService/orders.service';

import { bankPageUrl } from 'src/app/utilities';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData : any | undefined;
  userOrders: any[] = [];
  bankPageUrl = bankPageUrl;
  constructor(private as: AuthService, private os: OrdersService, @Inject(DOCUMENT)  private document: Document) { }

  ngOnInit(): void {
    this.userData = JSON.parse(this.as.getUserDetails());
    this.os.getOrders({"userID": this.userData.userID}).subscribe((res: any) => {
        this.userOrders = res.orders;
    })
    console.log(this.userData);
  }
  
  redirect(path: string): void{
    this.document.location.href = path;
  }

}
