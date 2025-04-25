import { Component, OnInit,  ChangeDetectorRef, HostListener, AfterViewInit  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {  MatPaginatorModule } from '@angular/material/paginator';
// import { TrackersService } from '../services/trackers-service/trackers.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { MenuEnum } from '../model/tracker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule, MatSelectionListChange } from '@angular/material/list'
import { CompanyListComponent } from "../company-list/company-list.component";
import { AllocateTrackerComponent } from "../allocate-tracker/allocate-tracker.component";
import { UserListComponent } from "../user-list/user-list.component";
import { AllocateTrackerToUserComponent } from '../allocate-tracker-to-user/allocate-tracker-to-user.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Role } from '../model/user';
import { ReportsComponent } from "../reports/reports.component";
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { DeviceRegistrationComponent } from '../device-registration/device-registration.component';
import { CustomerRegistrationComponent } from '../customer-registration/customer-registration.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { MenuService } from '../services/menu/menu.service';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-trackers-table',
    templateUrl: './trackers-table.component.html',
    styleUrl: './trackers-table.component.css',
    standalone: true,
    imports: [MatButtonModule, MatListModule, MatTableModule, CommonModule,
        MatPaginatorModule, FormsModule, MatCommonModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatCardModule, MatDividerModule,
        CompanyListComponent, AllocateTrackerComponent, UserListComponent,
        AllocateTrackerToUserComponent,
         MatIconModule, MatMenuModule, ReportsComponent, CompanyRegistrationComponent,
          DeviceRegistrationComponent, CustomerRegistrationComponent, UserRegistrationComponent,
           CustomerListComponent, MatSidenavModule, RouterOutlet, BreadcrumbComponent, MatTooltipModule]
})
export class TrackersTableComponent implements OnInit, AfterViewInit {
  readonly REFRESH_TIME = 15 * 1000;

  MENU_ICONS: Record<MenuEnum, string> = {
    [MenuEnum.DASHBOARD]: "dashboard",
    [MenuEnum.TRACKERS]: "track_changes",
    [MenuEnum.REPORTS]: "bar_chart",
    [MenuEnum.COMPANIES]: "business",
    [MenuEnum.CUSTOMERS]: "group",
    [MenuEnum.USERS]: "person",
    [MenuEnum.SUB_USERS]: "people_alt",
    [MenuEnum.USERS_MASTER]: "manage_accounts",
    [MenuEnum.COMPANY_REGISTRATION]: "app_registration",
    [MenuEnum.CUSTOMER_REGISTRATION]: "how_to_reg",
    [MenuEnum.DEVICE_REGISTRATION]: "devices",
    [MenuEnum.USER_REGISTRATION]: "person_add",
    [MenuEnum.DATA_FORMATS]: "table_chart",
    [MenuEnum.PRODUCTS]: "shopping_cart"
  };

  menuList: MenuEnum[] = [];
  mode = MenuEnum.TRACKERS;
  timer: NodeJS.Timeout | undefined;
  isAdmin = false;
  isMobile: boolean = window.innerWidth <= 768;
  isCollapsed = true

  currentRoute: string = 'trackers';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver
  ) {}

  private RoleMenuMap: Record<Role, MenuEnum[]> = {
    [Role.SuperAdmin]: [MenuEnum.DASHBOARD, MenuEnum.COMPANIES, MenuEnum.CUSTOMERS, MenuEnum.USERS_MASTER, MenuEnum.PRODUCTS],
    [Role.CompanyAdmin]: [MenuEnum.DASHBOARD, MenuEnum.CUSTOMERS, MenuEnum.USERS_MASTER, MenuEnum.DATA_FORMATS, MenuEnum.PRODUCTS, MenuEnum.TRACKERS],
    [Role.CustomerAdmin]: [MenuEnum.DASHBOARD, MenuEnum.USERS_MASTER, MenuEnum.TRACKERS],
    [Role.Admin]: [MenuEnum.DASHBOARD, MenuEnum.USERS_MASTER, MenuEnum.TRACKERS],
    [Role.User]: [MenuEnum.DASHBOARD, MenuEnum.PRODUCTS],
    [Role.SubCompanyAdmin]: [],
    [Role.CustomerUser]: [MenuEnum.DASHBOARD, MenuEnum.TRACKERS]
  };

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      this.updateLayout();
    });

    this.menuService.selectedMenu$.subscribe(menu => {
      this.mode = menu as MenuEnum;
    });

    if (this.authService.user?.role) {
      this.authService.user.role.forEach(role => {
        if (this.RoleMenuMap[role]) {
          this.menuList.push(...this.RoleMenuMap[role]);
        }
      });
      this.menuList = [...new Set(this.menuList)];
    }

    this.isAdmin = this.authService.user?.role.includes(Role.Admin) ?? false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.replace('/', '');
        const matchedMenu = this.menuList.find(menu => 
          menu.toLowerCase().replace(/\s/g, '-') === currentRoute
        );

        if (matchedMenu) {
          this.mode = matchedMenu;
        }

        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateLayout(), 0); 
  }

  getMenuIcon(menu: MenuEnum): string {
    return this.MENU_ICONS[menu] || "help_outline";
  }

  @HostListener('window:resize')
  onResize() {
    this.updateLayout();
  }

  updateLayout() {
    const content = document.querySelector('.sidenav-content');
    if (content) {
      if (this.isCollapsed) {
        content.classList.add('content-shrunk');
      } else {
        content.classList.remove('content-shrunk');
      }
    }
  }
  

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
    this.updateLayout();
  }

  onMenuChange(event: MatSelectionListChange, drawer: MatSidenav) {
    this.mode = event.options[0].value;
    this.cdr.detectChanges();
    if (this.isMobile) {
      drawer.toggle();
    }
  }

  customerMenu() {
    this.mode = MenuEnum.CUSTOMERS;
  }

  navigate(menu: string) {
    this.currentRoute = menu.toLowerCase().replace(/\s/g, '-');
    this.router.navigate([this.currentRoute]);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}

