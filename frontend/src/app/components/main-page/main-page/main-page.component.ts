import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  mainTitle: string = "Herzlich willkommen in unserem Geschäft!";

  constructor() { }

  ngOnInit(): void {
  }

  changeMainTitle(hover: boolean){
    //TITLE JUST FOR FUN
    if (hover) this.mainTitle = "Nah just kiddin', Welcome in our shop!";
    if (!hover) this.mainTitle = "Herzlich willkommen in unserem Geschäft!";
  }

}
