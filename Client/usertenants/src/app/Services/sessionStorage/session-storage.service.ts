import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  removeToken() {
    sessionStorage.removeItem("token");
  }

  setToken(token) {
    sessionStorage.setItem("token", token);
  }

  getTokenAsString() {
    const token = sessionStorage.getItem("token");
    return token;
  }

  getTokenCookie() {
    let found = false;
    document.cookie
      .split(";")
      .forEach(c => {
        const cookie = c.split("=", 2);
        if (cookie[0].trim() === "userToken" && cookie[1]) {
          found = true;
          this.setToken(cookie[1]);
          document.cookie = cookie[0] + "=;expires=Wed; 01 Jan 1970";
        }
      });
    return found;
  }

}
