import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../services/user-service/user.service';
import { MockUsers, User } from '../model/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth-service/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPseudoCheckboxModule, SharedModule]
})
export class UserListComponent implements OnInit{
  dataSource = new MatTableDataSource<MockUsers>([]);
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['SNo', 'UserName', 'UserEmailId', 'Customer', 'CreationDateAndTime', 'TrackersCount', 'CustomerTotalCredits', 'CustomerTotalConsumed', 'Actions']

  loading = true

  users:MockUsers[] = []
  sortOrder: string = 'asc';
  sortOptions = [
    { value: 'ascTC', label: 'Ascending Tracker Count' },
    { value: 'descTC', label: 'Descending Tracker Count' },
    { value: 'ascUser', label: 'Ascending Username' },
    { value: 'descUser', label: 'Descending Username' },
    { value: 'ascCustomer', label: 'Ascending Customer Name' },
    { value: 'descCustomer', label: 'Descending Customer Name' },
  ];

  constructor(
      private userService: UserService,
      private dialog: MatDialog, 
      private _snackBar: MatSnackBar, 
      private _authService: AuthService,
      private router: Router,
      private menuService: MenuService
    ){}

  ngOnInit(): void {
    this.userService.getMockUserList().subscribe({
      next : (users) => {
        this.users = users.map((user,index) => ({
          ...user
        }));
        this.dataSource.data = this.users;
        this.loading = false;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(user: User) {
    console.log('Delete User:', user);
  }

  applyFilter(event: Event, key: keyof MockUsers) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data:any) =>
      data[key]?.toLowerCase().includes(filterValue)
    
    this.dataSource.filter = filterValue;
  }

  sortData() {
    this.dataSource.data = [...this.dataSource.data].sort((a: any, b: any) => {
      switch (this.sortOrder) {
        case 'ascTC':
          return a.TrackersCount - b.TrackersCount;
        case 'descTC':
          return b.TrackersCount - a.TrackersCount;
        case 'ascUser':
          return a.UserName.localeCompare(b.UserName);
        case 'descUser':
          return b.UserName.localeCompare(a.UserName);
        case 'ascCustomer':
          return a.Customer.localeCompare(b.Customer);
        case 'descCustomer':
          return b.Customer.localeCompare(a.Customer);
        default:
          return 0;
      }
    });
  }

  createUser(){
    this.router.navigate(['/users/user-registration'])
    this.menuService.setMenu('Users')
  }

}
