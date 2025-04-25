import { TestBed } from '@angular/core/testing';

import { AcknowledgeBottomSheetService } from './acknowledge-bottom-sheet.service';

describe('AcknowledgeBottomSheetService', () => {
  let service: AcknowledgeBottomSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcknowledgeBottomSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
