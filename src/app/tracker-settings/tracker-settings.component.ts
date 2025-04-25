import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Tracker } from '../model/tracker';
import { MarkerPlayback } from '../mock-trackers';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tracker-settings',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, 
    FormsModule, MatButtonModule, MatIconModule, MatDividerModule, CommonModule, MatSelectModule
  ],
  templateUrl: './tracker-settings.component.html',
  styleUrl: './tracker-settings.component.css'
})
export class TrackerSettingsComponent {
  @Input() tracker!: Tracker
  @Input() mockTracker! : MarkerPlayback;
  @Output() goBack = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<string>();
  @Output() deviceInterval = new EventEmitter<string>();

  selectedInterval: string = '';
  newDisplayName: string = '';
  selectedIcon: string = 'devices';
  availableIcons: string[] = [
    'directions_car', 'train', 'directions_boat', 'flight', 'directions_bus_filled'
  ];
  isLocationSharingEnabled = false;
  
  private dialogRef?: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {}

  openDialog(template: TemplateRef<any>, width: string = '300px') {
    this.dialogRef = this.dialog.open(template, { width });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openDeviceIntervalDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate);
    this.dialogRef?.afterClosed().subscribe(result => {
      if (result) {
        this.selectedInterval = result;
        this.deviceInterval.emit(this.selectedInterval)
        console.log('Device interval set to:', `${this.selectedInterval}`);
      }
    });
  }

  openBlockDeviceDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate, '350px');
  }

  openUnblockDeviceDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate, '350px');
  }

  openBatteryInfoDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate, '350px');
  }

  openChangeNameDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate);
    this.dialogRef?.afterClosed().subscribe(result => {
      if (result) {
        this.newDisplayName = result;
        console.log('Display name changed to:', this.newDisplayName);
      }
    });
  }

  openSetIconDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate, '400px');
    this.dialogRef?.afterClosed().subscribe(result => {
      if (result) {
        this.selectedIcon = result;
        console.log('Icon changed to:', this.selectedIcon);
      }
    });
  }

  openLocationSharingDialog(dialogTemplate: TemplateRef<any>) {
    this.openDialog(dialogTemplate, '400px');
    this.dialogRef?.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
}

    toggleLocationSharing() {
        this.isLocationSharingEnabled = !this.isLocationSharingEnabled;
        this.closeDialog();
    }

  saveInterval() {
    this.dialogRef?.close(this.selectedInterval);
  }

  blockDevice() {
    console.log('Device blocked');
    this.closeDialog();
  }

  unblockDevice() {
    console.log('Device unblocked');
    this.closeDialog();
  }

  requestBatteryInfo() {
    console.log('Battery info requested');
    this.closeDialog();
  }

  saveDisplayName() {
    console.log('Display name saved:', this.newDisplayName);
    this.dialogRef?.close(this.newDisplayName);
  }

  saveIcon() {
    console.log('Icon saved:', this.selectedIcon);
    this.dialogRef?.close(this.selectedIcon);
  }

  close() {
    this.closeDrawer.emit('close');
  }


  formatTime() {
    if (this.selectedInterval) {
      if (this.selectedInterval.length === 2 && this.selectedInterval.indexOf(':') === -1) {
        this.selectedInterval = this.selectedInterval + ':';
      }
      
      if (this.selectedInterval.length === 5 && this.selectedInterval.indexOf(':', 3) === -1) {
        this.selectedInterval = this.selectedInterval + ':';
      }

      const timeParts = this.selectedInterval.split(':');
      if (timeParts.length > 1) {
        let [hours, minutes, seconds] = timeParts;
        
        if (!seconds) {
          seconds = '00';
        }
        
        if (hours.length === 2 && minutes.length === 2 && seconds.length === 2) {
          if (+hours >= 0 && +hours <= 23 && +minutes >= 0 && +minutes <= 59 && +seconds >= 0 && +seconds <= 59) {
            this.selectedInterval = `${hours}:${minutes}:${seconds}`;
          }
        }
      }
    }
  }
}