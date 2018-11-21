import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tenantPipe' })
export class TenantPipe implements PipeTransform {
  transform(tenants: Tenant[], filter: string) {
    switch (filter) {
      case 'onlyDebt':
        return tenants.filter(tenant => tenant.financialDebt);
      case 'noDebt':
        return tenants.filter(tenant => !tenant.financialDebt);
      default:
        return tenants;

    }
  }
}