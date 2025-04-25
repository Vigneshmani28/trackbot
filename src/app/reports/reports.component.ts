import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Tracker } from '../model/tracker';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true,
  imports: [MatTableModule,CommonModule,MatCommonModule,MatFormFieldModule, MatInputModule,MatCardModule, MatPaginatorModule, FormsModule, MatButtonModule, MatSelectModule]
})
export class ReportsComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  trackers: Tracker[] = []
  trackerId : string | undefined
  displayedColumns = ['latitude', 'longitude',   'altitude', 'heading', 'status', 'deviceTime'];

  constructor(private _trackersService: TrackersService){}

  ngOnInit(): void {
    this._trackersService.trackers().subscribe(it => {
      this.trackers = it
    })
  }

  ngAfterViewInit(): void {
    // this.paginator.length = 30;
    // this.dataSource.paginator = this.paginator; 
  }

  onPageChange(event: PageEvent){
    this._trackersService.downloadReport("66423153a3baa0644ab0b74a", this.pageSize, event.pageIndex).subscribe(it => {
      this.dataSource.data = it.content;
  })
  }

  showReport(){
    if(this.trackerId && this.trackerId !== ""){
      this._trackersService.downloadReport(this.trackerId, this.pageSize, 0).subscribe(it => {
              this.dataSource.data = it.content;
              this.paginator.length = it.totalElements;
          })
    }
  }

  onTrackerSelected(event: MatSelectChange){
    this.trackerId = event.value
  }

}
