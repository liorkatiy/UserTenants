import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LoginEventService } from '../../Services/login-event.service';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private loginService: LoginEventService,
    private accountService: AccountService) {
  }

  ngOnInit() {
  }

  login() {
    this.accountService.login(this.username, this.password)
      .subscribe(response => {
        if (response) {
          this.loginService.logged();
          alert("Login success");
        }
        alert("login failed");
      });
  }
}