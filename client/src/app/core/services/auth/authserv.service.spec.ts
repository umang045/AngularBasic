import { TestBed } from '@angular/core/testing';

import { AuthservService } from './authserv.service';

describe('AuthservService', () => {
  let service: AuthservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
