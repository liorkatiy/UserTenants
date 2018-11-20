import { Component } from '@angular/core';
import { LoginComponent } from './Components/login/login.component';
import { LoginEventService } from './Services/login-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin: boolean;
  ls: LoginEventService

  constructor(ls: LoginEventService) {
    this.ls = ls;
    this.isLogin = false;
  }

  ngOnInit() {
    this.ls.getEmittedValue()
      .subscribe(item => this.isLogin = item);
  }
}
