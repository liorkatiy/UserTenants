import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account/account.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  register() {
    this.accountService.register(this.username, this.password)
      .subscribe(res => alert(res.body.item ? "Regitered" : "registration failed"));
  }

}
