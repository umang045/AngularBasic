import { TestBed } from '@angular/core/testing';

import { ProdsevService } from './prodsev.service';

describe('ProdsevService', () => {
  let service: ProdsevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdsevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
