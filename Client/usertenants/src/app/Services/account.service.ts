import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { baseUrl } from './config';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: Http) {

  }


  register(username: string, password: string) {
    return this.http.post(baseUrl + "/account/register", { username, password })
      .pipe(map(res => res.json()));
  }

  login(username: string, password: string) {
    return this.http.post(baseUrl + "/account/login", { username, password })
      .pipe(map(res => res.json()));
  }
}