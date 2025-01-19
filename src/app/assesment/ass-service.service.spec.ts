import { TestBed } from '@angular/core/testing';

import { AssServiceService } from './ass-service.service';

describe('AssServiceService', () => {
  let service: AssServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
