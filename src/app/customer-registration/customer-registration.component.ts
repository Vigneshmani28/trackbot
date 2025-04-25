import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../services/customer-service/customer.service';
import { CustomerState } from '../model/customer';
import { GstVerifyService } from '../services/gst-verify-service/gst-verify.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedRegistrationComponent } from '../shared-registration/shared-registration.component';

@Component({
  selector: 'app-customer-registration',
  standalone : true,
  imports : [
    SharedRegistrationComponent
  ],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})

export class CustomerRegistrationComponent implements OnInit {
  customerForm!: FormGroup;
  loading = false;
  gstLoading = false;
  gstVerifyFlag = false;
  gstVerifyName = '';
  isEditMode = false;
  customerId!: number;
  customerTypes = ['Registered Business - Regular', 'UnRegistered Business', 'Special Economic Zone', 'Overseas', 'Individual', 'Government', 'Government Defence'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private gstVerifyService: GstVerifyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initForm();
    
    if (this.data) {
      this.isEditMode = true;
      this.customerId = this.data.SNo;
      this.patchFormData();
      this.gstVerifyFlag = true;
    }
  }

  private initForm() {
    this.customerForm = this.fb.group({
      customerName: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.minLength(3)]],
      gstNumber: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$')]],
      customerType: [{ value: '', disabled: this.isEditMode }, [Validators.required]],
      directorName: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactPersonNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contactEmail: ['', [Validators.required, Validators.email]],
      loginEmailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      description: ['']
    });

    this.customerForm.get('gstNumber')?.valueChanges.subscribe(value => {
      if (value) {
        this.customerForm.get('gstNumber')?.setValue(value.toUpperCase(), { emitEvent: false });
      } else {
        this.gstVerifyFlag = false;
        this.gstVerifyName = '';
      }
    });
  }

  private patchFormData() {
    this.customerForm.patchValue({
      customerName: this.data.CustomerName,
      gstNumber: this.data.GSTNumber,
      customerType: this.data.CompanyType ?? '', 
      directorName: this.data.DirectorName,
      contactPersonName: this.data.ContactPersonName,
      contactPersonNumber: this.data.ContactPersonNumber,
      contactEmail: this.data.ContactEmail,
      loginEmailId: this.data.LoginEmailId,
      address: this.data.Address,
      description: this.data.Description ?? '',
    });

    if (this.isEditMode) {
      this.customerForm.get('customerName')?.disable();
      this.customerForm.get('gstNumber')?.disable();
      this.customerForm.get('loginEmailId')?.disable();
      this.customerForm.get('customerType')?.disable();
    }
  }

  onSubmit() {
    if (!this.gstVerifyFlag) {
      this._snackBar.open('Please verify GST Number', 'Ok', { duration: 3000 });
      return;
    }
  
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
  
    if (this.isEditMode) {
      console.log('edit customer', this.customerForm.getRawValue());
    } else {
      console.log('add customer', this.customerForm.getRawValue());
    }
  }

  registerCustomer(data: CustomerState) {
    this.customerService.registerCustomer(data).subscribe({
      next: () => {
        this._snackBar.open('Customer Registered Successfully', "Ok", {duration: 3000});
        this.loading = false;
      },
      error: (error) => {
        this._snackBar.open('Failed to register customer. Please try again.', "Ok", {duration: 3000});
        this.loading = false;
      }
    });
  }

  updateCustomer(data: any) {
    console.log('update', data);
  }

  gstNumberValidate() {
    const gstControl = this.customerForm.get('gstNumber');
  
    if (!gstControl?.value) {
      gstControl?.markAsTouched(); 
      return;
    }
  
    this.gstLoading = true;
    this.gstVerifyService.checkGST(gstControl.value).subscribe({
      next: (next) => {
        this.gstLoading = false;
        
        if (next?.errorCode) {
          if (next.errorCode === 'GSTNUMBER_NOT_FOUND') {
            this.gstVerifyName = next.message ? next.message : '';
            this.gstVerifyFlag = true;
            return;
          }
        }
  
        this.gstVerifyFlag = next.flag ?? false;
        this.gstVerifyName = next.data?.tradeNam ?? '';
      },
      error: (error) => {
        console.log('error', error);
        this.gstLoading = false;
      }
    });
  }
}
