import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackDialogComponent } from './playback-dialog.component';

describe('PlaybackDialogComponent', () => {
  let component: PlaybackDialogComponent;
  let fixture: ComponentFixture<PlaybackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaybackDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaybackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
