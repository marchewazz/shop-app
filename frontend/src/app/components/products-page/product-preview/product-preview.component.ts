import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  @Input() productData : any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.productData);
  }

}
