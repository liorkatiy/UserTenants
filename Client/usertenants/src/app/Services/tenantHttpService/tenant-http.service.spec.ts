import { TestBed } from '@angular/core/testing';

import { TenantHttpService } from './tenant-http.service';

describe('TenantHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenantHttpService = TestBed.get(TenantHttpService);
    expect(service).toBeTruthy();
  });
});
