import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';
import { testEmailRegExp, isDataComplete, testPasswordRegExp, arePasswordsSame} from 'src/app/utilities';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  //form controls
  registeringAccountFirstName = new FormControl();
  registeringAccountLastName = new FormControl();
  registeringAccountEmail = new FormControl();
  registeringAccountCity = new FormControl();
  registeringAccountPassword = new FormControl();
  repeatedPassword = new FormControl();
  registerInfo : string = "";

  constructor(private as: AccountsService, private router: Router) { }

  ngOnInit(): void { }  

  registerUser(){
    const userData = {
      accountEmail: this.registeringAccountEmail.value,
      accountFirstName: this.registeringAccountFirstName.value,
      accountLastName: this.registeringAccountLastName.value,
      accountPassword: this.registeringAccountPassword.value,
      accountCity: this.registeringAccountCity.value,
    }
    if(!isDataComplete(userData)){
      this.registerInfo = "Pass all data!";
    } else {
      if(!testEmailRegExp(userData.accountEmail)){
        this.registerInfo = "Not valid email, eg. xyz@gmail.com";
        return
      } else if(!testPasswordRegExp(userData.accountPassword)){ 
        this.registerInfo = "Password doesn't match requirments";
        return
      } else if(!arePasswordsSame(userData.accountPassword, this.repeatedPassword.value)){ 
        this.registerInfo = "Passwords aren't the same";
        return
      } else {
        console.log(this.registeringAccountFirstName.value);
        console.log(this.registeringAccountLastName.value);
        console.log(this.registeringAccountEmail.value);

        this.as.registerUser(userData).subscribe((res: any) => {
          this.registerInfo = res.message;
          console.log(res, this.registerInfo);
        })
      }
    }
  }
  redirect(path: string){
    this.router.navigate([path]);
  }
}
