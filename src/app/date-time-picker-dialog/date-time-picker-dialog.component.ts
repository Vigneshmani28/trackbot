import { Component, EventEmitter, Output, Inject, Optional, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Tracker } from '../model/tracker';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { DatePipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface DialogData {
  tracker: Tracker,
  trackerList: Tracker[]
}


@Component({
  selector: 'app-date-time-picker-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDatepickerModule, MatInputModule, FormsModule, MatDialogContent,
    MatDialogActions, MatCheckboxModule
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './date-time-picker-dialog.component.html',
  styleUrl: './date-time-picker-dialog.component.css'
})

export class DateTimePickerDialogComponent implements OnInit {
 @Output() dateRangeChange = new EventEmitter<{ from: Date, to: Date }>();
 @Input() trackerName: string = this.data.tracker ? this.data.tracker.deviceName : ''
  @Input() trackerNames: string[] = this.data.trackerList.map(it =>  it.deviceName)

  myControl = new FormControl(this.trackerName);
    filteredOptions: Observable<string[]> | undefined;
    
   constructor(public dialogRef: MatDialogRef<DateTimePickerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,private trackerService: TrackersService, private datePipe: DatePipe) {}

//  constructor(
//   public dialogRef: MatDialogRef<DateTimePickerDialogComponent>,
//   @Optional() @Inject(MAT_DIALOG_DATA) public data: any
// ) { }

  startDate!: Date;
  startTime!: string;
  endDate!: Date;
  endTime!: string;

  videoMode = true;

   ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.trackerNames.filter(option => option.toLowerCase().includes(filterValue));
    }

  confirmSelection(): void {
    if (this.startDate && this.startTime && this.endDate && this.endTime) {
      const fromDateTime = this.combineDateAndTime(this.startDate, this.startTime);
      const toDateTime = this.combineDateAndTime(this.endDate, this.endTime);
      this.dialogRef.close({ from: fromDateTime, to: toDateTime, videoMode : this.videoMode });
    }
  }

  private combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const mergedDate = new Date(date);
    mergedDate.setHours(hours, minutes, 0, 0);
    return mergedDate;
  }
}
