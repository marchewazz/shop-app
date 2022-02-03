import { Component, OnInit } from '@angular/core';

import { returnRandomProductsMenu } from 'src/app/utilities';

@Component({
  selector: 'app-randomize-products-menu-component',
  templateUrl: './randomize-products-menu-component.component.html',
  styleUrls: ['./randomize-products-menu-component.component.scss']
})
export class RandomizeProductsMenuComponentComponent implements OnInit {

  productsMenu: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.productsMenu = returnRandomProductsMenu();
  }

}
