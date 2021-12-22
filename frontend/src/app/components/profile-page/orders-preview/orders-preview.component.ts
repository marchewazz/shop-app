import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent implements OnInit {
  
  @Input() orderData : any;
  orderDate: string = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.orderData);
    this.orderDate = new Date(this.orderData.orderDate).toLocaleString();
  }

}
