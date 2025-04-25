import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataFormatsServiceService } from '../services/data-formats/data-formats-service.service';

@Component({
  selector: 'app-product-registration',
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
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataFormatService: DataFormatsServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  categoryOptions = ['Aviation', 'Marine', 'Land']
  dataFormatsOptions:string[] = []

  isEditMode = false;
  isViewMode = false;
  loading = false;

  ngOnInit(): void {
    this.isEditMode = this.data?.mode === 'edit';
    this.isViewMode = this.data?.mode === 'view';

    this.dataFormatService.getMockDataFormats().subscribe({
      next: (response) => {
        this.dataFormatsOptions = response.map((format: any) => format.DataFormatName);
      },
      error: (error) => {
        console.error('Error fetching data formats:', error);
      }
    });

    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productModelNumber: ['', [Validators.required]],
      productVersion: ['', [Validators.required]],
      category: [{ value: '', disabled: this.isViewMode }, [Validators.required]],
      dataFormat: [{ value: [], disabled: this.isViewMode }, [Validators.required]],
      manuFacturer: ['', [Validators.required]],
      description: [''],
    });
    

    if(this.data){     
      console.log(this.data);
      
      this.isEditMode = true; 
      this.productForm.patchValue({
      productName: this.data.NameOfTheProduct,
      productModelNumber: this.data.ProductModelNumber,
      productVersion: this.data.ProductVersion,
      category: this.data.Category,
      dataFormat: this.data.DataFormat ? this.data.DataFormat.split(',').map((item:string) => item.trim()) : [],
      manuFacturer : this.data.Manufacturer,
      description : this.data.Description,
      })
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.isEditMode) {
      console.log('Data format edit', this.productForm.getRawValue());
    } else {
      console.log('Data format adding', this.productForm.getRawValue());
    }
    this.loading = false;
  }
}
