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
import { CustomerService } from '../services/customer-service/customer.service';

@Component({
  selector: 'app-user-registration',
  standalone : true,
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
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {
  userForm!: FormGroup;
  customersList: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private customerService:CustomerService){}

  adminRights = ['Yes', 'No']

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customersList = response.map((format: any) => format.CustomerName);
      },
      error: (error) => {
        console.error('Error fetching data formats:', error);
      }
    });

    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      adminRights: ['', [Validators.required]],
      customerName: [{ value: '', disabled: true }, [Validators.required]],
      self: [true],
      description: ['']
    });
    
    this.userForm.get('self')?.valueChanges.subscribe((selfValue: boolean) => {
      if (selfValue) {
        this.userForm.get('customerName')?.disable();
        this.userForm.get('customerName')?.setValue('');
      } else {
        this.userForm.get('customerName')?.enable();
      }
    });
    
  }

  onSubmit() {
   console.log('add', this.userForm.getRawValue());
  }
}
