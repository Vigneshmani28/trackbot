import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateTrackerComponent } from './allocate-tracker.component';

describe('AllocateTrackerComponent', () => {
  let component: AllocateTrackerComponent;
  let fixture: ComponentFixture<AllocateTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllocateTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllocateTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
