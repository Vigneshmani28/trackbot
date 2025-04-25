import { TestBed } from '@angular/core/testing';

import { DataFormatsServiceService } from './data-formats-service.service';

describe('DataFormatsServiceService', () => {
  let service: DataFormatsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFormatsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
