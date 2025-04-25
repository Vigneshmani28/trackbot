import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../services/company-service/company.service';
import { Company, CompanyState } from '../model/company';
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
import { CustomerService } from '../services/customer-service/customer.service';
import { Customer, CustomerState } from '../model/customer';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerRegistrationComponent } from '../customer-registration/customer-registration.component';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, CommonModule,MatCommonModule, MatFormFieldModule, MatInputModule,MatCardModule, MatPaginatorModule, FormsModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatPseudoCheckboxModule, MatCheckboxModule, MatExpansionModule, SharedModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  constructor(private dialog: MatDialog,
    private customerService: CustomerService, private menuService: MenuService, private router: Router, private cdRef: ChangeDetectorRef, private fb:FormBuilder
  ){}

  sortOrder: string = 'asc';
    @ViewChild(MatSort) sort!: MatSort;
    sortOptions = [
      { value: 'asc', label: 'Ascending Alphabetical' },
      { value: 'desc', label: 'Descending Alphabetical' },
      { value: 'dateReg', label: 'Date of Registration' },
      { value: 'billingDate', label: 'Billing Date' },
      { value: 'expiryDate', label: 'Expiry Date' },
      { value: 'consumedCreditLimit', label: 'Consumed Credit Limit' },
    ];

  customers: Customer[]= []
  pageSize = 5;
  displayedColumns = ["SNo", "CustomerName", "UserCount", "TerminalCount", "CreditLimit", "ConsumedCredit", "LimitReached" ,"RegistrationDateAndTime", "BillingDate", "ExpiryDate", "PaymentDate", "Actions"];
  dataSource = new MatTableDataSource();
  searchCustomerName = ''
  loading = true

  subscriptionTableColumns: string[] = ['sNo', 'companyName', 'subscriptionDate',  'billingDate', 'expiryDate', 'blockOnExpiry', 'modeOfPayment', 'paymentDate', 'user', 'description'];
  subscriptionData = [
    {
      sNo : 1,
      companyName: 'ABC Corp  Pvt ltd',
      subscriptionDate : '2024-02-01',
      billingDate: '2024-02-01',
      expiryDate: '2025-02-01',
      blockOnExpiry : 'Yes',
      modeOfPayment: 'Credit Card',
      paymentDate: '2024-02-02',
      user : 'Login1@gmail.com',
      description: 'Details'
    }
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

  selectedFilters: { [key: string]: string[] } = {
    product: [],
    user: [],
    positionCreditType: [],
    positionUser: [],
  };

  fromDate: Date | null = null;
  toDate: Date | null = null;

  filteredPositionCreditData: any[] = [...this.positionCreditData];

  customerNames = ['Customer_1', 'Customer_2']

  selectedCustomer: any = null;
  selectedSubscription:any = null;
  selectedpositionCredit:any = null;
  subscriptionForm!: FormGroup;
  positionCreditForm!: FormGroup;

  maxCharLimit  = 100;
  charCount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      billingDate: [''],
      expiryDate: [''],
      paymentMode: [''],
      paymentDate: [''],
      description: [''],
      blockCompany: [false]
    })

    this.positionCreditForm = this.fb.group({
      customerName: [''],
      positionCredit : [''],
      noLimitOnCredit : [false],
      description: [''],
    })

    this.customerService.getCustomers().subscribe({
      next: (it) => {
        this.customers = it.map((customer, index) => ({
          ...customer,
        }));
        this.dataSource.data = this.customers;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
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
  }

  sortData() {
    this.dataSource.data = [...this.dataSource.data].sort((a: any, b: any) => {
      switch (this.sortOrder) {
        case 'asc':
          return a.CustomerName.localeCompare(b.CustomerName);
        case 'desc':
          return b.CustomerName.localeCompare(a.CustomerName);
        case 'consumedCreditLimit':
          return a.ConsumedCredit - b.ConsumedCredit;
        case 'dateReg':
          return new Date(a.RegistrationDateAndTime).getTime() - new Date(b.RegistrationDateAndTime).getTime();
        case 'billingDate':
          return new Date(a.BillingDate).getTime() - new Date(b.BillingDate).getTime();
        case 'expiryDate':
          return new Date(a.ExpiryDate).getTime() - new Date(b.ExpiryDate).getTime();
        default:
          return 0;
      }
    });
  }
  
  createCompany(){
    this.router.navigate(['/customers/customer-registration'])
    this.menuService.setMenu('Customers')
  }

  viewCompanyDetails(customer: any) {
    this.selectedCustomer = customer;
    this.selectedSubscription = null; 
  }

  addSubscriptionClick(customer:any) {    
    this.selectedSubscription = customer;
    this.selectedCustomer = null;
    this.cdRef.detectChanges(); 
  }

  addPositionCreditClick(customer:any) {
    this.selectedpositionCredit = customer;
    this.selectedCustomer = null;
    this.cdRef.detectChanges(); 
  }

  updateCharCount(type:string){
    if(type === 'subscription'){
      const text = this.subscriptionForm.get('description')?.value || '';
      this.charCount = text.length;
    } else {
      const text = this.positionCreditForm.get('description')?.value || '';
      this.charCount = text.length;
    }
  }

  goBack() {
    this.selectedCustomer = null;
  this.selectedSubscription = null; 
  this.selectedpositionCredit = null;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource._updateChangeSubscription();
    });
  }

  savePositionCredit() {
    console.log("Subscription Data:", this.positionCreditForm.value);
  }

  saveSubscription() {
    console.log("Subscription Data:", this.subscriptionForm.value);
  }

  applyFilter(event: Event, key: keyof any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data:any) =>
      data[key]?.toLowerCase().includes(filterValue)
    
    this.dataSource.filter = filterValue;
  }

   openCompanyForm(company?: any) {
      const dialogRef = this.dialog.open(CustomerRegistrationComponent, {
        width: '100vw',
        maxWidth: '1000px',
        height: '90vh',
        maxHeight: '100vh',
        data: company ? company : {}
      });
      
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Customer added/updated successfully.');
        }
      });
    }

}
