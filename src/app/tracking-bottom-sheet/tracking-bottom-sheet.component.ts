import { Component, Inject, Input } from '@angular/core';
import { Tracker } from '../model/tracker';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PlaybackBottomSheetComponent } from '../playback-bottom-sheet/playback-bottom-sheet.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tracking-bottom-sheet',
  templateUrl: './tracking-bottom-sheet.component.html',
  styleUrl: './tracking-bottom-sheet.component.css',
  standalone: true,
  imports: [MatButtonModule]
})
export class TrackingBottomSheetComponent {
  tracker: Tracker

  constructor(private _bottomSheetRef: MatBottomSheetRef<PlaybackBottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {tracker: Tracker}){
    this.tracker = data.tracker;
  }

  stopTracking(){
    this._bottomSheetRef.dismiss()
  }
}
