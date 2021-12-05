import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private router: Router, private athS: AuthService) { }

  ngOnInit(): void {
    if (this.athS.isUserLogged()){
      this.router.navigate(['/'])
    }
  }

}
