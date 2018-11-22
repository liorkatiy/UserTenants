import { Injectable } from '@angular/core';
import { config } from '../config'
import { TenantHttpService } from '../tenantHttpService/tenant-http.service';


//service for tenants CRUD
@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  url = config.baseUrl + '/tenant';
  constructor(private http: TenantHttpService) { }

  get(search: string, func: (item: Tenant[]) => void) {
    return this.http
      .get<Tenant[]>(this.url, func, { search });
  }

  post(tenant: Tenant, func: (item: Tenant) => void) {
    return this.http
      .post<Tenant>(this.url, tenant, func);
  }

  update(tenant: Tenant, func: (item: boolean) => void) {
    return this.http
      .put<boolean>(this.url + "/", tenant, func);
  }

  delete(id: string, func: (item: boolean) => void) {
    return this.http
      .delete<boolean>(this.url, { id }, func);
  }
}
