import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormatRegistrationComponent } from './data-format-registration.component';

describe('DataFormatRegistrationComponent', () => {
  let component: DataFormatRegistrationComponent;
  let fixture: ComponentFixture<DataFormatRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFormatRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFormatRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
