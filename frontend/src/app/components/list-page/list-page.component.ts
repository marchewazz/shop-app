import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListsService } from 'src/app/services/listsService/lists.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  isLoaded: boolean = false;
  list: any;
  userFirstName: string = '';
  constructor(private route: ActivatedRoute, private ls: ListsService) { }

  ngOnInit(): void {
    const listData = {
      listID: Number(this.route.snapshot.paramMap.get('id'))
    }
    console.log(listData);
    this.ls.getOneList(listData).subscribe((res: any) => {
      console.log(res);
      this.list = res.list;
      this.userFirstName = res.userFirstName;
      this.isLoaded = true;
    })
  }

}
