import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AuthService } from 'src/app/services/authService/auth.service';
import { OrdersService } from 'src/app/services/orderService/orders.service';
import { ListsService } from 'src/app/services/listsService/lists.service';

import { bankPageUrl, bankAuthPage } from 'src/app/utilities';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData : any | undefined;
  userOrders: any[] = [];
  userLists: any[] = [];
  bankPageUrl = bankPageUrl;
  bankAuthPage = bankAuthPage;
  constructor(private as: AuthService, private os: OrdersService, private ls: ListsService, @Inject(DOCUMENT)  private document: Document) { }

  ngOnInit(): void {
    this.userData = JSON.parse(this.as.getUserDetails());
    this.updateOrders();
    this.updateLists();
  }
  
  updateOrders(){
    this.os.getOrders({"userID": this.userData.userID}).subscribe((res: any) => {
      this.userOrders = res.orders;
    })
  }

  updateLists(){
    this.ls.getAllUsersLists({"userID": this.userData.userID}).subscribe((res: any) => {
      this.userLists = res.lists;
    })
  }

  createListDate(date: any){
    return new Date(date).toLocaleString();
  }

  deleteList(listID: number){
    this.ls.deleteOneList({listID: listID}).subscribe((res: any) => {
      this.updateLists()
    })
    
  }

  redirect(path: string): void{
    this.document.location.href = path;
  }
  
  createPath(path: string, param: any): string{
    return path+param
  }
}
