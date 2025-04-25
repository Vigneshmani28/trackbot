import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { AddTrackerComponent } from '../add-tracker/add-tracker.component';
import {MatExpansionModule} from '@angular/material/expansion';

interface Tracker {
  SNo: number;
  trackerId: string;
  product: string;
  creationDateTime: string;
  customer: string;
  customerUserId: string;
  user: string;
  userId: string;
  customerTotalCredit: number;
  customerTotalConsumed: number;
  trackerTotalCredit: number;
  totalConsumedCredit: number;
}

@Component({
  selector: 'app-trackers',
  standalone: true,
  imports: [MatTableModule, CommonModule,MatCommonModule, MatFormFieldModule, MatInputModule,MatCardModule, MatPaginatorModule, FormsModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatPseudoCheckboxModule, MatCheckboxModule, MatExpansionModule],
  templateUrl: './trackers.component.html',
  styleUrl: './trackers.component.css',
})
export class TrackersComponent implements OnInit, AfterViewInit {

    pageSize = 5;
    displayedColumns = ["SNo", "trackerId", "product", "creationDateTime", "customer", "customerUserId", "user", "userId", "customerTotalCredit", "customerTotalConsumed", "trackerTotalCredit", "totalConsumedCredit", "Actions"];
    
    columnHeaderMap: { [key: string]: string } = {
      SNo: 'S.No',
      trackerId: 'Tracker ID',
      product: 'Product',
      creationDateTime: 'Creation Date & Time',
      customer: 'Customer',
      customerUserId: 'Customer User ID',
      user: 'User',
      userId: 'User ID',
      customerTotalCredit: 'Customer Total Credit',
      customerTotalConsumed: 'Customer Total Consumed',
      trackerTotalCredit: 'Tracker Total Credit',
      totalConsumedCredit: 'Total Consumed Credit',
      Actions : "Actions"
    };
    

    trackers: Tracker[] = [
      {
        SNo: 1,
        trackerId: 'T-1001',
        product: 'GPS Device 1',
        creationDateTime: '2025-03-22 10:00 AM',
        customer: 'John Doe new',
        customerUserId: 'CUST-001',
        user: 'Jane Smith',
        userId: 'USER-123',
        customerTotalCredit: 5000,
        customerTotalConsumed: 1200,
        trackerTotalCredit: 3000,
        totalConsumedCredit: 800,
      },
      {
        SNo: 2,
        trackerId: 'T-1002',
        product: 'GPS Device 2',
        creationDateTime: '2025-03-22 11:00 AM',
        customer: 'John Doe',
        customerUserId: 'CUST-001',
        user: 'Jane Smith',
        userId: 'USER-123',
        customerTotalCredit: 5000,
        customerTotalConsumed: 1200,
        trackerTotalCredit: 3000,
        totalConsumedCredit: 800,
      },
      {
        SNo: 3,
        trackerId: 'T-1003',
        product: 'GPS Device 3',
        creationDateTime: '2025-02-10 11:00 AM',
        customer: 'John Doe 3',
        customerUserId: 'CUST-001',
        user: 'Jane Smith 3',
        userId: 'USER-123',
        customerTotalCredit: 5000,
        customerTotalConsumed: 1200,
        trackerTotalCredit: 3000,
        totalConsumedCredit: 800,
      },
    ];
  
    loading = false
  
    selectedTracker: any = null;
    selectedpositionCredit:any = null;
    positionCreditForm!: FormGroup;
  
    maxCharLimit  = 100;
    charCount: number = 0;
  
    blockCompany = false;
  
    sortOrder: string = 'asc';
    @ViewChild(MatSort) sort!: MatSort;
    sortOptions = [
      { value: 'asc', label: 'Ascending Alphabetical' },
      { value: 'desc', label: 'Descending Alphabetical' },
      { value: 'dateReg', label: 'Date of Registration' },
      { value: 'billingDate', label: 'Billing Date' },
      { value: 'expiryDate', label: 'Expiry Date' }
    ];
  
    positionCreditTableColumns: string[] = ['sNo', 'positionCredit', 'positionCreditType',  'DateAndTime', 'user', 'description'];
    positionCreditData = [
      {
        sNo : 1,
        positionCredit: '30000',
        positionCreditType : 'Monthly Position Credit',
        DateAndTime: '2025-03-22 11:00 AM',
        user: 'Login1@email.com',
        description : 'Details'
      },
      {
        sNo : 2,
        positionCredit: '2500',
        positionCreditType : 'Extra Position Credit',
        DateAndTime: '2025-02-10 11:00 AM',
        user: 'Login2@email.com',
        description : 'Details'
      }
    ];

    trackerId:string[] = []
    monthlyPositionCredit = ['Monthly Fixed Position Credit', 'Additional Position Credit']
    
    selectedFilters: { [key: string]: string[] } = {
      product: [],
      user: [],
      positionCreditType: [],
      positionUser: [],
    };

    fromDate: Date | null = null;
    toDate: Date | null = null;
  
    filteredTrackers: Tracker[] = [...this.trackers];
    filteredPositionCreditData: any[] = [...this.positionCreditData];

    dataSource = new MatTableDataSource<Tracker>(this.filteredTrackers);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(
        private dialog: MatDialog,
        private router: Router,
        private menuService: MenuService,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder){
       }
  
  
    ngOnInit(): void {
      this.positionCreditForm = this.fb.group({
        trackerId: [''],
        monthlyPositionCredit: [''],
        enterPositionCredit: [''],
        noLimitOnCredit: [false],
        customer: [''],
        user: [''],
        description: [''],
      })

      this.trackerId = this.trackers.map(tracker => tracker.trackerId);        
    }

    filterData(dataset: any[], filterKeys: string[], dateKey?: string) {
      return dataset.filter((item) => {
        return (
          filterKeys.every((key) =>
            this.selectedFilters[key].length ? this.selectedFilters[key].includes(item[key]) : true
          ) &&
          (!this.fromDate || !this.toDate || this.isDateInRange(item[dateKey!]))
        );
      });
    }

    applyFilters() {
      this.filteredTrackers = this.filterData(this.trackers, ['product', 'user'], 'creationDateTime');
      this.filteredPositionCreditData = this.filterData(this.positionCreditData, ['positionCreditType', 'user'], 'DateAndTime');
    }

    toggleSelection(filterKey: string, value: string, event: MatCheckboxChange) {
      console.log(filterKey, value);
      
      if (event.checked) {
        this.selectedFilters[filterKey].push(value);
      } else {
        this.selectedFilters[filterKey] = this.selectedFilters[filterKey].filter((item) => item !== value);
      }
      this.applyFilters();
    }
  
    onDateChange(event: MatDatepickerInputEvent<Date>, isFromDate: boolean) {
      if (isFromDate) {
        this.fromDate = event.value;
      } else {
        this.toDate = event.value;
      }
      this.applyFilters();
    }
  
    isDateInRange(dateString: string): boolean {
      const date = new Date(dateString);
      return (!this.fromDate || date >= this.fromDate) && (!this.toDate || date <= this.toDate);
    }
    
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;   
    }

    createTracker(){
      this.router.navigate(['/trackers/add-tracker'])
      this.menuService.setMenu('Trackers')
    }
  
    applyFilter(event: Event, key: keyof Tracker) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
      this.filteredTrackers = this.trackers.filter(tracker =>
        tracker[key].toString().toLowerCase().includes(filterValue)
      );
    
      this.dataSource = new MatTableDataSource<Tracker>(this.filteredTrackers);
    }
    
  
    viewTrackerDetails(company: any) {
      this.selectedTracker = company;
      this.selectedpositionCredit = null; 
    }
    
    addPositionCreditClick(tracker:any) {
      this.selectedpositionCredit = tracker;
      this.selectedTracker = null;
      this.cdRef.detectChanges(); 
    }
  
    goBack() {
      this.selectedTracker = null;
    this.selectedpositionCredit = null; 
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
      });
    }
  
    savePositionCredit() {
      console.log("Subscription Data:", this.positionCreditForm.value);
    }
  
    updateCharCount(){
      const text = this.positionCreditForm.get('description')?.value || '';
      this.charCount = text.length;
    }
  
    openTrackerForm(trackers?: any) {
      const dialogRef = this.dialog.open(AddTrackerComponent, {
        width: '100vw',
        maxWidth: '1000px',
        height: '90vh',
        maxHeight: '100vh',
        data: trackers ? trackers : {}
      });
      
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Trackers added/updated successfully.');
        }
      });
    }
}
