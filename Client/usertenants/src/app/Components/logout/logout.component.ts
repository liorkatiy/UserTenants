import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account/account.service'
import { SessionStorageService } from '../../Services/sessionStorage/session-storage.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private ssts: SessionStorageService) { }

  ngOnInit() {
    this.accountService.logout()
      .subscribe(res => this.ssts.removeToken());
  }

}
