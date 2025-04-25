import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Tracker } from '../model/tracker';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PlaybackDialogComponent } from '../playback-dialog/playback-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';
import { MarkerPlayback } from '../mock-trackers';
import { CommonModule } from '@angular/common';

export interface RequestPlayback {
  tracker: Tracker
  list: Tracker[],
  startTime: string,
  endTime: string
}

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.component.html',
  styleUrl: './tracker-details.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, CommonModule]
})
export class TrackerDetailsComponent implements OnInit {
  @Input() tracker!: Tracker
  @Input() mockTracker! : MarkerPlayback;
  @Input() trackerList!: Tracker[]
  @Output() startPlayback = new EventEmitter<RequestPlayback>();
  @Output() closeDrawer = new EventEmitter<string>();
  @Output() startTracking = new EventEmitter<Tracker>();

  @Output() navigate = new EventEmitter<'reports' | 'settings' | 'chat'>();

  @Output() dateRangeSelected = new EventEmitter<{ from: Date; to: Date, videoMode: boolean }>();

  openView(view : 'reports' | 'settings' | 'chat') {
    this.navigate.emit(view);
  }

  isDisabled: boolean = true; // For demo

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('received tracker id', this.mockTracker)
  }

  // playbackClick() {
  //   let dialogRef = this.dialog.open(PlaybackDialogComponent, { data: { tracker: this.tracker, trackerList: this.trackerList } })
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.closeDrawer.emit('close')
  //       this.startPlayback.emit(result)
  //     }
  //   })
  // }
  playbackClick() {
    const dialogRef = this.dialog.open(DateTimePickerDialogComponent, {
         
          data: { tracker: this.tracker, trackerList: this.trackerList }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {       
            const { from, to, videoMode } = result;

            this.dateRangeSelected.emit({ from, to, videoMode });
          }
        });
  }

  trackClick() {
    this.startTracking.emit(this.tracker)
  }

  close(event: any) {
    this.closeDrawer.emit('close')
  }

}
