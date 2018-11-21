import { Component } from '@angular/core';
import { LoginEventService } from './Services/loginEvent/login-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin: boolean;

  constructor(private ls: LoginEventService) {
    this.isLogin = false;
  }

  ngOnInit() {
    this.ls.getEmittedValue()
      .subscribe(item => this.isLogin = item);
  }
}
