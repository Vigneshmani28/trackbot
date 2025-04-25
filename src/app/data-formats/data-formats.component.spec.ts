import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormatsComponent } from './data-formats.component';

describe('DataFormatsComponent', () => {
  let component: DataFormatsComponent;
  let fixture: ComponentFixture<DataFormatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFormatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
