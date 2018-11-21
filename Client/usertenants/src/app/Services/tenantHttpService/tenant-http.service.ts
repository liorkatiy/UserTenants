import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../sessionStorage/session-storage.service';
import { map } from "rxjs/operators";

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
        params
      })
      .subscribe(res => {
        if (res.error) {
          alert(res.error);
          if (res.error === 'login')
            this.ssts.removeToken();
        } else {
          func(res.item);
        }
      });
  }

  post<T>(url: string, body: any, func: (item: T) => void) {
    return this.http
      .post<serverResponse<T>>(url, body,
        { headers: { 'authorization': this.ssts.getTokenAsString() } })
      .subscribe(res => {
        if (res.error) {
          alert(res.error);
          if (res.error === 'login')
            this.ssts.removeToken();
        } else {
          func(res.item);
        }
      });
  }

  put<T>(url: string, body: any, func: (item: T) => void) {
    return this.http
      .put<serverResponse<T>>(url, body,
        { headers: { 'authorization': this.ssts.getTokenAsString() } })
      .subscribe(res => {
        if (res.error) {
          alert(res.error);
          if (res.error === 'login')
            this.ssts.removeToken();
        } else {
          func(res.item);
        }
      });
  }

  delete<T>(url: string, params: any, func: (item: T) => void) {
    return this.http
      .delete<serverResponse<T>>(url,
        {
          headers: { 'authorization': this.ssts.getTokenAsString() },
          params
        })
      .subscribe(res => {
        if (res.error) {
          alert(res.error);
          if (res.error === 'login')
            this.ssts.removeToken();
        } else {
          func(res.item);
        }
      });
  }
}