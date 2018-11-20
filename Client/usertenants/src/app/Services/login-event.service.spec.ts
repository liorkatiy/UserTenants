import { TestBed } from '@angular/core/testing';

import { LoginEventService } from './login-event.service';

describe('LoginEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginEventService = TestBed.get(LoginEventService);
    expect(service).toBeTruthy();
  });
});
