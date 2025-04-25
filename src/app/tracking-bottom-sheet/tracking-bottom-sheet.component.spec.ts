import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingBottomSheetComponent } from './tracking-bottom-sheet.component';

describe('TrackingBottomSheetComponent', () => {
  let component: TrackingBottomSheetComponent;
  let fixture: ComponentFixture<TrackingBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
