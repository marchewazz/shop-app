import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private athS: AuthService) { }

  ngOnInit(): void {
    if (this.athS.isUserLogged()){
      this.router.navigate(['/'])
    }
  }

}
