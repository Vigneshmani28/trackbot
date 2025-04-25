import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackcontrolsbottomsheetComponent } from './playbackcontrolsbottomsheet.component';

describe('PlaybackcontrolsbottomsheetComponent', () => {
  let component: PlaybackcontrolsbottomsheetComponent;
  let fixture: ComponentFixture<PlaybackcontrolsbottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaybackcontrolsbottomsheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaybackcontrolsbottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
