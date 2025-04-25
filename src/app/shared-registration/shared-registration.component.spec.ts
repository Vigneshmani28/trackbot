import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRegistrationComponent } from './shared-registration.component';

describe('SharedRegistrationComponent', () => {
  let component: SharedRegistrationComponent;
  let fixture: ComponentFixture<SharedRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
