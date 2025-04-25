import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,OnInit,ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';
import { MockTracker } from '../model/tracker';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-customer-user-tracker',
  standalone: true,
  imports: [
    MatCardModule, MatPaginatorModule, CommonModule, MatTableModule, 
    MatIconModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, 
    ReactiveFormsModule, MatExpansionModule, MatCheckboxModule, MatDatepickerModule
  ],
  templateUrl: './customer-user-tracker.component.html',
  styleUrl: './customer-user-tracker.component.css'
})
export class CustomerUserTrackerComponent {
  dataSource = new MatTableDataSource<any>([]);
  pageSize = 10;
  loading = true;
  users: string[] = [];
  trackersList: string[] = [];
  selectedTracker: any = null;
  selectedAllocateTracker: any = null;
  allocateTrackerForm: FormGroup;

  displayedColumns = [
    "SNo", "TrackerId", "TrackerName", "RegistrationDateTime", 
    "TrackerStatus", "TrackerTotalCredit", 
    "TotalConsumedCredit", "LastUpdatedTime", "Actions"
  ];

  trackers = [
    {
      SNo: 1,
      TrackerId: 'T-1001',
      TrackerName : 'TRK001',
      RegistrationDateTime : '2025-03-22 11:00 AM',
      TrackerStatus : 'Blocked',
      TrackerTotalCredit : 300,
      TotalConsumedCredit : 200,
      LastUpdatedTime : '2025-03-22 11:00 AM'
    },
    {
      SNo: 2,
      TrackerId: 'T-1002',
      TrackerName : 'TRK002',
      RegistrationDateTime : '2025-03-22 11:00 AM',
      TrackerStatus : 'Blocked',
      TrackerTotalCredit : 300,
      TotalConsumedCredit : 200,
      LastUpdatedTime : '2025-03-22 11:00 AM'
    },
    {
      SNo: 3,
      TrackerId: 'T-1003',
      TrackerName : 'TRK003',
      RegistrationDateTime : '2025-03-22 11:00 AM',
      TrackerStatus : 'Blocked',
      TrackerTotalCredit : 300,
      TotalConsumedCredit : 200,
      LastUpdatedTime : '2025-03-22 11:00 AM'
    },
  ];

  allocateTrackerColumns = ['SNo', 'TrackerId', 'TrackerName', 'LastUser', 'AdminId', 'ModifiedTime'];
  allocateTrackerData = [
    { SNo: 1, TrackerId: "TRK001", TrackerName: "Tracker Alpha", LastUser: "John Doe", AdminId: "admin123", ModifiedTime: "2025-03-24 14:00:00" },
    { SNo: 2, TrackerId: "TRK002", TrackerName: "Tracker Beta", LastUser: "Jane Smith", AdminId: "admin456", ModifiedTime: "2025-03-25 09:30:00" }
  ];

  originalData: any[] = [];
  selectedTrackerIds: string[] = [];
  selectedAdminIds: string[] = [];
  fromDate: Date | null = null;
  toDate: Date | null = null;
  uniqueTrackerIds: string[] = [];
  uniqueAdminIds: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private trackerService: TrackersService,
    private router: Router,
    private menuService: MenuService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.allocateTrackerForm = this.fb.group({
      trackerName: [''],
      user: ['']
    });
  }

  ngOnInit(): void {
    this.originalData = [...this.allocateTrackerData];
    this.initializeFilters();
    this.loadUserData();
    this.loadTrackerData();
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  private loadUserData() {
    this.userService.getMockUserList().subscribe({
      next: (response) => this.users = response.map((user: any) => user.UserName),
      error: (error) => console.error('Error fetching users:', error)
    });
  }

  private loadTrackerData() {
    this.dataSource = new MatTableDataSource(this.trackers);
    this.loading=false;
  }

  clearAllFilters() {
    this.selectedTrackerIds = [];
    this.selectedAdminIds = [];
    this.fromDate = null;
    this.toDate = null;
    this.filterData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: any) => {
      return data.TrackerId.toLowerCase().includes(filterValue) || 
             data.TrackerName.toLowerCase().includes(filterValue);
    };
  
    this.dataSource.filter = filterValue;
  }
  

  createUser() {
    this.router.navigate(['/user-registration']);
    this.menuService.setMenu('Users');
  }

  viewTrackerDetails(tracker: any) {
    this.selectedTracker = tracker;
  }

  allocateTracker(tracker: any) {
    this.selectedAllocateTracker = tracker;
    this.selectedTracker = null;
    this.cdRef.detectChanges();
  }

  allocateTrackerSubmit() {
   console.log('allocatetracker add', this.allocateTrackerForm.getRawValue())
  }

  goBack() {
    this.selectedTracker = null;
    this.selectedAllocateTracker = null;
  }

  private initializeFilters() {
    this.uniqueTrackerIds = [...new Set(this.allocateTrackerData.map(item => item.TrackerId))];
    this.uniqueAdminIds = [...new Set(this.allocateTrackerData.map(item => item.AdminId))];
  }

  filterData() {
    this.allocateTrackerData = this.originalData.filter(item => 
      this.matchesTrackerFilter(item) && 
      this.matchesAdminFilter(item) && 
      this.matchesDateFilter(item)
    );
  }

  private matchesTrackerFilter(item: any): boolean {
    return this.selectedTrackerIds.length === 0 || this.selectedTrackerIds.includes(item.TrackerId);
  }

  private matchesAdminFilter(item: any): boolean {
    return this.selectedAdminIds.length === 0 || this.selectedAdminIds.includes(item.AdminId);
  }

  private matchesDateFilter(item: any): boolean {
    if (!this.fromDate && !this.toDate) return true;
    const date = new Date(item.ModifiedTime);
    return (!this.fromDate || date >= this.fromDate) && (!this.toDate || date <= this.toDate);
  }

  toggleTrackerSelection(trackerId: string, event: MatCheckboxChange) {
    this.updateSelection(this.selectedTrackerIds, trackerId, event.checked);
    this.filterData();
  }

  toggleAdminSelection(adminId: string, event: MatCheckboxChange) {
    this.updateSelection(this.selectedAdminIds, adminId, event.checked);
    this.filterData();
  }

  private updateSelection(array: string[], id: string, isSelected: boolean) {
    isSelected ? array.push(id) : array.splice(array.indexOf(id), 1);
  }

  onDateChange() {
    this.filterData();
  }
}
