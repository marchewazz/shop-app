import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';

import { ListsService } from 'src/app/services/listsService/lists.service';


@Component({
  selector: 'app-lists-preview',
  templateUrl: './lists-preview.component.html',
  styleUrls: ['./lists-preview.component.scss']
})
export class ListsPreviewComponent implements OnInit {

  @Input() listData: any;

  constructor(@Inject(DOCUMENT) private document: Document, private ls: ListsService) { }

  ngOnInit(): void {
    console.log(this.listData.listID);
  }

  createListDate(date: any){
    return new Date(date).toLocaleString();
  }

  deleteList(listID: number){
    this.ls.deleteOneList({listID: listID}).subscribe((res: any) => {
      if(res.message === "deleted") window.location.reload();
    })
  }

  redirect(path: string): void{
    this.document.location.href = path;
  }
  
  createPath(path: string, param: any): string{
    return path+param
  }

}
