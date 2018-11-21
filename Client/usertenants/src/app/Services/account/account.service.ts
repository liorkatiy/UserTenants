import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { pipe } from '@angular/core/src/render3';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {

  }


  register(username: string, password: string) {
    return this.http
      .post<serverResponse<boolean>>(config.baseUrl + "/account/register", { username, password }, { observe: 'response', withCredentials: true });
  }

  login(username: string, password: string) {
    return this.http
      .post<serverResponse<boolean>>(config.baseUrl + "/account/login", { username, password }, { observe: 'response', withCredentials: true })
  }

  logout() {
    return this.http
      .post<serverResponse<boolean>>(config.baseUrl + "/account/logout", {}, { observe: 'response', withCredentials: true })
  }
}