import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AttachmentsComponent } from '../attachments/attachments.component';

@Component({
  selector: 'app-device-registration',
  standalone : true,
  imports : [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    AttachmentsComponent,
    MatSelectModule
  ],
  templateUrl: './device-registration.component.html',
  styleUrl: './device-registration.component.css'
})
export class DeviceRegistrationComponent {
  deviceForm!: FormGroup;
  deviceTypes: string[] = ['Smartphone', 'Tablet', 'Laptop', 'Smartwatch'];

  constructor(private fb: FormBuilder){
    this.deviceForm = this.fb.group({
      deviceIdentifier: ['', [Validators.required]],
      deviceModelNumber: ['', [Validators.required]],
      deviceModelName: ['', [Validators.required]],
      deviceTypes: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      console.log('Form is valid:', this.deviceForm.value);
    } else {
      console.log('Form is invalid');
      console.log('Form Data:', this.deviceForm.value);
      this.deviceForm.markAllAsTouched();
    }
  }
}
