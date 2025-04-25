import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-full-reports',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './full-reports.component.html',
  styleUrl: './full-reports.component.css'
})
export class FullReportsComponent {
  displayedColumns: string[] = [
    'Lat', 'long', 'speed', 'heading', 'altitude', 'battery',
    'gps_utc', 'gps_ist', 'received_utc', 'received_ist'
  ];
  dataSource = history.state.data || [];

  constructor(private location: Location, private snackbar: MatSnackBar) {}

  goBack() {
    this.location.back();
  }

  exportAsCSV() {
    if (this.dataSource.length === 0) {
      this.snackbar.open('No data available to export.', "Ok", {duration: 3000})
      return;
    }
  
    const header = this.displayedColumns.join(',');
  
    const rows = this.dataSource.map((row: any) => {
      return this.displayedColumns.map((column) => {
        const value = row[column] || '';
  
        if (column === 'gps_utc' || column === 'received_utc' || column === 'gps_ist' || column === 'received_ist') {
          return `"${value}"`;
        }
  
        return `"${value}"`;
      }).join(',');
    });
  
    const csvContent = [header, ...rows].join('\n');
    console.log(csvContent);
    this.downloadCSV(csvContent); 
  }
  

  downloadCSV(csvContent: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'tracker_reports.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
