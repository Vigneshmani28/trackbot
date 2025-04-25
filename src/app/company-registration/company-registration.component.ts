import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../services/company-service/company.service';
import { CompanyState } from '../model/company';
import { GstVerifyService } from '../services/gst-verify-service/gst-verify.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedRegistrationComponent } from '../shared-registration/shared-registration.component';

@Component({
  selector: 'app-company-registration',
  standalone : true,
  imports : [
    SharedRegistrationComponent
  ],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.css'
})
export class CompanyRegistrationComponent implements OnInit {
  companyForm!: FormGroup;
  loading = false;
  gstLoading = false;
  gstVerifyFlag = false;
  gstVerifyName = '';
  isEditMode = false;
  companyId!: number;
  companyTypes = ['Registered Business - Regular', 'UnRegistered Business', 'Special Economic Zone', 'Overseas', 'Individual', 'Government', 'Government Defence'];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private _snackBar: MatSnackBar,
    private gstVerifyService: GstVerifyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initForm();
    
    if (this.data) {
      this.isEditMode = true;
      this.companyId = this.data.Id;
      this.patchFormData();
      this.gstVerifyFlag = true;
    }
  }

  private initForm() {
    this.companyForm = this.fb.group({
      companyName: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.minLength(3)]],
      gstNumber: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$')]],
      companyType: [{ value: '', disabled: this.isEditMode }, [Validators.required]],
      directorName: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactPersonNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contactEmail: ['', [Validators.required, Validators.email]],
      loginEmailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      description: ['']
    });

    this.companyForm.get('gstNumber')?.valueChanges.subscribe(value => {
      if (value) {
        this.companyForm.get('gstNumber')?.setValue(value.toUpperCase(), { emitEvent: false });
      } else {
        this.gstVerifyFlag = false;
        this.gstVerifyName = '';
      }
    });
  }

  private patchFormData() {
    this.companyForm.patchValue({
      companyName: this.data.CompanyName,
      gstNumber: this.data.GSTNumber,
      companyType: this.data.CompanyType ?? '', 
      directorName: this.data.DirectorName,
      contactPersonName: this.data.ContactPersonName,
      contactPersonNumber: this.data.ContactPersonNumber,
      contactEmail: this.data.ContactEmail,
      loginEmailId: this.data.LoginEmailId,
      address: this.data.Address,
      description: this.data.Description ?? '',
    });

    if (this.isEditMode) {
      this.companyForm.get('companyName')?.disable();
      this.companyForm.get('gstNumber')?.disable();
      this.companyForm.get('loginEmailId')?.disable();
      this.companyForm.get('companyType')?.disable();
    }
  }

  onSubmit() {
    if (!this.gstVerifyFlag) {
      this._snackBar.open('Please verify GST Number', 'Ok', { duration: 3000 });
      return;
    }
  
    if (!this.companyForm.valid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    this.loading = true;
  
    if (this.isEditMode) {
      console.log('edit company', this.companyForm.getRawValue());
      this.loading = false;
    } else {
      console.log('add company', this.companyForm.getRawValue());
      this.loading = false;
    }
  }

  registerCompany(data: CompanyState) {
    this.companyService.registerCompany(data).subscribe({
      next: () => {
        this._snackBar.open('Company Registered Successfully!', 'Ok', {duration: 3000});
        this.loading = false;
      },
      error: (error) => {
        console.error('API Error:', error);
        this.loading = false;
        this._snackBar.open('Failed to register company. Please try again.', 'Ok', {duration: 3000});
      }
    });
  }

  updateCompany(data: any) {
   console.log('update', data);
   
  }

  gstNumberValidate() {
    const gstControl = this.companyForm.get('gstNumber');
  
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