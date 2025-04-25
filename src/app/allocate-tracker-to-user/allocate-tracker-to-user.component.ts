import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { TrackersService } from '../services/trackers-service/trackers.service';
import { UserService } from '../services/user-service/user.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-allocate-tracker-to-user',
  templateUrl: './allocate-tracker-to-user.component.html',
  styleUrl: './allocate-tracker-to-user.component.css',
  standalone: true,
  imports: [MatCardModule, MatCommonModule, MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule,MatListModule]
})
export class AllocateTrackerToUserComponent {
  @ViewChild('trackers') trackerList!: MatSelectionList
  @ViewChild('users') userList!: MatSelectionList
  trackerNameList: string[] = []
  trackerNameSelection = ''
  userNameList: string[] = []
  userNameSelection = ''

  constructor(private trackerService: TrackersService, private userService: UserService, private _authService: AuthService){}
  ngOnInit(): void {
    this.trackerService.trackers().subscribe(it =>{
      this.trackerNameList = it.map(tracker => {
        return tracker.deviceName
      })
    })

    this.userService.getUserList().subscribe(it => {
      this.userNameList = it.map(user => {
        return user.name
      })
    })
    
  }

  onTrackerListChange(event: MatSelectionListChange){
    this.trackerNameSelection = ''
    this.trackerList.selectedOptions.selected.forEach(it => {
      this.trackerNameSelection = this.trackerNameSelection.concat(it.value, ',')
    })
  }

  onUserListChange(event: MatSelectionListChange){
    this.userNameSelection = ''
    this.userList.selectedOptions.selected.forEach(it => {
      this.userNameSelection = this.userNameSelection.concat(it.value, ',')
    })
  }

}
