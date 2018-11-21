import { Component, OnInit } from '@angular/core';
import { TenantsService } from '../../Services/tenant/tenants.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  tenants: Tenant[];
  newTenant: Tenant;
  constructor(private tenantService: TenantsService) { }

  ngOnInit() {
    this.newTenant = { _id: "", name: "", phoneNumber: "", address: "", financialDebt: "" };
    this.tenants = [];
    this.search("");
  }

  search(s) {
    this.tenantService.get(
      s,
      tenants => this.tenants = tenants);
  }

  add() {
    this.tenantService.post(
      this.newTenant,
      tenant => {
        alert("Tenant Added With ID " + tenant._id);
        this.tenants.push(tenant);
      });
  }

  update(tenant: Tenant) {
    this.tenantService.update(
      tenant,
      b => alert("Tenant Updated " + b));
  }

  delete(id: string) {
    const tenants = this.tenants;
    this.tenantService.delete(id,
      deleted => {
        if (deleted) {
          for (let i = 0; i < tenants.length; i++) {
            if (tenants[i]._id === id) {
              tenants.splice(i, 1);
              break;
            }
          }
        }
      });
  }
}