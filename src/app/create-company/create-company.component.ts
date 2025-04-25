import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../services/company-service/company.service';
import { Company } from '../model/company';
import { MatDialogRef } from '@angular/material/dialog';
import { PlaybackDialogComponent } from '../playback-dialog/playback-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, CommonModule, MatCommonModule, MatInputModule, FormsModule]
})
export class CreateCompanyComponent {
  name = ''
  contactEmailId = ''
  contactPersonName = ''
  contactPersonPhoneNumber = ''
  address = ''
  gstNumber = ''
  companyLogo : string | undefined
  gstCertificate: string | undefined

  constructor(private _companyService: CompanyService,public dialogRef: MatDialogRef<PlaybackDialogComponent>, private _snackBar: MatSnackBar){}

  submit(){
    this._companyService.createCompany(this.name, this.contactPersonPhoneNumber, this.contactEmailId, this.contactPersonName)
    .subscribe({
      next: (company: Company) => {
        this.dialogRef.close(company)
      },
      error: () => {
        this._snackBar.open("Something went wrong!", "OK", {duration: 3000})
      }
    })
  }

  onLogoSelected(event: Event){
    let element = event.target as HTMLInputElement
    this.companyLogo = element.value
    // console.log("image selected" + element.value)
  }

  onGstCertificateSelected(event: Event){
    let element = event.target as HTMLInputElement
    this.gstCertificate = element.value
    // console.log("image selected" + element.value)
  }

}
