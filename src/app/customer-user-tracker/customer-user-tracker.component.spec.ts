import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserTrackerComponent } from './customer-user-tracker.component';

describe('CustomerUserTrackerComponent', () => {
  let component: CustomerUserTrackerComponent;
  let fixture: ComponentFixture<CustomerUserTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUserTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerUserTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
