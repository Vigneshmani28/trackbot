import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmlUploaderComponent } from './kml-uploader.component';

describe('KmlUploaderComponent', () => {
  let component: KmlUploaderComponent;
  let fixture: ComponentFixture<KmlUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KmlUploaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KmlUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
