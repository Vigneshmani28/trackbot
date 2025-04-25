import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgeBottomContainerComponent } from './acknowledge-bottom-container.component';

describe('AcknowledgeBottomContainerComponent', () => {
  let component: AcknowledgeBottomContainerComponent;
  let fixture: ComponentFixture<AcknowledgeBottomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcknowledgeBottomContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcknowledgeBottomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
