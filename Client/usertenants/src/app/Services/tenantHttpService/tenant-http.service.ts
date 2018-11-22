import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../sessionStorage/session-storage.service';
import { map } from "rxjs/operators";

//general http service to hadle server response and errors
@Injectable({
  providedIn: 'root'
})
export class TenantHttpService {

  constructor(
    private http: HttpClient,
    private ssts: SessionStorageService) {
  }

  get<T>(url: string, func: (item: T) => void, params?: any) {
    return this.http
      .get<serverResponse<T>>(url, {
        headers: { 'authorization': this.ssts.getTokenAsString() },
        withCredentials: true,
        params
      })
      .subscribe(this.handleServerResponse(func));
  }

  post<T>(url: string, body: any, func: (item: T) => void) {
    return this.http
      .post<serverResponse<T>>(url, body,
        {
          headers: { 'authorization': this.ssts.getTokenAsString() },
          withCredentials: true
        })
      .subscribe(this.handleServerResponse(func));
  }

  put<T>(url: string, body: any, func: (item: T) => void) {
    return this.http
      .put<serverResponse<T>>(url, body,
        {
          headers: { 'authorization': this.ssts.getTokenAsString() },
          withCredentials: true
        })
      .subscribe(this.handleServerResponse(func));
  }

  delete<T>(url: string, params: any, func: (item: T) => void) {
    return this.http
      .delete<serverResponse<T>>(url,
        {
          headers: { 'authorization': this.ssts.getTokenAsString() },
          withCredentials: true,
          params
        })
      .subscribe(this.handleServerResponse(func));
  }

  handleServerResponse<T>(func: (item: T) => void) {
    return res => {
      if (res.error) {//server return error
        alert("ERROR: " + res.error);
        if (res.error === 'login')//if login failure (no token or token timeout) remove token
          this.ssts.removeToken();
      } else {
        this.ssts.getTokenCookie(); // login success save the token
        func(res.item); //call the function with the server response
      }
    }
  }
}