import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackersTableComponent } from './trackers-table.component';

fdescribe('TrackersTableComponent', () => {
  let component: TrackersTableComponent;
  let fixture: ComponentFixture<TrackersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackersTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
