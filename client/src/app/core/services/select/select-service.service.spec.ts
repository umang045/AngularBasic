import { TestBed } from '@angular/core/testing';

import { SelectServiceService } from './select-service.service';

describe('SelectServiceService', () => {
  let service: SelectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
