import { TestBed } from '@angular/core/testing';

import { GstVerifyService } from './gst-verify.service';

describe('GstVerifyService', () => {
  let service: GstVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
