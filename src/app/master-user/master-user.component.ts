import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { SubUsersComponent } from '../sub-users/sub-users.component';
import { AuthService } from '../services/auth-service/auth.service';
import { Role } from '../model/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserListComponent, SubUsersComponent],
  template: `
    @if (isCustomerAdmin()) {
      <app-sub-users />
    } @else {
     <app-user-list />
    }
  `,
  styles: []
})
export class MasterUserComponent {
  constructor(private authService: AuthService) {}

  isCustomerAdmin(): boolean {
    return !!this.authService.user?.role.includes(Role.CustomerAdmin)
  }
}
