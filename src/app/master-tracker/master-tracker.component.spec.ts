import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTrackerComponent } from './master-tracker.component';

describe('MasterTrackerComponent', () => {
  let component: MasterTrackerComponent;
  let fixture: ComponentFixture<MasterTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
