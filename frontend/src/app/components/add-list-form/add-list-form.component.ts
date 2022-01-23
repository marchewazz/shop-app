import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';

import { ListsService } from 'src/app/services/listsService/lists.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { AuthService } from 'src/app/services/authService/auth.service';

import { pageUrl } from 'src/app/utilities';

@Component({
  selector: 'app-add-list-form',
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.scss']
})
export class AddListFormComponent implements OnInit {

  showForm: boolean = false;
  info: string = "";
  listID: number = 0;

  nameControl: FormControl = new FormControl();

  constructor(private ls: ListsService, private cs: CartService, private as: AuthService, private clipboard: ClipboardService) { }

  ngOnInit(): void {
  }

  setInfo(info: string){
    this.info = info;
      setTimeout(() => {
        this.info = "";
      }, 5000);
  }

  copyListLink(){
    this.clipboard.copy(`${pageUrl}/list/${this.listID}`)
  }

  addList(){
    this.listID = 0;
    const listName: string = this.nameControl.value;
    
    if (!listName){
      this.setInfo("Pass name");
    } else {
      const listData = {
        listName: listName, 
        products: this.cs.getProducts(),
        userID: this.as.isUserLogged() ? JSON.parse(JSON.parse(this.as.getUserDetails()).userID) : null
      }
      this.ls.addList(listData).subscribe((res: any) => {
        console.log(res);
        if(res.message === "added") {
          this.setInfo("List created");
          this.listID = res.listID;
        }
      })
    }
  }

}
