import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerChatComponent } from './tracker-chat.component';

describe('TrackerChatComponent', () => {
  let component: TrackerChatComponent;
  let fixture: ComponentFixture<TrackerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackerChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
