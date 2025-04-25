import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PlaybackService } from '../services/playback-service/playback.service';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpeedEnum } from '../model/tracker';

@Component({
  selector: 'app-playbackcontrolsbottomsheet',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSelectModule, CommonModule, FormsModule, MatCheckboxModule],
  templateUrl: './playbackcontrolsbottomsheet.component.html',
  styleUrls: ['./playbackcontrolsbottomsheet.component.css']
})
export class PlaybackcontrolsbottomsheetComponent {
  isPlaying = false;

  selectedSpeed: string = '1x'; 
  playbackSpeeds: string[] = ['1x', '2x', '4x', '6x', '8x', '10x'];
  moveMap: boolean = false;

  isVideoMode = false;
  
  constructor(
    private playbackService: PlaybackService,
    private _bottomSheetRef: MatBottomSheetRef<PlaybackcontrolsbottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { videoMode: boolean }
  ) {
    this.isVideoMode = this.data.videoMode;
    if(!this.isVideoMode){
      this.playbackService.showFullRoute();
    }
  }

  onSpeedChange(event: any): void {
    this.playbackService.fastForward(Number(SpeedEnum[event.value]))
  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;
  
    if (this.isPlaying) {
      this.moveMap = false;
      this.playbackService.setMoveMap(this.moveMap);
      this.playbackService.play();
    } else {
      this.playbackService.pause();
    }
  }

  reversePlayback(): void {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.playbackService.pause();
    }
    this.playbackService.reverse();
  }

  fastForward(): void {
    this.playbackService.fastForward();
  }

  stopPlayback(): void {
    this.moveMap = false;
    this.playbackService.setMoveMap(this.moveMap);
    this.playbackService.pause();
    this._bottomSheetRef.dismiss();
  }

  updateMoveMap(): void {
    this.playbackService.setMoveMap(this.moveMap);
  
    if (this.moveMap) {
      this.isPlaying = false;
      this.playbackService.pause(); 
    }
  }
}