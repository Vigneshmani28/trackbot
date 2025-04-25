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

@Component({
  selector: 'app-data-format-registration',
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
  templateUrl: './data-format-registration.component.html',
  styleUrl: './data-format-registration.component.css'
})
export class DataFormatRegistrationComponent {
dataFormatForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  encryptionEnabledOptions = ['Yes', 'No']

  isEditMode = false;
  isViewMode = false;
  loading = false;

  ngOnInit(): void {
    this.isEditMode = this.data?.mode === 'edit';
    this.isViewMode = this.data?.mode === 'view';

    this.dataFormatForm = this.fb.group({
      dataFormatName: ['', [Validators.required]],
      encryptionEnabled: [{value : '', disabled : this.isViewMode}, [Validators.required]],
      typeOfEncryption : ['', [Validators.required]],
      sampleFormat : ['',],
      decodeInformation : [''],
      description : [''],
    });

    if(this.data){     
      console.log(this.data);
      
      this.isEditMode = true; 
      this.dataFormatForm.patchValue({
        dataFormatName : this.data.DataFormatName,
        encryptionEnabled : this.data.EncryptionEnabled,
        typeOfEncryption  :this.data.TypeOfEncryption,
        sampleFormat : this.data.SampleFormat,
        decodeInformation : this.data.DecodeInformation,
        description : this.data.Description
      })
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.isEditMode) {
      console.log('Data format edit', this.dataFormatForm.getRawValue());
    } else {
      console.log('Data format adding', this.dataFormatForm.getRawValue());
    }
    this.loading = false;
  }
}
