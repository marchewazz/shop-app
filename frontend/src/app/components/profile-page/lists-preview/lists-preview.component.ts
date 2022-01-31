import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';

import { ListsService } from 'src/app/services/listsService/lists.service';


@Component({
  selector: 'app-lists-preview',
  templateUrl: './lists-preview.component.html',
  styleUrls: ['./lists-preview.component.scss']
})
export class ListsPreviewComponent implements OnInit {

  @Input() userID: any;
  userLists: any[] = [];

  constructor(@Inject(DOCUMENT) private document: Document, private ls: ListsService) { }

  ngOnInit(): void { 
    this.updateLists()
  }
  
  updateLists(){
    this.ls.getAllUsersLists({userID: this.userID}).subscribe((res: any) => {
      this.userLists = res.lists;
    })
  }

  createListDate(date: any){
    return new Date(date).toLocaleString();
  }

  deleteList(listID: number){
    this.ls.deleteOneList({listID: listID}).subscribe((res: any) => {
      if(res.message === "deleted") this.updateLists()
    })
  }

  redirect(path: string): void{
    this.document.location.href = path;
  }
  
  createPath(path: string, param: any): string{
    return path+param
  }

}
