import { Component, Inject, Input } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Tracker } from '../model/tracker';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RequestPlayback } from '../tracker-details/tracker-details.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-playback-bottom-sheet',
  templateUrl: './playback-bottom-sheet.component.html',
  styleUrl: './playback-bottom-sheet.component.css',
  standalone: true,
  imports: [MatCommonModule, CommonModule, MatButtonModule]
})
export class PlaybackBottomSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<PlaybackBottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: RequestPlayback) {}

  tracker = this.data.tracker
  startTime = this.data.startTime
  endTime = this.data.startTime

  stopPlayback(){
    this._bottomSheetRef.dismiss()
  }
}
