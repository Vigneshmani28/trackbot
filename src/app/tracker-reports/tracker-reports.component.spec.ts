import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerReportsComponent } from './tracker-reports.component';

describe('TrackerReportsComponent', () => {
  let component: TrackerReportsComponent;
  let fixture: ComponentFixture<TrackerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackerReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
