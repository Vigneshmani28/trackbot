import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PlaybackDialogComponent } from '../playback-dialog/playback-dialog.component';
import { Tracker } from '../model/tracker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Company } from '../model/company';
import { CompanyService } from '../services/company-service/company.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, CommonModule, FormsModule, MatSelectModule,]
})
export class AddDeviceComponent implements OnInit {
  deviceName = ""
  companyId: number | undefined
  companies: Company[] = []

  constructor(private trackerService: TrackersService, 
    public dialogRef: MatDialogRef<PlaybackDialogComponent>, 
    private _snackBar: MatSnackBar,
    private companyService: CompanyService
  ){}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (list) => {
        this.companies = list
      }
    })
  }

  submit(){
    console.log("submitting new device")
    this.trackerService.createTracker(this.deviceName, this.companyId!).subscribe({
      next: (result: Tracker) => {
        this.dialogRef.close(result)
      },
      error: (err: HttpErrorResponse) => {
        this._snackBar.open("Something went wrong!")
      }
    })
  }

  onCompanySelected(event: MatSelectChange){
    this.companyId = event.value
  }

}
