import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { DeviceStatus, Tracker } from '../model/tracker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'
import { CompanyListComponent } from "../company-list/company-list.component";
import { AllocateTrackerComponent } from "../allocate-tracker/allocate-tracker.component";
import { UserListComponent } from "../user-list/user-list.component";
import { AllocateTrackerToUserComponent } from '../allocate-tracker-to-user/allocate-tracker-to-user.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { Role } from '../model/user';
import { saveAs } from 'file-saver';
import { ReportsComponent } from "../reports/reports.component";
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { DeviceRegistrationComponent } from '../device-registration/device-registration.component';
import { CustomerRegistrationComponent } from '../customer-registration/customer-registration.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tracker-list',
  standalone: true,
  imports: [
    MatButtonModule, MatListModule, MatTableModule, CommonModule,
        MatPaginatorModule, FormsModule, MatCommonModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatCardModule, MatDividerModule,
        CompanyListComponent, AllocateTrackerComponent, UserListComponent,
        AllocateTrackerToUserComponent,
         MatIconModule, MatMenuModule, ReportsComponent, CompanyRegistrationComponent,
          DeviceRegistrationComponent, CustomerRegistrationComponent, UserRegistrationComponent,
           CustomerListComponent, MatSidenavModule, RouterOutlet 
  ],
  templateUrl: './tracker-list.component.html',
  styleUrl: './tracker-list.component.css'
})
export class TrackerListComponent implements AfterViewInit, OnInit, OnDestroy {
  readonly REFRESH_TIME = 15 * 1000

    trackerName = ""
    companyName = ""
    trackers: Tracker[] = []
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource = new MatTableDataSource();
    totalTrackers = ""
    activeTrackers = ""
    inActiveTrackers = ""
    sleepTrackers = ""
    alertTrackers = ""
    pageSize = 10;
    displayedColumns = ['deviceName', 'status', 'latitude', 'longitude', 'heading', 'lastUpdatedDeviceTime', "actions"];
    subscription: Subscription | undefined
    timer: NodeJS.Timeout | undefined
    isAdmin = false;
  
  constructor(
      private trackerService: TrackersService, 
      private authService: AuthService,
      private dialog: MatDialog,
      private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
      let refresh: () => void = () => {
        this.subscription = this.trackerService.trackers().subscribe({
          next: (result) => {
            this.populateTrackers(result)
            this.timer = setTimeout(refresh, this.REFRESH_TIME)
          }
        })
      }
      refresh();
      this.isAdmin = this.authService.user?.role.includes(Role.Admin) ?? false
    }

    ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
      if(this.timer){
        clearTimeout(this.timer)
      }
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    populateTrackers(result: Tracker[]) {
        this.dataSource.data = result
          this.trackers = result;
          this.totalTrackers = this.trackers.length < 10 ? '0' + this.trackers.length : this.trackers.length.toString()
          this.activeTrackers = this.getCount(this.trackers, DeviceStatus.ACTIVE)
          this.inActiveTrackers = this.getCount(this.trackers, DeviceStatus.OFFLINE)
          this.sleepTrackers = this.getCount(this.trackers, DeviceStatus.SLEEP)
          this.alertTrackers = this.getCount(this.trackers, DeviceStatus.ALERT)
      }

       getCount(list: Tracker[], status: DeviceStatus): string {
          let count = list.filter(it => it.status == status).length
          return count < 10 ? '0' + count : count.toString()
        }

      createTracker(){
          let ref = this.dialog.open(AddDeviceComponent, {})
          ref.afterClosed().subscribe(result => {
            if(result){
                this.trackers.push(result);
                this.dataSource.data = this.trackers;
              this._snackBar.open("Device added successfully", "OK", {
                duration: 3000
              })
            }
          })
        }

        applyFilter(event: Event, key: keyof any) {
          const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        
          this.dataSource.filterPredicate = (data: any) => 
            data[key]?.toLowerCase().includes(filterValue);
        
          this.dataSource.filter = filterValue;
        }
        
    onStatusChanged(event: MatSelectChange) {
        const filterValue = event.value.trim().toLowerCase();
        
        this.dataSource.filterPredicate = (data: any) => 
          data.status?.toLowerCase().includes(filterValue);
      
        this.dataSource.filter = filterValue;
      }

      allocateTracker(tracker: Tracker){
        let dialogRef = this.dialog.open(AllocateTrackerComponent, { data: tracker });
        dialogRef.afterClosed().subscribe({
          next: (result) => {
            
          }
        });
      }

      _downloadFile(data: any) {
        const replacer = (key: string, value: any) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(data[0]);
        let csv = data.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');
    
        var blob = new Blob([csvArray], {type: 'text/csv' })
        saveAs(blob, "report.csv");
    }

      deleteTracker(tracker: Tracker){
        this.trackerService.deleteTracker(tracker.deviceId).subscribe({
          next: () => {
              this._snackBar.open(tracker.deviceName + " deleted successfully!", "OK", {
                duration: 3000
              })
              this.trackers.splice(this.trackers.indexOf(tracker), 1)
              this.dataSource.data = this.trackers
          },
          error: (err: HttpErrorResponse) => {
            this._snackBar.open("Something went wrong!", "OK")
          }
        })
      }

}
