import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDetailsComponent } from './tracker-details.component';

describe('TrackerDetailsComponent', () => {
  let component: TrackerDetailsComponent;
  let fixture: ComponentFixture<TrackerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
