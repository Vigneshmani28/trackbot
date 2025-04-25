import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { CompanyService } from '../services/company-service/company.service';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { CompanyService } from '../services/mock/mock_company.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
  standalone: true,
  imports: [MatTableModule, CommonModule,MatCommonModule, MatFormFieldModule, MatInputModule,MatCardModule, MatPaginatorModule, FormsModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatPseudoCheckboxModule, MatCheckboxModule]
})
export class CompanyListComponent implements OnInit, AfterViewInit{
  companies: CompanyState[]= []
  pageSize = 5;
  displayedColumns = ["SNo", "CompanyName", "CustomerCount", "UserCount", "DeviceCount", "RegistrationDateTime", "BillingDate", "ExpiryDate", "PaymentDate", "Actions"];
  columnHeaderMap: { [key: string]: string } = {
    SNo: "S. No",
    CompanyName: "Company Name",
    CustomerCount: "Customer Count",
    UserCount: "User Count",
    DeviceCount: "Device Count",
    RegistrationDateTime: "Registration Date",
    BillingDate: "Billing Date",
    ExpiryDate: "Expiry Date",
    PaymentDate: "Payment Date",
    Actions: "Actions"
  };
  
  dataSource = new MatTableDataSource();
  searchCompanyName = ''
  loading = true

  selectedCompany: any = null;
  selectedSubscription:any = null;
  subscriptionForm!: FormGroup;

  maxCharLimit  = 100;
  charCount: number = 0;

  sortOrder: string = 'asc';
  @ViewChild(MatSort) sort!: MatSort;
  sortOptions = [
    { value: 'asc', label: 'Ascending Alphabetical' },
    { value: 'desc', label: 'Descending Alphabetical' },
    { value: 'dateReg', label: 'Date of Registration' },
    { value: 'billingDate', label: 'Billing Date' },
    { value: 'expiryDate', label: 'Expiry Date' }
  ];

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
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    // private companyService: CompanyService,
      private mockCompanyService: CompanyService,
      private dialog: MatDialog,
      private router: Router,
      private menuService: MenuService,
      private cdRef: ChangeDetectorRef,
      private fb: FormBuilder){
      
     }


  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      billingDate: [''],
      expiryDate: [''],
      paymentMode: [''],
      paymentDate: [''],
      description: [''],
      blockCompany: [false]
    })

    this.mockCompanyService.getCompanies().subscribe({
      next: (it) => {
        this.companies = it.map((company, index) => ({
          ...company,
          SNo: index + 1,
          ContactPersonName: company.ContactPersonName || '',
          PhoneNumber: company.ContactPersonNumber || '',
          Email: company.ContactEmail || ''
        }));
        this.dataSource.data = this.companies;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;   
  }

  sortData() {
    this.dataSource.data = [...this.dataSource.data].sort((a: any, b: any) => {
      switch (this.sortOrder) {
        case 'asc':
          return a.CompanyName.localeCompare(b.CompanyName);
        case 'desc':
          return b.CompanyName.localeCompare(a.CompanyName);
        case 'dateReg':
          return new Date(a.RegistrationDateTime).getTime() - new Date(b.RegistrationDateTime).getTime();
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
    this.router.navigate(['/companies/company-registration'])
    this.menuService.setMenu('Companies')
  }

  applyFilter(event: Event, key: keyof any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data:any) =>
      data[key]?.toLowerCase().includes(filterValue)
    
    this.dataSource.filter = filterValue;
  }

  viewCompanyDetails(company: any) {
    this.selectedCompany = company;
    this.selectedSubscription = null; 
  }
  
  addSubscriptionClick(company:any) {
    this.selectedSubscription = company;
    this.selectedCompany = null;
    this.cdRef.detectChanges(); 
  }

  goBack() {
    this.selectedCompany = null;
  this.selectedSubscription = null; 
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource._updateChangeSubscription();
    });
  }

  saveSubscription() {
    console.log("Subscription Data:", this.subscriptionForm.value);
  }

  updateCharCount(){
    const text = this.subscriptionForm.get('description')?.value || '';
    this.charCount = text.length;
  }

  openCompanyForm(company?: any) {
    const dialogRef = this.dialog.open(CompanyRegistrationComponent, {
      width: '100vw',
      maxWidth: '1000px',
      height: '90vh',
      maxHeight: '100vh',
      data: company ? company : {}
    });
    

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Company added/updated successfully.');
      }
    });
  }

}
