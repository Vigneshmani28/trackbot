import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMenuComponent } from './country-menu.component';

describe('CountryMenuComponent', () => {
  let component: CountryMenuComponent;
  let fixture: ComponentFixture<CountryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
