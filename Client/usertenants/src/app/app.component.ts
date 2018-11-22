import { Component } from '@angular/core';
import { LoginEventService } from './Services/loginEvent/login-event.service';
import { AccountService } from './Services/account/account.service';
import { SessionStorageService } from './Services/sessionStorage/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin: boolean;

  constructor(
    private ls: LoginEventService,
    private accountService: AccountService,
    private ssts: SessionStorageService) {
    this.isLogin = false;
  }

  ngOnInit() {
    this.ls.getEmittedValue()
      .subscribe(item => this.isLogin = item);
  }

  logout() {
    this.accountService.logout().subscribe(res => {
      this.isLogin = false;
      this.ssts.removeToken();
    });
  }
}
