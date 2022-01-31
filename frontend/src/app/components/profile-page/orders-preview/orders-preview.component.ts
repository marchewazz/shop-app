import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersService } from 'src/app/services/orderService/orders.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { bankPageUrl, mainShopBill } from 'src/app/utilities';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent implements OnInit {
  
  @Input() userID : any;
  userOrders: any[] = [];

  constructor(private router: Router, private os: OrdersService, private as: AuthService) { }

  ngOnInit(): void {
    this.updateOrders()
  }

  updateOrders(){
    this.os.getOrders({"userID": this.userID}).subscribe((res: any) => {
      this.userOrders = res.orders;
    })
  }

  cancelOrder(orderID: number){
    this.os.cancelOrder({orderID: orderID}).subscribe((res: any) => {
      console.log(res);
      if(res.message === "Deleted!") this.updateOrders()
    })
  }

  createOrderDate(date: any){
    return new Date(date).toLocaleString();
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  createPath(path: string, param: any): string{
    return path+param
  }

  redirectToTransaction(orderID: number, orderPrice: number){

    var userData = JSON.parse(this.as.getUserDetails());
    var accountNumber = userData.userBankAccNumber != null ? userData.userBankAccNumber : "";
    
    window.location.href = `${bankPageUrl}/transaction?sender=${accountNumber}&receiver=${mainShopBill}&note=${orderID}&amount=${orderPrice}`
  }

}
