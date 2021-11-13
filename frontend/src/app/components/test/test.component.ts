import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private ts: TestService) { }

  ngOnInit(): void {
    this.ts.test().subscribe((res) => {
      console.log(res);
    })
  }

}
