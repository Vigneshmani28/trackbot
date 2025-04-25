import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-shared-registration',
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
  templateUrl: './shared-registration.component.html',
  styleUrls: ['./shared-registration.component.css']
})
export class SharedRegistrationComponent {
  @Input() registrationForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() entityTypes: string[] = [];
  @Input() gstVerifyFlag: boolean = false;
  @Input() gstVerifyName: string = '';
  @Input() gstLoading: boolean = false;
  @Input() loading: boolean = false;
  @Input() entityName: string = ''; 
  
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onGstValidate = new EventEmitter<void>();

  get title(): string {
    return this.isEditMode ? `Update ${this.capitalizeFirstLetter(this.entityName)}` : `Register ${this.capitalizeFirstLetter(this.entityName)}`;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}