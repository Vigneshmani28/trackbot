import { Component, Inject,  Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataFormatsServiceService } from '../services/data-formats/data-formats-service.service';
import { UserService } from '../services/user-service/user.service';
import { CustomerService } from '../services/customer-service/customer.service';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-add-tracker',
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
  templateUrl: './add-tracker.component.html',
  styleUrl: './add-tracker.component.css'
})
export class AddTrackerComponent {
  trackerForm!: FormGroup;
  loading = false;
  gstLoading = false;
  isEditMode = false;
  companyId!: number;
  productsType:string[] = []
  dataFormat:string[] = []
  customerType:string[] = []
  userType:string[] = []

  constructor(
    private fb: FormBuilder,
    private dataFormatService: DataFormatsServiceService,
    private productService: ProductService,
    private userService: UserService,
    private customerService: CustomerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {    

    this.productService.getMockProducts().subscribe({
      next: (response) => {
        this.productsType = response.map((format: any) => format.NameOfTheProduct);
      },
      error: (error) => {
        console.error('Error fetching data formats:', error);
      }
    });

    this.customerService.getCustomers().subscribe({
      next : (response) => {
        this.customerType = response.map((format:any) => format.CustomerName)
      },
      error: (error) => {
        console.error('Error fetching data formats:', error);
      }
    })

    this.userService.getMockUserList().subscribe({
      next : (response) => {
        this.userType = response.map((format:any) => format.UserName)
      },
      error: (error) => {
        console.error('Error fetching data formats:', error);
      }
    })

    this.dataFormatService.getMockDataFormats().subscribe({
      next: (response) => {
        this.dataFormat = response.map((format: any) => format.DataFormatName);
      },
      error: (error) => {
        console.error('Error fetching data formats:', error);
      }
    });

    this.trackerForm = this.fb.group({
      productsType: [{ value: '', disabled: this.isEditMode }, [Validators.required]],
      dataFormat: [{ value: '', disabled: this.isEditMode }, [Validators.required]],
      serialNumber: ['', [Validators.required]],
      trackerId: ['', [Validators.required]],
      trackerName: ['', [Validators.required]],
      sameAsTrackerId: [false],
      customerType: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      description: ['']
    });
  
    if (this.data) {      
      this.isEditMode = true;
      this.companyId = this.data.Id;
      this.trackerForm.patchValue({
        productsType: 'Registered Business - Regular', 
        dataFormat: 'UnRegistered Business', 
        serialNumber: 'ELB37246DGDH',
        trackerId: this.data.trackerId,
        trackerName: 'Sample Tracker Name',
        sameAsTrackerId : true,
        customerType: 'Overseas', 
        userType: 'Overseas', 
        description: 'Sample Description',
      });
  
        } else {
      this.isEditMode = false;
    }
  }

  onSameAsTrackerIdChange(isChecked: boolean) {
    if (isChecked) {
      this.trackerForm.get('trackerName')?.setValue(this.trackerForm.get('trackerId')?.value);
      this.trackerForm.get('trackerName')?.disable(); 
    } else {
      this.trackerForm.get('trackerName')?.enable(); 
      this.trackerForm.get('trackerName')?.setValue('');
    }
  }
  
  onSubmit() {
  
    if (!this.trackerForm.valid) {
      this.trackerForm.markAllAsTouched();
      return;
    }

    const { 
      productsType, dataFormat, serialNumber, trackerId, 
      trackerName, customerType, userType, 
      description
    } = this.trackerForm.getRawValue();

    this.loading = true;
  

    if (this.isEditMode) {
     console.log('edit mode', this.trackerForm.getRawValue());
    } else {
      console.log('add mode ', this.trackerForm.getRawValue());
      
    }
  }  
}
