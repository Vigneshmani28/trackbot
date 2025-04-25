import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-sub-user-registration',
  standalone: true,
  imports : [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    AttachmentsComponent,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './sub-user-registration.component.html',
  styleUrl: './sub-user-registration.component.css'
})
export class SubUserRegistrationComponent {
  subUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient){}

  adminRights = ['Yes', 'No']

  ngOnInit(): void {
    this.subUserForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      adminRights : ['', [Validators.required]],
      description: ['']
    });
  }

  onSubmit() {
    console.log('add', this.subUserForm.getRawValue());
   }
}
