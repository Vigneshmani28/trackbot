import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMapTrackingComponent } from './live-map-tracking.component';

describe('LiveMapTrackingComponent', () => {
  let component: LiveMapTrackingComponent;
  let fixture: ComponentFixture<LiveMapTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveMapTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveMapTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
