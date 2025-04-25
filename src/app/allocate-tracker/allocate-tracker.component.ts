import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CompanyService } from '../services/company-service/company.service';
import { Company } from '../model/company';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tracker } from '../model/tracker';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { PlaybackDialogComponent } from '../playback-dialog/playback-dialog.component';

@Component({
  selector: 'app-allocate-tracker',
  templateUrl: './allocate-tracker.component.html',
  styleUrl: './allocate-tracker.component.css',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, CommonModule, FormsModule, MatSelectModule,]
})
export class AllocateTrackerComponent implements OnInit {
  companyId: string | undefined
  companies: Company[] = []

  constructor(
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public tracker: Tracker,
    private trackersService: TrackersService,
    public dialogRef: MatDialogRef<PlaybackDialogComponent>
  ){}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (list) => {
        this.companies = list
      }
    })
  }
  
  onCompanySelected(event: MatSelectChange){
    this.companyId = event.value
  }

  submit(){
    if(this.companyId){
        this.trackersService.assignTrackerToACompany(this.tracker.deviceId, this.companyId).subscribe({
          next: (tracker: Tracker) => {
            this.dialogRef.close(tracker);
          }
        })
    }
  }

}
