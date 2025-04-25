import { Component } from '@angular/core';
import { TrackersComponent } from '../trackers/trackers.component';
import { SubTrackerComponent } from '../sub-tracker/sub-tracker.component';
import { AuthService } from '../services/auth-service/auth.service';
import { Role } from '../model/user';
import { CustomerUserTrackerComponent } from '../customer-user-tracker/customer-user-tracker.component';

@Component({
  selector: 'app-master-tracker',
  standalone: true,
  imports: [TrackersComponent, SubTrackerComponent, CustomerUserTrackerComponent],
  template: `
    @if (isCustomerAdmin()) {
      <app-sub-tracker />
    } @else if (isCustomerUser()) {
      <app-customer-user-tracker />
    } @else {
      <app-trackers />
    }
  `,
  styles : []
})
export class MasterTrackerComponent {
constructor(private authService: AuthService) {}

  isCustomerAdmin(): boolean {
    return !!this.authService.user?.role.includes(Role.CustomerAdmin)
  }

  isCustomerUser(): boolean {
    return !!this.authService.user?.role.includes(Role.CustomerUser);
  }
}
