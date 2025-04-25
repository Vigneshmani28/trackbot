import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserRegistrationComponent } from './sub-user-registration.component';

describe('SubUserRegistrationComponent', () => {
  let component: SubUserRegistrationComponent;
  let fixture: ComponentFixture<SubUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubUserRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
