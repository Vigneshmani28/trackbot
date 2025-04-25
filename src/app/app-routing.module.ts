import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { ReportsComponent } from './reports/reports.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { DeviceRegistrationComponent } from './device-registration/device-registration.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { TrackerListComponent } from './tracker-list/tracker-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddTrackerComponent } from './add-tracker/add-tracker.component';
import { DataFormatsComponent } from './data-formats/data-formats.component';
import { DataFormatRegistrationComponent } from './data-format-registration/data-format-registration.component';
import { ProductsComponent } from './products/products.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { SubUserRegistrationComponent } from './sub-user-registration/sub-user-registration.component';
import { MasterUserComponent } from './master-user/master-user.component';
import { MasterTrackerComponent } from './master-tracker/master-tracker.component';
import { authGuard } from './auth.guard';
import { Role } from './model/user';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'home', redirectTo: '/dashboard', pathMatch: 'full' },

  {path : 'full-reports', loadComponent: () => import('./full-reports/full-reports.component').then(m => m.FullReportsComponent)},

  {
    path: 'dashboard',
    component: TrackerListComponent,
    canActivate: [authGuard],
    data: {
      roles: [
        Role.SuperAdmin,
        Role.CompanyAdmin,
        Role.CustomerAdmin,
        Role.CustomerUser,
      ],
      breadcrumb: 'Dashboard',
    },
  },

  {
    path: 'companies',
    canActivate: [authGuard],
    data: { roles: [Role.SuperAdmin], breadcrumb: 'Companies'},
    children: [
      {
        path: '',
        canActivate: [authGuard],
        data: { roles: [Role.SuperAdmin],breadcrumb: 'Company List' },
        component: CompanyListComponent,
      },
      {
        path: 'company-registration',
        component: CompanyRegistrationComponent,
        canActivate: [authGuard],
        data: { roles: [Role.SuperAdmin], breadcrumb: 'Company Registration' },
      },
    ],
  },

  {
    path: 'customers',
    canActivate: [authGuard],
    data: { roles: [Role.SuperAdmin, Role.CompanyAdmin, Role.CustomerAdmin], breadcrumb: 'Customers' },
    children: [
      {
        path: '',
        component: CustomerListComponent,
        canActivate: [authGuard],
        data: { roles: [Role.SuperAdmin, Role.CompanyAdmin, Role.CustomerAdmin], breadcrumb: 'Customer List' },
      },
      {
        path: 'customer-registration',
        component: CustomerRegistrationComponent,
        canActivate: [authGuard],
        data: { roles: [Role.CompanyAdmin], breadcrumb: 'Customer Registration' },
      },
    ],
  },


  {
    path: 'users',
    canActivate: [authGuard],
    data: { roles: [Role.SuperAdmin, Role.CompanyAdmin, Role.CustomerAdmin], breadcrumb: 'Users' },
    children: [
      {
        path: '',
        component: MasterUserComponent,
        canActivate: [authGuard],
        data: { roles: [Role.SuperAdmin, Role.CompanyAdmin, Role.CustomerAdmin], breadcrumb: 'User List' },
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent,
        canActivate: [authGuard],
        data: { roles: [Role.CompanyAdmin, Role.CustomerAdmin], breadcrumb: 'User Registration' },
      },
      {
        path: 'sub-user-registration',
        component: SubUserRegistrationComponent,
        canActivate: [authGuard],
        data: { roles: [Role.CustomerAdmin, Role.SubCompanyAdmin], breadcrumb: 'Sub-User Registration' },
      },
    ],
  },

  {
    path: 'trackers',
    canActivate: [authGuard],
    data: { roles: [Role.CompanyAdmin, Role.CustomerAdmin, Role.CustomerUser], breadcrumb: 'Trackers' },
    children: [
      {
        path: '',
        component: MasterTrackerComponent,
        canActivate: [authGuard],
        data: { roles: [Role.CompanyAdmin, Role.CustomerAdmin, Role.CustomerUser], breadcrumb: 'Tracker List' },
      },
      {
        path: 'add-tracker',
        component: AddTrackerComponent,
        canActivate: [authGuard],
        data: { roles: [Role.CompanyAdmin], breadcrumb: 'Add Tracker' },
      },
    ],
  },

 {
  path: 'data-formats',
  canActivate: [authGuard],
  data: { roles: [Role.CompanyAdmin], breadcrumb: 'Data Formats' },
  children: [
    {
      path: '',
      component: DataFormatsComponent,
      canActivate: [authGuard],
      data: { roles: [Role.CompanyAdmin], breadcrumb: 'Data Format List' },
    },
    {
      path: 'data-format-registration',
      component: DataFormatRegistrationComponent,
      canActivate: [authGuard],
      data: { roles: [Role.CompanyAdmin], breadcrumb: 'Data Format Registration' },
    },
  ],
},

{
  path: 'products',
  canActivate: [authGuard],
  data: { roles: [Role.SuperAdmin, Role.CompanyAdmin], breadcrumb: 'Products' },
  children: [
    {
      path: '',
      component: ProductsComponent,
      canActivate: [authGuard],
      data: { roles: [Role.SuperAdmin, Role.CompanyAdmin], breadcrumb: 'Product List' },
    },
    {
      path: 'product-registration',
      component: ProductRegistrationComponent,
      canActivate: [authGuard],
      data: { roles: [Role.CompanyAdmin], breadcrumb: 'Product Registration' },
    },
  ],
},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
