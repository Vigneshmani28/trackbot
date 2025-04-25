import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Tracker } from '../model/tracker';
import { MarkerPlayback } from '../mock-trackers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracker-reports',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, CommonModule],
  templateUrl: './tracker-reports.component.html',
  styleUrl: './tracker-reports.component.css'
})
export class TrackerReportsComponent {
  @Input() onSwitchView!:() => void
  @Input() tracker!: Tracker
  @Input() mockTracker! : MarkerPlayback;
  @Output() goBack = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<string>();

  constructor(private router: Router) {}

  
  trackerReportList = [
    {
      Lat: 15.077,
      long: 34.443,
      speed: 15.8788,
      heading: 15,
      altitude: 80.87654,
      battery: 100,
      gps_utc: 'Jan 24, Mon 23:32:00',
      gps_ist: 'Jan 24, Mon 23:32:00',
      received_utc: 'Jan 24, Mon 23:32:00',
      received_ist: 'Jan 24, Mon 23:32:00',
    },
    {
      Lat: 18.125,
      long: 37.892,
      speed: 20.563,
      heading: 75,
      altitude: 120.5432,
      battery: 98,
      gps_utc: 'Jan 25, Tue 10:15:30',
      gps_ist: 'Jan 25, Tue 15:45:30',
      received_utc: 'Jan 25, Tue 10:16:00',
      received_ist: 'Jan 25, Tue 15:46:00',
    },
    {
      Lat: 22.500,
      long: 45.678,
      speed: 10.234,
      heading: 45,
      altitude: 90.1234,
      battery: 95,
      gps_utc: 'Jan 26, Wed 08:22:10',
      gps_ist: 'Jan 26, Wed 13:52:10',
      received_utc: 'Jan 26, Wed 08:23:00',
      received_ist: 'Jan 26, Wed 13:53:00',
    },
    {
      Lat: 11.234,
      long: 30.789,
      speed: 30.875,
      heading: 90,
      altitude: 150.4321,
      battery: 90,
      gps_utc: 'Jan 27, Thu 18:05:45',
      gps_ist: 'Jan 27, Thu 23:35:45',
      received_utc: 'Jan 27, Thu 18:06:30',
      received_ist: 'Jan 27, Thu 23:36:30',
    }
  ];
  
  close() {
    this.closeDrawer.emit('close');
  }

  viewAllReports() {
    this.router.navigate(['/full-reports'], { state: { data: this.trackerReportList } });
    if (this.onSwitchView) {
      this.onSwitchView();
    }
  }
  
}
