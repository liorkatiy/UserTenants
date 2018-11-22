import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../sessionStorage/session-storage.service';


//service to handle user login/register
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private ssts: SessionStorageService) {
  }

  register(username: string, password: string) {
    return this.http
      .post<serverResponse<boolean>>(config.baseUrl + "/account/register",
        { username, password },
        { observe: 'response', withCredentials: true });
  }

  login(username: string, password: string) {
    return this.http
      .post<serverResponse<boolean>>(config.baseUrl + "/account/login",
        { username, password },
        { observe: 'response', withCredentials: true })
  }

  logout() {
    return this.http
      .post<serverResponse<boolean>>(config.baseUrl + "/account/logout",
        {},
        {
          headers: { 'authorization': this.ssts.getTokenAsString() }
        })
  }
}