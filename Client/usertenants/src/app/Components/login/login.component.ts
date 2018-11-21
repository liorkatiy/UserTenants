import { Component, OnInit } from '@angular/core';
import { LoginEventService } from '../../Services/loginEvent/login-event.service';
import { AccountService } from '../../Services/account/account.service';
import { SessionStorageService } from '../../Services/sessionStorage/session-storage.service';

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
    private accountService: AccountService,
    private ssts: SessionStorageService) {
  }

  ngOnInit() {
  }

  login() {
    this.accountService.login(this.username, this.password)
      .subscribe(response => {
        if (response.body.item) {
          this.loginService.logged(true);
          this.ssts.getTokenCookie();
          alert("Login success");
        } else {
          alert("login failed");
        }
      });
  }
}