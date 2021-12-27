import { Component, Input, OnInit } from '@angular/core';

import { OrdersService } from 'src/app/services/orderService/orders.service';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent implements OnInit {
  
  @Input() orderData : any;
  orderDate: string = "";
  constructor(private os: OrdersService) { }

  ngOnInit(): void {
    console.log(this.orderData);
    this.orderDate = new Date(this.orderData.orderDate).toLocaleString();
  }

  cancelOrder(orderID: number){
    this.os.cancelOrder({orderID: orderID}).subscribe((res: any) => {
      console.log(res);
      if(res.message === "Deleted!") window.location.reload();
    })
  }

}
