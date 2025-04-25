import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateTrackerToUserComponent } from './allocate-tracker-to-user.component';

describe('AllocateTrackerToUserComponent', () => {
  let component: AllocateTrackerToUserComponent;
  let fixture: ComponentFixture<AllocateTrackerToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllocateTrackerToUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllocateTrackerToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
