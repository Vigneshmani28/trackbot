import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Tracker } from '../model/tracker';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { Observable, map, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

interface DialogData {
  tracker: Tracker,
  trackerList: Tracker[]
}

@Component({
  selector: 'app-playback-dialog',
  templateUrl: './playback-dialog.component.html',
  styleUrl: './playback-dialog.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatCommonModule, MatInputModule, MatDatepickerModule, MatButtonModule,ReactiveFormsModule, MatAutocompleteModule]
})
export class PlaybackDialogComponent {
  @Input() trackerName: string = this.data.tracker ? this.data.tracker.deviceName : ''
  @Input() trackerNames: string[] = this.data.trackerList.map(it =>  it.deviceName)

  startDate : Date | null = null
  endDate : Date | null = null
  startTime = ''
  endTime = ''

  dateInput(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type === 'start-time') {
      this.startDate = event.value
    } else {
      this.endDate = event.value
    }
  }

  myControl = new FormControl(this.trackerName);
  filteredOptions: Observable<string[]> | undefined;
  constructor(public dialogRef: MatDialogRef<PlaybackDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,private trackerService: TrackersService, private datePipe: DatePipe) {}

  fetchPlaybackDetails() {
    let start = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') + "T" + this.startTime + ":00"
    let end = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') + "T" + this.endTime + ":00"
    this.trackerService.getPlaybackDetails(start, end, this.data.tracker.deviceId).subscribe( it => {
      this.dialogRef.close({tracker: this.data.tracker, list: it, startTime: start, endTime: end})
    })
  }

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


}
