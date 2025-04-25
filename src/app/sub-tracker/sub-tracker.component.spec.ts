import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTrackerComponent } from './sub-tracker.component';

describe('SubTrackerComponent', () => {
  let component: SubTrackerComponent;
  let fixture: ComponentFixture<SubTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
