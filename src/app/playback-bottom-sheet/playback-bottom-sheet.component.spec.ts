import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackBottomSheetComponent } from './playback-bottom-sheet.component';

describe('PlaybackBottomSheetComponent', () => {
  let component: PlaybackBottomSheetComponent;
  let fixture: ComponentFixture<PlaybackBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaybackBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaybackBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
